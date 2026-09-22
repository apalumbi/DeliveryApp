import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { ITEMS, ORDER, PRICE } from "../orders/detail/data";
import { COMPANY, SUPPORT_PHONE } from "./data";

/** The email that brings the customer back to the order page. */
export function ApprovalEmail() {
  return (
    <div className="flex min-h-full flex-col bg-surface font-sans text-ink">
      <header className="flex items-center justify-between border-b border-hairline-soft px-5 py-3">
        <span className="text-[12px] font-medium text-ink-muted">← Inbox</span>
        <span className="text-[11px] text-ink-faint">9:12 AM</span>
      </header>

      <div className="px-5 pt-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-[12px] font-semibold text-accent-ink">
            O
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-medium text-ink">
              Orders · orders@example.com
            </div>
            <div className="mt-0.5 text-[11.5px] text-ink-faint">
              to {COMPANY}
            </div>
          </div>
        </div>

        <h1 className="mt-5 text-[17px] leading-snug font-semibold tracking-tight">
          Your cart from {ORDER.retailer} is ready to review
        </h1>
        <p className="mt-2 text-[12.5px] leading-relaxed text-ink-muted">
          We read your cart and priced it. Check the items, then approve —
          nothing is ordered until you do.
        </p>

        <Card className="mt-4 px-4 py-3.5">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[13px] font-semibold text-ink">
              Order {ORDER.number}
            </span>
            <span className="text-[13px] font-semibold text-ink tabular-nums">
              {PRICE.total}
            </span>
          </div>
          <div className="mt-1 text-[11.5px] text-ink-faint">
            {ORDER.retailer} · {ORDER.store} · {ITEMS.length} items
          </div>
        </Card>

        <Button size="md" className="mt-4 w-full">
          Review &amp; approve
        </Button>

        <p className="mt-4 text-[11.5px] leading-relaxed text-ink-faint">
          Wrong store or something missing? Call {SUPPORT_PHONE} before you
          approve — we&apos;ll fix it.
        </p>
      </div>

      <footer className="mt-auto px-5 py-5 text-[10.5px] leading-relaxed text-ink-faint">
        You&apos;re getting this because a cart was shared with{" "}
        {COMPANY}&apos;s order address.
      </footer>
    </div>
  );
}
