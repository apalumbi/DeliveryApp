-- 0001_baseline.sql — Delivery App base schema
--
-- THE BASE SCRIPT. Applied once, in order, and never edited after it has run
-- against an environment. Every later schema change is a new numbered file
-- (0002_..., 0003_...). See docs/architecture/03-data-model.md#migrations.
--
-- Creates, in order: extension, enum types, tables, indexes, the updated_at
-- trigger, RLS helper functions, RLS policies, and grants.
--
-- Sources of truth:
--   docs/architecture/03-data-model.md           tables, enums, indexes
--   docs/architecture/10-auth-and-permissions.md RLS policies, helper functions
--
-- Safe to run against a database that does not yet have any of these objects.
-- It is NOT idempotent: a second run fails on the first `create type`, which is
-- the intended behaviour — a baseline applied twice means someone has lost track
-- of migration state.

-- ---------------------------------------------------------------------------
-- Extension
-- ---------------------------------------------------------------------------

-- citext backs the case-insensitive unique identifiers. companies.order_alias is
-- the sole order-attribution mechanism, and a case collision would route one
-- company's orders to another. Referenced as extensions.citext below so the type
-- resolves regardless of the session's search_path.
create extension if not exists citext with schema extensions;

-- ---------------------------------------------------------------------------
-- Enum types
-- ---------------------------------------------------------------------------

create type user_role as enum ('dispatcher', 'driver', 'customer');

-- `cancelled` and `substituted` ship with no UI from day one. That is what makes
-- those features additive later. See 12-deferred-and-extension-points.md.
create type order_status as enum (
  'received',
  'needs_review',
  'awaiting_customer',
  'customer_confirmed',
  'driver_requested',
  'driver_assigned',
  'driver_at_store',
  'items_purchased',
  'en_route',
  'delivered',
  'payment_requested',
  'paid',
  'closed',
  'cancelled'
);

create type retailer as enum ('homedepot', 'lowes');

create type inbound_processing_status as enum (
  'pending',
  'parsed',
  'needs_review',
  'failed',
  'ignored'
);

create type parse_strategy as enum ('deterministic', 'llm', 'manual');

create type item_status as enum ('pending', 'purchased', 'unavailable', 'substituted');

create type attachment_kind as enum ('receipt', 'delivery', 'item_photo', 'other');

create type notification_channel as enum ('email', 'sms');

create type notification_status as enum ('queued', 'sent', 'delivered', 'failed', 'bounced');

create type payment_status as enum ('created', 'sent', 'paid', 'expired', 'refunded');

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

-- Reference data -------------------------------------------------------------

create table companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  order_alias extensions.citext not null unique,
  billing_email extensions.citext,
  phone text,
  notes text,
  active boolean not null default true
);

-- One row per authenticated user; extends auth.users.
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role user_role not null,
  company_id uuid references companies (id),
  full_name text,
  phone text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  -- A customer belongs to exactly one company; dispatch and drivers belong to none.
  constraint profiles_customer_company check ((role = 'customer') = (company_id is not null))
);

create table company_sites (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies (id),
  label text,
  address_line1 text,
  address_line2 text,
  city text,
  state text,
  postal_code text,
  lat double precision,
  lng double precision,
  contact_name text,
  contact_phone text,
  instructions text,
  is_default boolean not null default false
);

-- Seeded store list. The only source of store truth: the cart email carries no
-- store identifier (verified across both Home Depot samples).
create table retailer_stores (
  id uuid primary key default gen_random_uuid(),
  retailer retailer not null,
  store_number text not null,
  name text not null,
  address_line1 text,
  city text,
  state text,
  postal_code text,
  lat double precision,
  lng double precision,
  phone text,
  hours jsonb,
  active boolean not null default true,
  unique (retailer, store_number)
);

-- Intake ---------------------------------------------------------------------

