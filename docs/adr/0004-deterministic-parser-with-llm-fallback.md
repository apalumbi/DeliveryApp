# ADR-0004: Deterministic parsers with an LLM fallback and a human backstop

- **Status:** Accepted
- **Date:** 2026-09-16
- **Deciders:** Delivery App team

## Context

Parsing the retailer's share-cart email is the core of the product. Everything downstream depends on it being correct.

We inspected a real Home Depot share-cart email. It contains every field we need — brand, description, model number, store SKU, quantity, line total, product image — in stable, identifiable markup, with a subtotal we can reconcile against.

We also know the shape of the risk: retailers change email templates without notice, and we start with two retailers and will add more.

## Decision

Three tiers, in order:

1. **Deterministic HTML parser per retailer** — exact, free, instant, and testable.
2. **LLM extraction** — same output schema, same validation, used only when tier 1 fails.
3. **Dispatcher review queue** — the order is created in `needs_review` and a human resolves it.

All three tiers produce the **same validated shape** (`CartSchema`). Validation includes arithmetic reconciliation: the sum of line totals must equal the stated subtotal.

## Consequences

### Positive

- The common path costs nothing, is instantaneous, and is deterministic — the same email always produces the same order.
- Reconciliation against the retailer's own subtotal is a far stronger correctness signal than any confidence score. If we parsed the wrong rows, or double-parsed the duplicated mobile view, the arithmetic will not add up.
- The LLM tier covers unknown retailers and template drift without a code change, which matters because we start with an unknown Lowe's format.
- The human tier means a parse failure never blocks a customer's order.
- `parse_attempts` records every attempt with parser version, so drift is visible as a metric rather than discovered by a customer complaint.

### Negative / trade-offs

- Two retailers means two parsers to maintain, and each new retailer adds another.
- Deterministic parsers are brittle by nature. The mitigation is golden-file tests, replay tests over retained history, and the fallback tiers — not the hope that templates stay stable.
- The LLM tier costs money per invocation, is non-deterministic, and adds a vendor. It is deliberately not on the hot path.
- Three tiers is more code than any single approach, and the review queue is real UI that must be built.

### The rule that makes this safe

**An LLM response is never trusted on its own.** It must satisfy the identical schema and reconciliation checks. A hallucinated item that does not reconcile becomes a `needs_review` order, not a wrong order.

## Alternatives considered

| Alternative | Why not |
|---|---|
| **LLM-only** | Simplest to write and instantly adaptable, but pays per email for a solved problem, is non-deterministic, and still requires validation — so the validation work is not saved, only the parser |
| **Deterministic only** | Cheapest and most predictable, but every template change is silent breakage and every new retailer is an engineering project. Given that we know Lowe's format is unknown, this would block the second retailer entirely |
| **Human-only (dispatcher pastes the cart)** | Zero parsing risk, but it is the manual step the product exists to eliminate. Retained only as the failure backstop |
| **Third-party email-parsing service** | Adds a vendor for something we can do ourselves, and the retailer-specific markup knowledge still has to come from us |

## Related

- [06-cart-parsing](../architecture/06-cart-parsing.md)
- [12-deferred-and-extension-points](../architecture/12-deferred-and-extension-points.md)
