# 03 — Data Model

Schema conventions, the entity relationship diagram, and a table-by-table reference.

> **Status:** Planned design. Not yet implemented. Migrations are Phase 1.

---

## Conventions

| Convention | Rule |
|---|---|
| Primary keys | `uuid`, default `gen_random_uuid()` |
| Money | **Integer cents** (`*_cents`), never floats or numeric decimals. `$216.60` → `21660` |
| Timestamps | `timestamptz`, always UTC. `created_at` defaults to `now()` |
| Soft delete | `active boolean` on reference tables (`companies`, `retailer_stores`, `profiles`). No row is hard-deleted |
| Enums | Postgres enum types, not free-text columns |
| Naming | `snake_case`, plural table names, singular enum type names |
| Addresses | Stored as discrete columns plus a `jsonb` snapshot on the order |

**Why integer cents:** a delivery total is the sum of a materials subtotal scraped from a retailer email plus fees. Floating point drift in a money field that a customer pays against is not acceptable, and Stripe's API takes integer minor units anyway.

**Why addresses are snapshotted onto the order:** a company may later edit its saved job-site address. The order must preserve what was actually agreed at checkout.

---

## Entity relationship diagram

```mermaid
erDiagram
    COMPANIES ||--o{ PROFILES : employs
    COMPANIES ||--o{ COMPANY_SITES : has
    COMPANIES ||--o{ ORDERS : places
    INBOUND_EMAILS ||--o{ PARSE_ATTEMPTS : "attempted by"
    INBOUND_EMAILS ||--o| ORDERS : becomes
    RETAILER_STORES ||--o{ ORDERS : fulfills
    ORDERS ||--|{ ORDER_ITEMS : contains
    ORDERS ||--o{ ORDER_STATUS_EVENTS : logs
    ORDERS ||--o{ JOB_OFFERS : broadcasts
    ORDERS ||--o{ ATTACHMENTS : evidences
    ORDERS ||--o{ NOTIFICATIONS : sends
    ORDERS ||--o{ PAYMENTS : bills
    PROFILES ||--o{ JOB_OFFERS : receives
    PROFILES ||--o{ ORDERS : "assigned to"
```

---

## Enums

| Enum | Values |
|---|---|
| `user_role` | `dispatcher`, `driver`, `customer` |
| `order_status` | `received`, `needs_review`, `awaiting_customer`, `customer_confirmed`, `driver_requested`, `driver_assigned`, `driver_at_store`, `items_purchased`, `en_route`, `delivered`, `payment_requested`, `paid`, `closed`, `cancelled` |
| `retailer` | `homedepot`, `lowes` |
| `inbound_processing_status` | `pending`, `parsed`, `needs_review`, `failed`, `ignored` |
| `parse_strategy` | `deterministic`, `llm`, `manual` |
| `item_status` | `pending`, `purchased`, `unavailable`, `substituted` |
| `job_offer_status` | `offered`, `accepted`, `declined`, `expired`, `withdrawn` |
| `attachment_kind` | `receipt`, `delivery`, `item_photo`, `other` |
| `notification_channel` | `email`, `sms` |
| `notification_status` | `queued`, `sent`, `delivered`, `failed`, `bounced` |
| `payment_status` | `created`, `sent`, `paid`, `expired`, `refunded` |

`cancelled` and `substituted` exist from day one with no UI. That is what makes those features additive later. See [12-deferred-and-extension-points](12-deferred-and-extension-points.md).

---

## Table reference

### `companies`

The construction company. Owns the inbound email alias and the portal login.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `name` | text NOT NULL | |
| `order_alias` | citext UNIQUE NOT NULL | Local part only, e.g. `fixhome`. Combined with the configured domain to form the address |
| `billing_email` | citext | |
| `phone` | text | |
| `notes` | text | |
| `active` | boolean NOT NULL DEFAULT true | |

`order_alias` is `citext` and unique because it is the **sole** order-attribution mechanism. Email local parts are case-insensitive in practice, and a collision would route one company's orders to another.

### `profiles`