-- Every message that reaches the inbound webhook, stored before any
-- interpretation. Storing raw first is what makes the parser safely re-runnable.
-- order_id's foreign key is added after `orders` exists (circular reference).
create table inbound_emails (
  id uuid primary key default gen_random_uuid(),
  mailgun_message_id text unique,
  message_id_header text,
  recipient text not null,
  recipient_alias extensions.citext,
  sender_email text not null,
  sender_name text,
  subject text,
  body_html text,
  body_plain text,
  stripped_html text,
  headers jsonb,
  raw_storage_path text,
  processing_status inbound_processing_status not null default 'pending',
  order_id uuid,
  received_at timestamptz not null
);

-- One row per extraction attempt — the telemetry that makes template drift
-- visible. Unique inbound_email_id makes inline re-processing idempotent.
create table parse_attempts (
  id uuid primary key default gen_random_uuid(),
  inbound_email_id uuid not null unique references inbound_emails (id),
  strategy parse_strategy not null,
  parser_version text,
  succeeded boolean not null,
  confidence numeric,
  output jsonb,
  errors jsonb,
  llm_model text,
  duration_ms int,
  created_at timestamptz not null default now()
);

-- Orders ---------------------------------------------------------------------

create table orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  company_id uuid not null references companies (id),
  inbound_email_id uuid references inbound_emails (id),
  retailer retailer not null,
  retailer_store_id uuid references retailer_stores (id),
  status order_status not null default 'received',
  requester_name text,
  requester_email extensions.citext,
  materials_subtotal_cents int not null default 0,
  sizing_fee_cents int not null default 0,
  mileage_fee_cents int not null default 0,
  discount_cents int not null default 0,
  tax_cents int not null default 0,
  total_cents int not null default 0,
  quote_breakdown jsonb,
  delivery_address jsonb,
  delivery_instructions text,
  site_id uuid references company_sites (id),
  assigned_driver_id uuid references profiles (id),
  customer_confirmed_at timestamptz,
  confirmed_by_profile_id uuid references profiles (id),
  cancellation_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders (id) on delete cascade,
  line_no int not null,
  description text not null,
  brand text,
  model_number text,
  store_sku text,
  quantity int not null default 1,
  -- Derived, not extracted: the cart email prints only a per-line total.
  -- The line total is authoritative for money; unit price is for display.
  unit_price_cents int,
  line_total_cents int not null default 0,
  image_url text,
  aisle text,
  bay text,
  item_status item_status not null default 'pending',
  substituted_by_item_id uuid references order_items (id),
  note text
);

-- Append-only audit log. Never updated, never deleted.
create table order_status_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders (id),
  from_status order_status,
  to_status order_status not null,
  actor_profile_id uuid references profiles (id),
  actor_role user_role,
  source text,
  note text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- A driver's "no" on an open posting. Append-only; the only per-driver dispatch
-- fact the MVP keeps. There is deliberately no per-driver offer table.
create table job_declines (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders (id),
  driver_id uuid not null references profiles (id),
  reason text,
  created_at timestamptz not null default now(),
  unique (order_id, driver_id)
);

create table attachments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders (id),
  kind attachment_kind not null,
  storage_path text not null,
  content_type text,
  size_bytes int,
  uploaded_by uuid references profiles (id),
  -- Set when a prompted photo was skipped: makes "prompt but never block"
  -- auditable rather than a silent gap in the evidence trail.
  skip_reason text,
  created_at timestamptz not null default now()
);

-- Outbox and money -----------------------------------------------------------

create table notifications (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders (id),
  channel notification_channel not null,
  template_key text not null,
  to_address text not null,
  subject text,
  body text,
  provider text,
  provider_message_id text,
  status notification_status not null default 'queued',
  error text,
  attempts int not null default 0,
  -- Typically `order_id:template_key`. Sends are retried by the outbox sweep,
  -- and a customer receiving two payment requests is a trust problem.
  dedupe_key text unique,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders (id),
  provider text not null default 'stripe',
  amount_cents int not null,
  currency text not null default 'usd',
  stripe_payment_link_id text,
  stripe_session_id text unique,
  url text,
  status payment_status not null default 'created',
  paid_at timestamptz,
  raw jsonb,
  created_at timestamptz not null default now()
);

