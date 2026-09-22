<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Design system

- Tokens live in `app/styles/theme.css`: layer 1 primitives, layer 2 semantic roles (`bg-surface`, `text-ink-muted`, `bg-accent`, `bg-success-bg`, …). Components use semantic roles only. Alternate themes override the semantic layer via `[data-theme]` on `<html>`.
- Components live in `components/ui/` and use CVA variants + `cn()` (`lib/utils.ts`). When adding a CVA variant, forward it in the component's `cva({ ... })` call — a variant that isn't forwarded falls through to the DOM and silently does nothing. Domain status → tone mapping and labels are in `lib/tokens.ts` (states from `docs/architecture/04-order-lifecycle.md`).
- `/design` is the component catalog: tokens, variants, and order-status badges, with the theme switcher.
- `/mockups` is the screen hub — every MVP screen, with placeholders for unbuilt ones. Design-directions pages: `/mockups/orders` (orders list), `/mockups/orders/detail` (order detail; the review/approve wizard is `wizard.tsx`), `/mockups/start` (the customer flow — home → start an order → email → order page), `/mockups/driver` (driver PWA — job board, job detail, photo prompts), `/mockups/dispatch` (dispatcher console — the review queue in three directions: `review-queue.tsx` checklist, `review-guided.tsx` guided + rate card, `review-exceptions.tsx` risk-sorted). The approved orders-list frame is `app/mockups/orders/clean-saas.tsx`.
- The dispatcher's job is verification, so the review queue is the console's only screen for now — every order waits there, and a clean parse is one check rather than a pass. Order board, order detail, and admin were built and then removed as distractions; don't re-add them without asking.
- Mockup demo data is shared and must stay consistent: `app/mockups/orders/detail/data.ts` (the order, items, price) feeds the email, the order page, and the driver's accepted job (`app/mockups/driver/data.ts` imports it); `app/mockups/start/data.ts` holds sites, retailers, and stores (the console derives its store options and distances from it); `app/mockups/dispatch/data.ts` is one console story keyed to the same order numbers.
- Console screens are composed from `app/mockups/dispatch/parts.tsx` (`ConsoleShell`, `Band`, `CheckRow`, `SizePicker`, table primitives) so the frames read as one application.

## Commands

- Before considering work done: `bun run lint`, `bun run typecheck`, `bun run build`.
- `bun install` failing with `AccessDenied`/tempdir errors means the devcontainer volumes need the one-time chown from `postCreateCommand` (see `.devcontainer/devcontainer.json`).

## Database

Schema lives at the **repo root** in `supabase/`, not in this directory.

- `supabase/migrations/0001_baseline.sql` is the **base script** — enums, tables, indexes, RLS helper functions, and every policy, in one pass. Applied once per environment, then frozen.
- Every schema change after it is a **new numbered file**: `0002_<change>.sql`, `0003_<change>.sql`. **Never edit a migration that has been applied anywhere** — environments diverge silently and the repo can't tell you which has the change.
- RLS policies ship in the same migration as the table they protect, never as a follow-up.
- The base script is deliberately **not idempotent**. Re-running it fails on the first `create type`; that is the intended signal that migration state was lost track of.
- Seed data (idempotent, applied after migrations — never as part of them) goes in `supabase/seed/`. There is none yet.
- Apply by hand in the Supabase SQL editor, in filename order, or with `supabase link --project-ref <ref> && supabase db push`.
- Conventions: `docs/architecture/03-data-model.md#migrations`. Policy detail: `docs/architecture/10-auth-and-permissions.md`.