One row per authenticated user. Extends `auth.users`.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | References `auth.users(id)` on delete cascade |
| `role` | user_role NOT NULL | |
| `company_id` | uuid FK → companies | Required when `role = 'customer'`, else null |
| `full_name` | text | |
| `phone` | text | Driver SMS destination |
| `active` | boolean NOT NULL DEFAULT true | |
| `created_at` | timestamptz NOT NULL DEFAULT now() | |

**One login per company** in the MVP. The schema permits many profiles per company, so allowing multiple users later is a UI change rather than a migration.

### `company_sites`

Saved job sites, so repeat customers don't re-enter addresses.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `company_id` | uuid FK → companies NOT NULL | |
| `label` | text | e.g. "Oakwood Phase 2" |
| `address_line1` / `address_line2` | text | |
| `city` / `state` / `postal_code` | text | |
| `lat` / `lng` | double precision | Nullable; for future mileage automation |
| `contact_name` / `contact_phone` | text | |
| `instructions` | text | |
| `is_default` | boolean NOT NULL DEFAULT false | |

### `retailer_stores`

Seeded store list. The dispatcher picks from here — this is the only source of store truth, since the cart email carries no store identifier.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `retailer` | retailer NOT NULL | |
| `store_number` | text NOT NULL | |
| `name` | text NOT NULL | e.g. "North Frisco" |
| `address_line1`, `city`, `state`, `postal_code` | text | |
| `lat` / `lng` | double precision | |
| `phone` | text | |
| `hours` | jsonb | |
| `active` | boolean NOT NULL DEFAULT true | |
| | | UNIQUE (`retailer`, `store_number`) |

### `inbound_emails`

Every message that reaches the inbound webhook, stored before any interpretation.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `mailgun_message_id` | text UNIQUE | **Idempotency key** |
| `message_id_header` | text | Original `Message-ID` |
| `recipient` | text NOT NULL | Full SMTP recipient |
| `recipient_alias` | citext | Local part, matched against `companies.order_alias` |
| `sender_email` | text NOT NULL | Retailer address, e.g. `HomeDepot@order.homedepot.com` |
| `sender_name` | text | |
| `subject` | text | Carries the requester's name |
| `body_html` | text | Raw HTML — the parser's input |
| `body_plain` | text | Mailgun-synthesized; **not** used for parsing |
| `stripped_html` | text | Quoted-text-removed variant |
| `headers` | jsonb | Full header list |
| `raw_storage_path` | text | Original MIME in storage, for reprocessing |
| `processing_status` | inbound_processing_status NOT NULL DEFAULT 'pending' | |
| `order_id` | uuid FK → orders | Null until an order is created |
| `received_at` | timestamptz NOT NULL | |

Storing the raw email before interpreting it is what makes the parser safely re-runnable: a fixed parser can be replayed over history without asking customers to resend.

### `parse_attempts`

One row per extraction attempt — the telemetry that makes template drift visible.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `inbound_email_id` | uuid FK → inbound_emails NOT NULL | |
| `strategy` | parse_strategy NOT NULL | |
| `parser_version` | text | e.g. `homedepot@1.2.0` |
| `succeeded` | boolean NOT NULL | |
| `confidence` | numeric | |
| `output` | jsonb | Raw extraction, before validation |
| `errors` | jsonb | Validation failures |
| `llm_model` | text | Null for deterministic |
| `duration_ms` | int | |
| `created_at` | timestamptz NOT NULL DEFAULT now() | |