-- Close the inbound_emails <-> orders cycle now that both tables exist.
alter table inbound_emails
  add constraint inbound_emails_order_id_fkey
  foreign key (order_id) references orders (id);

-- ---------------------------------------------------------------------------
-- Indexes
--
-- Beyond primary keys and the inline unique constraints. job_declines (order_id)
-- from the design table is omitted: it is a prefix of the unique
-- (order_id, driver_id) index, which already serves those lookups.
-- ---------------------------------------------------------------------------

create index orders_status_created_at_idx on orders (status, created_at);
create index orders_company_id_created_at_idx on orders (company_id, created_at desc);
create index orders_assigned_driver_id_status_idx on orders (assigned_driver_id, status);
-- One order per inbound email. Multiple NULLs are allowed, which is correct:
-- an order may exist before its email is linked, and not every email becomes one.
create unique index orders_inbound_email_id_key on orders (inbound_email_id);
create index inbound_emails_recipient_alias_received_at_idx
  on inbound_emails (recipient_alias, received_at desc);
create index order_status_events_order_id_created_at_idx
  on order_status_events (order_id, created_at);
create index notifications_status_created_at_idx on notifications (status, created_at);
create index parse_attempts_inbound_email_id_created_at_idx
  on parse_attempts (inbound_email_id, created_at);

-- ---------------------------------------------------------------------------
-- updated_at maintenance
-- ---------------------------------------------------------------------------

-- orders.updated_at is read by the driver job board (posted_at) and the console
-- ordering, so it has to be maintained by the database rather than trusted to
-- every write path.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger orders_set_updated_at
  before update on orders
  for each row
  execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS helper functions
--
-- Policies that query profiles from within a policy on profiles recurse
-- infinitely. These security definer helpers break the cycle and are stable so
-- they are evaluated once per statement. Every one of them pins search_path:
-- without it a caller can shadow `profiles` with a table in a schema they
-- control and subvert the check.
-- ---------------------------------------------------------------------------

create or replace function public.is_dispatcher() returns boolean
language sql security definer stable set search_path = public as $$
  select exists (
    select 1 from profiles
     where id = auth.uid() and role = 'dispatcher' and active
  )
$$;

create or replace function public.current_company_id() returns uuid
language sql security definer stable set search_path = public as $$
  select company_id from profiles where id = auth.uid() and active
$$;

create or replace function public.is_driver() returns boolean
language sql security definer stable set search_path = public as $$
  select exists (
    select 1 from profiles
     where id = auth.uid() and role = 'driver' and active
  )
$$;

-- The redacted read path for open postings. Drivers deliberately cannot select
-- orders for postings they have not accepted: a posting must show the store and
-- item count, but must not reveal the customer's address, contact, or
-- instructions before they commit. Redaction is structural, not a UI concern —
-- the address is not in the return type at all.
-- count() returns bigint; cast to int to match the declared column type.
create or replace function public.get_open_jobs_for_driver()
returns table (
  order_id uuid,
  order_number text,
  retailer retailer,
  store_name text,
  store_address text,
  item_count int,
  posted_at timestamptz
)
language sql security definer stable set search_path = public as $$
  select ord.id, ord.order_number, ord.retailer,
         s.name, s.address_line1, count(i.id)::int, ord.updated_at
    from orders ord
    left join retailer_stores s on s.id = ord.retailer_store_id
    left join order_items i on i.order_id = ord.id
   where ord.status = 'driver_requested'
     and not exists (
       select 1 from job_declines d
        where d.order_id = ord.id and d.driver_id = auth.uid()
     )
   group by ord.id, s.name, s.address_line1
$$;

-- ---------------------------------------------------------------------------
-- Row Level Security
--
-- Enabled on every table in public. Default posture is deny; access is granted
-- explicitly below. Policies ship in the same migration as their tables.
-- ---------------------------------------------------------------------------

