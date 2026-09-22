import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Chevron } from "@/components/ui/icons";

import { FEE_POLICY, QUOTE, SITE } from "./data";
import { CheckRow, ConsoleShell, Panel, Row, SizePicker } from "./parts";

/* V2 — one order at a time, priced by a rate card, with the customer's view. */

function ChecksPanel() {
  return (
    <Panel
      title={`Order ${QUOTE.number}`}
      note={`${QUOTE.company} · ${QUOTE.retailer}`}
    >
      <div className="px-3.5 py-2.5">
        <CheckRow
          state="pass"
          label="Items read"
          detail={`Reconciles with the email — ${QUOTE.lines.length} lines, ${QUOTE.materials}. Nothing looks substituted.`}
        />
        <CheckRow
          state="pass"
          label="Delivery address"
          detail={`${SITE.label} · ${SITE.address} — captured in the portal, with the driver notes and the on-site contact.`}
        />
        <CheckRow
          state="pass"
          label="Store"
          detail={`${QUOTE.store.name} · ${QUOTE.store.distance} mi from the site — nearest of the three, and the customer chose it.`}
        />
        <CheckRow state="pass" label="Delivery size" detail={QUOTE.fit}>
          <SizePicker selected={QUOTE.size} />
        </CheckRow>
        <CheckRow
          state="pass"
          label="Price"
          detail={`Computed from the rate card. ${QUOTE.mileageNote}.`}
        />
      </div>
    </Panel>
  );
}

function TrustPanel() {
  return (
    <Panel title="Why you can trust this one">
      <div className="px-3.5 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="success" bordered>
            Confidence {QUOTE.confidence}
          </Badge>
          <span className="text-[11.5px] text-ink-muted">{QUOTE.template}</span>
        </div>
        <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-faint">
          {QUOTE.lastMismatch}. Confidence alone never sends an invite — it just
          tells you where to look first.
        </p>
      </div>
    </Panel>
  );
}

function PreviewPanel() {
  return (
    <Panel title="What the customer sees" note="before they pay">
      <div className="px-3.5 py-3">
        <div className="rounded-field border border-hairline bg-card px-3 py-3">
          <div className="text-[10.5px] font-semibold tracking-widest text-ink-faint uppercase">
            Order {QUOTE.number}
          </div>
          <div className="mt-1 text-[13px] font-semibold tracking-tight">
            {QUOTE.retailer} · {QUOTE.store.short}
          </div>
          <div className="mt-0.5 text-[11px] text-ink-muted">
            {QUOTE.store.address}
          </div>

          <div className="mt-2.5 border-t border-hairline-soft pt-1">
            {QUOTE.lines.map((line) => (
              <div
                key={line.name}
                className="flex items-baseline justify-between gap-2 py-1"
              >
                <span className="min-w-0 truncate text-[11.5px] text-ink">
                  {line.name}
                  <span className="ml-1.5 text-ink-faint tabular-nums">
                    {line.qty}×
                  </span>
                </span>
                <span className="shrink-0 text-[11.5px] text-ink tabular-nums">
                  {line.total}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-1.5 border-t border-hairline-soft pt-1">
            <Row label="Materials" value={QUOTE.materials} />
            <Row label={`Sizing · ${QUOTE.size}`} value={QUOTE.sizing} />
            <Row label="Mileage" value={QUOTE.mileage} hint="2.4 mi" />
            <Row label="Total" value={QUOTE.total} strong />
          </div>

          <div className="mt-2 rounded-control bg-accent-soft px-2.5 py-2 text-center text-[11.5px] font-medium text-accent-soft-ink">
            Review &amp; approve
          </div>
          <p className="mt-1.5 text-center text-[10.5px] text-ink-faint">
            You pay after delivery — nothing is ordered until you approve.
          </p>
        </div>
      </div>
    </Panel>
  );
}

function PolicyPanel() {
  return (
    <Panel title="Fee policy" note="proposed rate card">
      <div className="space-y-1.5 px-3.5 py-3">
        <div className="flex items-center justify-between gap-3 text-[12px]">
          <span className="text-ink-muted">Sizing · {QUOTE.size}</span>
          <span className="text-ink tabular-nums">
            {FEE_POLICY.sizing[QUOTE.size]}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 text-[12px]">
          <span className="text-ink-muted">Mileage</span>
          <span className="text-ink tabular-nums">
            {FEE_POLICY.mileage.rate}/mi
          </span>
        </div>
        <p className="text-[10.5px] leading-relaxed text-ink-faint">
          First {FEE_POLICY.mileage.freeMiles} mi free. This order:{" "}
          {QUOTE.mileageNote}.
        </p>
        <div className="flex items-center justify-between gap-3 border-t border-hairline-soft pt-2 text-[12px]">
          <span className="text-ink-muted">Computed</span>
          <span className="font-medium text-ink tabular-nums">
            {QUOTE.total}
          </span>
        </div>
        <button
          type="button"
          className="cursor-pointer text-[11px] font-medium text-accent transition-colors hover:text-accent-hover"
        >
          Override with a reason…
        </button>
        <p className="text-[10.5px] leading-relaxed text-ink-faint">
          Overrides are logged with your name — that is what answers “who agreed
          this price?” later.
        </p>
      </div>
    </Panel>
  );
}

export function GuidedReview() {
  return (
    <ConsoleShell
      title="Review queue"
      note="Reviewing 2 of 5 · oldest waiting 41m"
      active="Review queue"
      actions={
        <>
          <span className="text-[11px] text-ink-faint">
            J / K to move · ⌘⏎ to send
          </span>
          <Button intent="secondary" size="sm">
            <Chevron className="h-3.5 w-3.5 rotate-180" />
            Prev
          </Button>
          <Button intent="secondary" size="sm">
            Next
            <Chevron className="h-3.5 w-3.5" />
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-[minmax(0,1fr)_20rem] gap-4 px-5 py-4">
        <div className="space-y-3">
          <ChecksPanel />
          <TrustPanel />
        </div>
        <div className="space-y-3">
          <PreviewPanel />
          <PolicyPanel />
          <Button size="md" className="w-full">
            Send checkout invite · {QUOTE.total}
          </Button>
        </div>
      </div>
    </ConsoleShell>
  );
}
