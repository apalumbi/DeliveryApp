# ADR-0009: Inline intake and cron-swept background work

- **Status:** Accepted
- **Date:** 2026-09-18
- **Deciders:** Delivery App team
- **Supersedes:** [ADR-0005](0005-inngest-durable-workflows.md)

## Context

ADR-0005 chose a durable workflow engine (Inngest) because parsing an inbound cart was assumed to be slow and fallible: Mailgun retries a slow webhook, and a retry that hits the idempotency constraint returns `200` without processing — so a timed-out first attempt would silently lose the order.

Reviewing that assumption against the MVP's actual scale (a handful of companies, two drivers) and the actual parser:

- The deterministic parser is a sub-second HTML extraction. Only the LLM fallback — a rare failure path — is slow.
- A parse failure is not a lost order: it is recorded in `parse_attempts`, becomes a `needs_review` order, and alerts a dispatcher. The human backstop already exists.
- The remaining scheduled work is coarse: notification retries and broadcast expiry. Nothing needs multi-hour durable waits beyond "is this order still unaccepted?"

A workflow engine therefore adds a vendor, credentials, and a second system to debug in exchange for deferred work the system does not need.

## Decision

1. **Intake is inline.** The webhook persists the raw email, parses it in the same request, creates the order (or a `needs_review` order), and then acknowledges. The deterministic path is sub-second.
2. **Retries are recovery.** A duplicate delivery whose `inbound_emails` row is still `pending`/`failed` is re-processed; one already `parsed`/`needs_review` is a no-op. `orders.inbound_email_id` is unique, so two concurrent attempts cannot create two orders.
3. **Background work is a cron sweep.** Vercel Cron calls `/api/cron/*` routes: drain the notification outbox, flag expired broadcasts. Timers are queries (`older than the TTL`), not sleeping workflows.
4. **No workflow engine in the MVP.** ADR-0005 is superseded.

## Consequences

### Positive

- No additional vendor, credentials, or dashboard; one system to debug.
- Intake is immediate and observable: an email either produces an order or lands in the review queue with a recorded reason.
- The retry semantics are safer than the deferred design: a Mailgun retry is a recovery path rather than a silent no-op.

### Negative / trade-offs

- No step-level retry history or run dashboard; failures are logged and surfaced through the dispatcher's system-health panel instead.
- Cron granularity is about a minute — "expire this broadcast" and "retry this send" are approximate.
- The LLM fallback must fit a time budget in the request. If it grows, it moves behind a dispatcher-triggered retry in the review queue.
- If background work later grows long waits or complex fan-out, this decision should be revisited; the workflow-engine option remains open.

## Alternatives considered

| Alternative | Why not |
|---|---|
| **Inngest (ADR-0005)** | Justified by deferred parsing, which is no longer needed. Worth revisiting only if background work grows beyond coarse sweeps. |
| **Trigger.dev / pg-boss** | The same trade as Inngest: a vendor or a long-running worker for work the MVP does not have. |
| **Vercel Cron + a status table** | This is what we adopted. ADR-0005 rejected it as "a worse workflow engine" — at a scale this MVP does not operate at. |
| **Synchronous everything, no outbox** | A provider failure would be invisible and unrecoverable; the outbox costs one table that `notifications` already is. |

## Related

- [02-containers](../architecture/02-containers.md)
- [05-email-intake](../architecture/05-email-intake.md)
- [06-cart-parsing](../architecture/06-cart-parsing.md)
- [08-notifications](../architecture/08-notifications.md)