alter table companies enable row level security;
alter table profiles enable row level security;
alter table company_sites enable row level security;
alter table retailer_stores enable row level security;
alter table inbound_emails enable row level security;
alter table parse_attempts enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table order_status_events enable row level security;
alter table job_declines enable row level security;
alter table attachments enable row level security;
alter table notifications enable row level security;
alter table payments enable row level security;

-- Reference data -------------------------------------------------------------

create policy companies_select on companies for select
  using (is_dispatcher() or id = current_company_id());

create policy companies_write on companies for all
  using (is_dispatcher()) with check (is_dispatcher());

create policy profiles_select on profiles for select
  using (id = auth.uid() or is_dispatcher());

create policy profiles_write on profiles for all
  using (is_dispatcher()) with check (is_dispatcher());

create policy company_sites_select on company_sites for select
  using (is_dispatcher() or company_id = current_company_id());

create policy company_sites_write on company_sites for all
  using (is_dispatcher()) with check (is_dispatcher());

-- Readable by any authenticated user; writable by dispatchers only.
create policy retailer_stores_select on retailer_stores for select
  using (auth.uid() is not null);

create policy retailer_stores_write on retailer_stores for all
  using (is_dispatcher()) with check (is_dispatcher());

-- Orders ---------------------------------------------------------------------

create policy orders_dispatcher on orders for all
  using (is_dispatcher()) with check (is_dispatcher());

create policy orders_customer on orders for select
  using (company_id = current_company_id());

create policy orders_driver on orders for select
  using (is_driver() and assigned_driver_id = auth.uid());

-- Order children -------------------------------------------------------------
--
-- Visibility is inherited from the parent order. The subquery is itself subject
-- to the orders policies, so it composes correctly for all three roles without
-- restating the rules. Writes are dispatcher-only: drivers hold no write policy
-- on orders, so an assignment cannot be fabricated by writing rows directly.

create policy order_items_read on order_items for select
  using (exists (select 1 from orders o where o.id = order_items.order_id));

create policy order_items_write on order_items for all
  using (is_dispatcher()) with check (is_dispatcher());

create policy order_status_events_read on order_status_events for select
  using (exists (select 1 from orders o where o.id = order_status_events.order_id));

create policy order_status_events_write on order_status_events for all
  using (is_dispatcher()) with check (is_dispatcher());

create policy attachments_read on attachments for select
  using (exists (select 1 from orders o where o.id = attachments.order_id));

create policy attachments_write on attachments for all
  using (is_dispatcher()) with check (is_dispatcher());

-- Dispatch -------------------------------------------------------------------

-- Drivers may insert and read only their own declines.
create policy job_declines_driver_insert on job_declines for insert
  with check (driver_id = auth.uid());

create policy job_declines_read on job_declines for select
  using (driver_id = auth.uid() or is_dispatcher());

-- Outbox, money, and intake --------------------------------------------------

create policy notifications_dispatcher on notifications for all
  using (is_dispatcher()) with check (is_dispatcher());

create policy payments_dispatcher on payments for all
  using (is_dispatcher()) with check (is_dispatcher());

create policy payments_customer_read on payments for select
  using (exists (
    select 1 from orders o
     where o.id = payments.order_id
       and o.company_id = current_company_id()
  ));

-- inbound_emails holds raw customer email including any PII the retailer
-- embedded. Dispatcher-only; never exposed to customers or drivers.
create policy inbound_emails_dispatcher on inbound_emails for all
  using (is_dispatcher()) with check (is_dispatcher());

create policy parse_attempts_dispatcher on parse_attempts for all
  using (is_dispatcher()) with check (is_dispatcher());

-- ---------------------------------------------------------------------------
-- Grants
--
-- RLS is the access-control layer, but a role still needs the underlying grant
-- to reach a policy at all. anon gets no table privileges: every policy keys off
-- auth.uid(), so an anonymous request has no access by construction.
-- ---------------------------------------------------------------------------

grant usage on schema public to anon, authenticated, service_role;

grant select, insert, update, delete on all tables in schema public to authenticated;
grant all on all tables in schema public to service_role;

-- The one RPC the driver app calls directly.
grant execute on function public.get_open_jobs_for_driver() to authenticated;
