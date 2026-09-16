# Runbooks

Operational guides, one per persona, plus the rehearsal plan.

> These describe the **new** system. The PDFs in `External Notes/` describe the retired low-tech process (Google Sheets + Slack) and are kept for historical reference only.

## Guides

| Guide | Audience | Covers |
|---|---|---|
| [Dispatcher guide](dispatcher-guide.md) | Dispatch team | Order review, store assignment, pricing, dispatch, payment, exception handling |
| [Driver guide](driver-guide.md) | Delivery drivers | Accepting jobs, buying materials, status updates, photo evidence, getting paid |
| [Customer guide](customer-guide.md) | Construction customers | Building and sharing a cart, checkout, tracking, receiving, paying |
| [Dry-run checklist](dry-run-checklist.md) | Everyone | Pre-flight prerequisites, the three rehearsal stages, deliberate failure tests, rollback |

## Which guide to read

- **New to the system?** Read your own guide first, then the [dispatcher guide](dispatcher-guide.md) — it explains why the process is shaped the way it is.
- **Rehearsing?** [Dry-run checklist](dry-run-checklist.md) is the script.
- **Debugging a specific order?** [Order lifecycle](../architecture/04-order-lifecycle.md) is the authoritative state machine.

## A note on what changed

The biggest difference from the old process is that **the dispatcher stops being a data conduit**. No copying between systems, no transcribing driver updates, no noticing that payments arrived.

If anyone finds themselves doing work the guides say they shouldn't need to, that's a bug worth reporting — it means something is missing from the system.

## Related

- [Architecture](../architecture/00-overview.md) · [ADRs](../adr/README.md)