### `orders`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `order_number` | text UNIQUE NOT NULL | Human reference, e.g. `QC-2609-0042` |
| `company_id` | uuid FK → companies NOT NULL | |
| `inbound_email_id` | uuid FK → inbound_emails | |
| `retailer` | retailer NOT NULL | |
| `retailer_store_id` | uuid FK → retailer_stores | **Null until the dispatcher sets it** |
| `status` | order_status NOT NULL DEFAULT 'received' | Written only by `transitionOrder()` |
| `requester_name` | text | Parsed from the email subject |
| `requester_email` | citext | |
| `materials_subtotal_cents` | int NOT NULL DEFAULT 0 | From the cart email |
| `sizing_fee_cents` | int NOT NULL DEFAULT 0 | Dispatcher-entered |
| `mileage_fee_cents` | int NOT NULL DEFAULT 0 | Dispatcher-entered |
| `discount_cents` | int NOT NULL DEFAULT 0 | |
| `tax_cents` | int NOT NULL DEFAULT 0 | |
| `total_cents` | int NOT NULL DEFAULT 0 | Computed |
| `quote_breakdown` | jsonb | Line-item explanation shown to the customer |
| `delivery_address` | jsonb | Snapshot at checkout |
| `delivery_instructions` | text | |
| `site_id` | uuid FK → company_sites | Provenance only |
| `assigned_driver_id` | uuid FK → profiles | |
| `customer_confirmed_at` | timestamptz | |
| `confirmed_by_profile_id` | uuid FK → profiles | Set when a dispatcher completes checkout on the customer's behalf |
| `cancellation_reason` | text | Unused in MVP; present so cancellation is additive |
| `created_at` / `updated_at` | timestamptz NOT NULL DEFAULT now() | |

`confirmed_by_profile_id` is the audit answer to "who agreed to this price". When the customer completes checkout it stays null and `customer_confirmed_at` is the evidence; when a dispatcher completes it on their behalf, both are set.

### `order_items`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `order_id` | uuid FK → orders NOT NULL ON DELETE CASCADE | |
| `line_no` | int NOT NULL | |
| `description` | text NOT NULL | |
| `brand` | text | |
| `model_number` | text | Home Depot "Model #" |
| `store_sku` | text | Home Depot "Store SKU #" |
| `quantity` | int NOT NULL DEFAULT 1 | |
| `unit_price_cents` | int | **Derived**: `line_total_cents / quantity` |
| `line_total_cents` | int NOT NULL DEFAULT 0 | As printed in the email |
| `image_url` | text | |
| `aisle` / `bay` | text | Columns exist in the email but were empty in the sample |
| `item_status` | item_status NOT NULL DEFAULT 'pending' | Drives the deferred substitution feature |
| `substituted_by_item_id` | uuid FK → order_items | Unused in MVP |
| `note` | text | |

**`unit_price_cents` is derived, not extracted.** The cart email prints only a per-line total (`Item Total $216.60`), not a unit price. For `quantity > 1` it is a division and may not round-trip exactly. The line total is authoritative for money; the unit price is for display.

### `order_status_events`

Append-only audit log. Never updated, never deleted.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `order_id` | uuid FK → orders NOT NULL | |
| `from_status` | order_status | Null for the initial event |
| `to_status` | order_status NOT NULL | |
| `actor_profile_id` | uuid FK → profiles | Null when system-initiated |
| `actor_role` | user_role | |
| `source` | text | `webhook`, `workflow`, `console`, `driver_app`, `portal` |
| `note` | text | |
| `metadata` | jsonb | |
| `created_at` | timestamptz NOT NULL DEFAULT now() | |

This table is the hook for the deferred automated customer status notifications: a fan-out on insert turns that feature on without touching the order table.

### `job_offers`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `order_id` | uuid FK → orders NOT NULL | |
| `driver_id` | uuid FK → profiles NOT NULL | |
| `status` | job_offer_status NOT NULL DEFAULT 'offered' | |
| `offered_at` | timestamptz NOT NULL DEFAULT now() | |
| `responded_at` | timestamptz | |
| `expires_at` | timestamptz | |
| | | UNIQUE (`order_id`, `driver_id`) |

**First-accept-wins is enforced here by a partial unique index:**

```sql
create unique index job_offers_one_accepted_per_order
  on job_offers (order_id)
  where status = 'accepted';
```

Combined with a `SECURITY DEFINER` function that locks the row and updates the offer and the order in one transaction, this makes the race impossible to lose regardless of how many drivers tap accept simultaneously. Application-level checks are not sufficient — see [07-dispatch](07-dispatch.md).

