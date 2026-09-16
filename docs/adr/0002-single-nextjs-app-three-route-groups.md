# ADR-0002: A single Next.js application with three role-guarded route groups

- **Status:** Accepted
- **Date:** 2026-09-16
- **Deciders:** Delivery App team

## Context

Three personas need a user interface: construction customers (portal), dispatchers (console), and delivery drivers (mobile-first job app). The team's stated preference was "maybe one front end per user persona."

These three UIs differ meaningfully in shape. The dispatcher console is a dense desktop tool. The driver app is mobile-first with camera capture. The customer portal is a conventional transactional web app. But they share a domain model, validation logic, and design language.

## Decision

Build **one Next.js application** with three route groups — `(dispatch)`, `(driver)`, `(portal)` — each guarded by role in middleware. One repository, one deployment, one shared component library.

## Consequences

### Positive

- Shared types, validation schemas, and UI components across all three personas. The `OrderStatus` enum and the parser's `CartSchema` exist once.
- One CI pipeline, one set of environment variables, one deploy.
- Cross-persona features are trivial: a dispatcher viewing a customer's checkout, or a status timeline rendered identically in the console and the portal.
- The driver "app" is a PWA — no app store review, no separate release cadence, and it updates instantly.

### Negative / trade-offs

- **The driver app is mobile-first but shares a bundle with a desktop console.** Bundle size discipline is required; route groups plus per-route code splitting mitigate but do not eliminate this.
- A change to shared code can regress all three personas at once. Mitigated by role-scoped tests.
- One deploy means a dispatcher-console change and a driver-app change cannot ship independently.
- If the driver experience eventually needs native capabilities (background location, reliable push), a PWA will not suffice and a separate app becomes necessary.

### When to revisit

Split the driver app into its own deployment if any of these become true:

1. The driver UI needs native device capabilities a PWA cannot provide.
2. Driver releases need a cadence independent of the console.
3. The driver bundle cannot be kept acceptably small.

Until one of those is real, three deployments would mean three times the CI, environment, and auth wiring for no user-visible benefit.

## Alternatives considered

| Alternative | Why not |
|---|---|
| **Turborepo, one app per persona** | Clean boundaries and independent deploys, but triples CI, environment configuration, and auth wiring. Premature for an MVP with no users |
| **Two apps: internal (dispatch + driver) and customer** | Splits by audience risk, which is not the axis that matters here. Dispatch and driver share far more with each other than the customer does, but the customer shares the entire domain model |
| **One app with no route-group separation** | Simplest to start, but role boundaries blur immediately and the eventual split becomes a refactor rather than a directory move |

## Related

- [02-containers](../architecture/02-containers.md)
- [10-auth-and-permissions](../architecture/10-auth-and-permissions.md)
