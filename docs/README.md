# Delivery App — Documentation

Design and architecture documentation for the construction-site delivery MVP.

## Start here

**[architecture/00-overview.md](architecture/00-overview.md)** — the entry point. Locked technical decisions, MVP in/out scope, the full architecture with diagrams, the data model, the phased roadmap, and open blockers.

## Document set

Documents marked **planned** are part of Phase 0 and not yet written.

| # | Document | Status | What it covers |
|---|---|---|---|
| 00 | [Overview](architecture/00-overview.md) | **Written** | Decisions, scope, roadmap — read first |
| 01 | `architecture/01-system-context.md` | planned | Actors and external systems (C4 L1) |
| 02 | `architecture/02-containers.md` | planned | Deployable units and how they talk (C4 L2) |
| 03 | `architecture/03-data-model.md` | planned | ERD and table-by-table reference |
| 04 | `architecture/04-order-lifecycle.md` | planned | State machine, transitions, permissions |
| 05 | `architecture/05-email-intake.md` | planned | Mailgun routes, alias scheme, webhook contract |
| 06 | `architecture/06-cart-parsing.md` | planned | Parser design, field map, fallback ladder |
| 07 | `architecture/07-dispatch.md` | planned | Job offers and first-accept-wins |
| 08 | `architecture/08-notifications.md` | planned | Templates and trigger matrix |
| 09 | `architecture/09-payments.md` | planned | Stripe Payment Links and webhooks |
| 10 | `architecture/10-auth-and-permissions.md` | planned | Roles, RLS, route guards |
| 11 | `architecture/11-deployment-and-environments.md` | planned | Environments and release process |
| 12 | `architecture/12-deferred-and-extension-points.md` | planned | What we're not building, and its hook |

### Other directories

| Directory | Status | Contents |
|---|---|---|
| `adr/` | planned | Architecture Decision Records — one per locked decision, with alternatives rejected and why |
| `runbooks/` | planned | Operational guides per persona plus the dry-run checklist |

> The runbooks describe the **new** system. The PDFs in `External Notes/` describe the retired low-tech process and are kept for historical reference only.

## Conventions

- Diagrams are [Mermaid](https://mermaid.js.org/) in fenced code blocks so they render on GitHub and in most editors, and diff cleanly in review.
- Anything not built in the MVP is listed in the deferred-work document alongside the specific hook that makes it a small addition later, rather than an open-ended backlog item.
