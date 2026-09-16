# ADR-0005: Inngest for durable workflows

- **Status:** Accepted
- **Date:** 2026-09-16
- **Deciders:** Delivery App team

## Context

Several pieces of work in this domain are long-running, must survive failures, and cannot block an HTTP request:

| Work | Constraint |
|---|---|
| Parsing an inbound cart | Mailgun retries if the webhook is slow, so parsing cannot be inline |
| Waiting for a customer to complete checkout | Hours or days |
| Offer expiry | Needs a timer per job offer |
| Provider retries | Twilio and Stripe both fail transiently; each step needs independent retry |

The hosting target is Vercel, where functions are short-lived and there is no long-running process to host a queue worker.

## Decision

Use **Inngest** for durable, multi-step workflows. Route handlers validate, persist, enqueue, and return `200` fast. Everything else runs as a workflow step.

## Consequences

### Positive

- `step.sleep` handles the multi-hour waits (offer expiry, stalled checkout) without polling or a cron table. This is the single biggest reason to adopt a workflow engine rather than a job queue.
- Each step has independent retry with backoff, and step-level observability — we can see exactly which step of an order's intake failed.
- Workflow runs are keyed, so a replayed webhook event is a no-op rather than a duplicate order.
- No long-running service to host or operate, which matters given a small team and no dedicated infrastructure work.
- The dev server runs locally, so workflows are testable without deploying.

### Negative / trade-offs

- Another vendor and another set of credentials.
- Workflow code is written against Inngest's step API, which is a form of lock-in. The functions are thin orchestration, so the domain logic inside them stays portable.
- Debugging spans two systems: our logs and the Inngest dashboard.
- Step functions must be idempotent, because retries re-execute them. `notifications.dedupe_key` exists specifically because of this.

### Design rule this imposes

**Never parse inline in a webhook handler.** The handler persists the raw email and enqueues; parsing happens in a workflow. This is not a style preference — Mailgun's retry behaviour makes an inline parser a self-inflicted retry storm.

## Alternatives considered

| Alternative | Why not |
|---|---|
| **Inline processing + a retry table swept by cron** | No vendor and fewest moving parts, but multi-hour waits and multi-step retries get hand-rolled. We would be building a worse workflow engine |
| **Self-hosted worker with pg-boss** | Uses Postgres as the queue, so no vendor. But it is a long-running service to host and monitor, which Vercel does not accommodate |
| **Trigger.dev** | Functionally similar and a fine choice. Inngest was selected on the strength of its `step.sleep` ergonomics and local dev server; the architecture does not depend on which |
| **Vercel cron + a status table** | Works for coarse polling, but not for per-offer timers or step-level retries. Would require a bespoke state machine in the database |
| **Synchronous everything** | Simplest possible, but a slow LLM fallback would cause Mailgun to retry and duplicate orders |

## Related

- [02-containers](../architecture/02-containers.md)
- [07-dispatch](../architecture/07-dispatch.md)
- [08-notifications](../architecture/08-notifications.md)
