import { Button } from "@/components/ui/button";
import { Chevron } from "@/components/ui/icons";
import { StatusDot } from "@/components/ui/status-dot";

import { COMPANY } from "./data";

/** The Uber-ish entry: one primary action, one secondary, no list, no alias. */
export function HomeScreen({ pending = false }: { pending?: boolean }) {
  return (
    <div className="flex min-h-full flex-col bg-surface font-sans text-ink">
      <header className="flex items-center justify-between px-5 pt-6 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-control bg-accent text-xs font-semibold text-accent-ink">
            A
          </div>
          <span className="text-[15px] font-semibold">{COMPANY}</span>
        </div>
        <div className="h-8 w-8 rounded-full bg-sunken ring-1 ring-hairline" />
      </header>

      <section className="px-5 pt-3">
        <button
          type="button"
          className="w-full cursor-pointer rounded-card border border-hairline bg-card p-5 text-left shadow-card transition-colors hover:bg-card-muted"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-[19px] font-semibold tracking-tight">
              Start an order
            </span>
            <Chevron className="h-4 w-4 text-ink-faint" />
          </div>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-muted">
            We buy the materials and deliver them to your site.
          </p>
        </button>
      </section>

      {pending ? (
        <section className="mt-3 px-5">
          <button
            type="button"
            className="flex w-full cursor-pointer items-center gap-3 rounded-card border border-hairline bg-accent-soft px-4 py-3.5 text-left"
          >
            <StatusDot tone="warning" />
            <span className="flex-1 text-[13px] font-medium text-accent-soft-ink">
              Order #1039 is waiting for your approval
            </span>
            <Chevron className="h-4 w-4 text-accent-soft-ink/70" />
          </button>
        </section>
      ) : null}

      <section className="mt-3 px-5">
        <Button intent="secondary" size="md" className="w-full justify-between">
          See past orders
          <Chevron className="h-4 w-4 text-ink-faint" />
        </Button>
      </section>
    </div>
  );
}
