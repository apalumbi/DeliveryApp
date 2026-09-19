<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Design system

- Tokens live in `app/styles/theme.css`: layer 1 primitives, layer 2 semantic roles (`bg-surface`, `text-ink-muted`, `bg-accent`, `bg-success-bg`, …). Components use semantic roles only. Alternate themes override the semantic layer via `[data-theme]` on `<html>`.
- Components live in `components/ui/` and use CVA variants + `cn()` (`lib/utils.ts`). When adding a CVA variant, forward it in the component's `cva({ ... })` call — a variant that isn't forwarded falls through to the DOM and silently does nothing. Domain status → tone mapping and labels are in `lib/tokens.ts` (states from `docs/architecture/04-order-lifecycle.md`).
- `/design` is the component catalog: tokens, variants, and order-status badges, with the theme switcher.
- `/mockups` is the screen hub — every MVP screen, with placeholders for unbuilt ones. `/mockups/orders` holds the orders design directions; the approved frame lives in `app/mockups/orders/clean-saas.tsx`.

## Commands

- Before considering work done: `bun run lint`, `bun run typecheck`, `bun run build`.
- `bun install` failing with `AccessDenied`/tempdir errors means the devcontainer volumes need the one-time chown from `postCreateCommand` (see `.devcontainer/devcontainer.json`).

