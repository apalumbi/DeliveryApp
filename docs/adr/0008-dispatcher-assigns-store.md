# ADR-0008: The dispatcher assigns the store

- **Status:** Accepted
- **Date:** 2026-09-16
- **Deciders:** Delivery App team

## Context

The driver must know **which store** to go to. This is not a detail — a cart priced for one store's inventory, purchased at a different store, is a failed delivery.

The obvious assumption is that the shared cart carries the store the customer selected. We tested that assumption against a real Home Depot share-cart email.

### What we found

| Investigation | Result |
|---|---|
| Store name, number, or zip anywhere in the email body | **Zero matches** across 136KB of HTML |
| A promising `pickup-store` CSS class | An empty wrapper element — a leftover template class, not data |
| The `Aisle`/`Bay` columns | Present, but empty |
| Fetching the shared cart page directly | **HTTP 403** — Akamai Bot Manager blocks non-browser requests |
| Following the email's "View Cart" link | A tracked redirect through `link.order.homedepot.com`, not the cart URL |

The store appears on the **cart web page** ("Pickup at North Frisco"), not in the email. And that page is not fetchable without bot-bypass infrastructure.

So there are only two real options: extract the store by defeating Akamai, or have a human set it.

## Decision

**The dispatcher selects the store from a seeded `retailer_stores` table** during order review. `orders.retailer_store_id` is null until they do, and a guard prevents the order from advancing to `awaiting_customer` without it.

## Consequences

### Positive

- No scraping, no proxies, no browser farm, and no standing maintenance burden against a retailer that actively blocks automation.
- The store is a **validated foreign key**, not a free-text string. The driver gets a real address, and mileage pricing can use real coordinates later.
- It becomes a deliberate human checkpoint: the dispatcher is already reviewing the order, and confirming the store is a natural part of that review.
- The seeded table gives us store hours and phone numbers for free, which a scraped string would not.

### Negative / trade-offs

- **It is a manual step on every order.** This is the honest cost, and it is the last manual step in the intake path after parsing.
- It is a new failure mode: the dispatcher picks the wrong store and a driver goes to the wrong place. Mitigated by showing the customer's delivery address alongside the store list so the dispatcher can sanity-check proximity.
- Seeding stores is an ongoing chore as the service area grows.
- We cannot validate that the customer's cart was actually built for the store the dispatcher chose. Nothing in the email tells us, so a mismatch is undetectable until the driver is in the store.

### The mitigation that matters

Because a wrong store is undetectable from the email, the store is shown prominently on the customer's checkout page for confirmation, and again on the driver's job card. Two humans see it before anyone drives anywhere.

## Alternatives considered

| Alternative | Why not |
|---|---|
| **Scrape the shared cart page** | Empirically blocked (HTTP 403). Viable only with residential proxies and a stealth browser, at real cost and permanent fragility against an adversarial retailer |
| **Ask the customer to type the store in an email reply** | No scraping, but free-text store names cannot be reliably matched to a real store record, and the driver needs an address |
| **Ask the customer to pick the store in the portal** | Better data than free text and removes the dispatcher step — but it depends on the customer knowing their store's name, and it delays intake. A reasonable future refinement |
| **Infer the store from the delivery address** | Guessing which of several nearby stores the customer used. Wrong guesses are invisible until the driver arrives |

### Revisit if

A real Lowe's email turns out to include the store (formats differ by retailer), or the portal later asks the customer to pick a store during checkout. Either would let the dispatcher step become a confirmation rather than an entry.

## Related

- [05-email-intake](../architecture/05-email-intake.md)
- [06-cart-parsing](../architecture/06-cart-parsing.md)
- [03-data-model](../architecture/03-data-model.md)