### `attachments`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `order_id` | uuid FK → orders NOT NULL | |
| `kind` | attachment_kind NOT NULL | |
| `storage_path` | text NOT NULL | Private bucket |
| `content_type` | text | |
| `size_bytes` | int | |
| `uploaded_by` | uuid FK → profiles | |
| `skip_reason` | text | Set when a prompted photo was skipped |
| `created_at` | timestamptz NOT NULL DEFAULT now() | |

`skip_reason` is what makes "prompt but never block" auditable rather than a silent gap in the evidence trail.

### `notifications`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `order_id` | uuid FK → orders | |
| `channel` | notification_channel NOT NULL | |
| `template_key` | text NOT NULL | |
| `to_address` | text NOT NULL | |
| `subject` | text | |
| `body` | text | Rendered |
| `provider` | text | `mailgun` or `twilio` |
| `provider_message_id` | text | |
| `status` | notification_status NOT NULL DEFAULT 'queued' | |
| `error` | text | |
| `dedupe_key` | text UNIQUE | Prevents double-sends on workflow retry |
| `sent_at` | timestamptz | |
| `created_at` | timestamptz NOT NULL DEFAULT now() | |

`dedupe_key` (typically `order_id:template_key`) is essential: Inngest retries steps, and a customer receiving two payment requests is a trust problem.

### `payments`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `order_id` | uuid FK → orders NOT NULL | |
| `provider` | text NOT NULL DEFAULT 'stripe' | |
| `amount_cents` | int NOT NULL | |
| `currency` | text NOT NULL DEFAULT 'usd' | |
| `stripe_payment_link_id` | text | |
| `stripe_session_id` | text UNIQUE | Webhook correlation |
| `url` | text | |
| `status` | payment_status NOT NULL DEFAULT 'created' | |
| `paid_at` | timestamptz | |
| `raw` | jsonb | |
| `created_at` | timestamptz NOT NULL DEFAULT now() | |

---

## Indexes

Beyond primary and foreign keys:

| Table | Index | Purpose |
|---|---|---|
| `orders` | (`status`, `created_at`) | Dispatcher board ordering |
| `orders` | (`company_id`, `created_at` desc) | Customer order history |
| `orders` | (`assigned_driver_id`, `status`) | Driver's active jobs |
| `orders` | unique (`order_number`) | Human reference lookup |
| `inbound_emails` | unique (`mailgun_message_id`) | Idempotency |
| `inbound_emails` | (`recipient_alias`, `received_at` desc) | Per-company intake history |
| `job_offers` | partial unique (`order_id`) where accepted | **First-accept-wins** |
| `job_offers` | (`driver_id`, `status`) | Driver's open offers |
| `order_status_events` | (`order_id`, `created_at`) | Status timeline |
| `notifications` | unique (`dedupe_key`) | Send idempotency |
| `parse_attempts` | (`inbound_email_id`, `created_at`) | Parse diagnostics |

---

## Row Level Security

RLS is enabled on every table in `public`. Policies are summarised here and specified in full in [10-auth-and-permissions](10-auth-and-permissions.md).

| Table | Customer | Driver | Dispatcher |
|---|---|---|---|
| `companies` | own row | — | all |
| `profiles` | own row | own row | all |
| `company_sites` | own company | — | all |
| `retailer_stores` | read | read | all |
| `orders` | own company | assigned, or offered to them | all |
| `order_items` | via order | via order | all |
| `order_status_events` | via order | via order | all |
| `job_offers` | — | own offers | all |
| `attachments` | via order | via order | all |
| `notifications` | — | — | all |
| `payments` | own company (read) | — | all |
| `inbound_emails`, `parse_attempts` | — | — | all |

Route handlers use the **service role** and bypass RLS deliberately — inbound webhooks have no user context. Those handlers are the only place the service role appears, and they never trust client input.

---

## Migrations

- SQL migration files live in `supabase/migrations/`, committed to the repo and applied with the Supabase CLI.
- Schema changes are never applied by hand in the dashboard.
- Seed data (retailer stores, a demo company) lives in `supabase/seed/` and is idempotent.
- RLS policies are created in the same migration as the table they protect — never as a follow-up.
