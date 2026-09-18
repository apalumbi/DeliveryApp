# ADR-0003: Mailgun for inbound cart email and outbound customer email

- **Status:** Accepted
- **Date:** 2026-09-16
- **Deciders:** Delivery App team

## Context

Email is not a convenience in this product — it is **the** integration point with Home Depot and Lowe's. Customers share a cart, the retailer sends us an email, and that email is the order.

We need:

1. Inbound receipt on a domain we control, with a catch-all so any `<company-alias>@orders.<domain>` is accepted without pre-registering each address.
2. The raw HTML body, because the line items live in the markup and there is no plain-text alternative.
3. Sender verification, because anyone can send mail to our alias and a forged email would dispatch a driver to buy materials.
4. Outbound transactional email for checkout invites and payment requests.
5. A local development story that does not require sending real mail.

## Decision

Use **Mailgun** for both inbound (Routes with `store()` + `forward()`) and outbound sending.

## Consequences

### Positive

- `match_recipient("(?P<alias>[^@]+)@orders\.example\.com")` gives a catch-all with a named capture, so onboarding a company is a database insert rather than an email-provider configuration change. This directly enables the per-company alias model.
- The `forward()` webhook delivers `body-html` as a discrete field, plus `body-plain`, `stripped-html`, and `message-headers` — enough to parse and to verify DKIM.
- `store()` retains the original MIME for 3 days independently of our webhook, which is a recovery path if the endpoint is down or the payload is truncated.
- One vendor and one domain configuration for both directions.
- Webhook authenticity is handled by a documented HMAC-SHA256 signature scheme, so we are not inventing authentication for a public endpoint.

### Negative / trade-offs

- **Routes are scoped per domain.** Staging and production must use separate subdomains, or every inbound cart email is delivered to both environments. This is an operational constraint we must honour, not a preference.
- Mailgun's `forward()` POST is form-encoded (or multipart when attachments are present), which is less convenient than JSON.
- Mailgun retries on a slow response, so the webhook must process quickly and be idempotent — a retry of an unfinished delivery is re-processed, not duplicated (see [ADR-0009](0009-inline-intake-and-cron-sweeps.md)).
- Deliverability for outbound depends on SPF/DKIM/DMARC being configured correctly, which is a prerequisite we must not skip.

## Alternatives considered

| Alternative | Why not |
|---|---|
| **Resend** | Strong inbound support and a cleaner DX, but the team expressed a preference for Mailgun. Both are viable; the architecture does not depend on which |
| **Postmark** | Excellent inbound parsing and deliverability, but we would likely add a second vendor for templated outbound — two email vendors for one need |
| **SendGrid / Amazon SES** | Mature inbound parse APIs, but heavier setup and a clunkier developer experience for this use case |
| **IMAP mailbox polling (e.g. Gmail)** | This is what the low-tech process does. It means polling, no delivery guarantee, no signature verification, and parsing a mailbox rather than receiving a structured webhook. It cannot support per-company aliases cleanly |
| **A shared mailbox with forwarding rules** | Same drawbacks, plus per-company routing would become a growing set of provider-side rules — configuration as data, living outside the database |

## Related

- [05-email-intake](../architecture/05-email-intake.md)
- [11-deployment-and-environments](../architecture/11-deployment-and-environments.md)
