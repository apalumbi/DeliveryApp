import type { ComponentType } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PhoneIcon } from "@/components/ui/icons";
import { List } from "@/components/ui/list";

import { ITEMS, ORDER, PRICE, RECEIPT_META, SITE } from "./data";
import {
  AfterApproveCard,
  ApproveBar,
  BackLink,
  DeliveryFields,
  ItemRow,
  OrderHeading,
  PriceRows,
  ReceiptCard,
  SectionNumber,
  StatusBadge,
  Thumb,
  WaitingCard,
  WrongItemLink,
} from "./parts";
import { StepWizardDetail } from "./wizard";

/* V1 — Checklist: action-led; items lead, then drop-off, then price. */

function ChecklistDetail() {
  return (
    <div className="flex min-h-full flex-col bg-surface font-sans text-ink">
      <OrderHeading />
      <p className="-mt-2 px-5 text-[13px] leading-relaxed text-ink">
        Check the items below, set the drop-off, then approve the price.
      </p>

      <section className="mt-5 px-5">
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="text-[13px] font-semibold text-ink">Your cart</h2>
          <span className="text-[12px] text-ink-faint">4 items</span>
        </div>
        <List>
          {ITEMS.map((item) => (
            <ItemRow key={item.model} item={item} />
          ))}
        </List>
        <WrongItemLink className="mt-2.5" />
      </section>

      <section className="mt-6 px-5">
        <h2 className="mb-2.5 text-[13px] font-semibold text-ink">Drop-off</h2>
        <DeliveryFields />
      </section>

      <section className="mt-6 px-5">
        <h2 className="mb-2 text-[13px] font-semibold text-ink">Price</h2>
        <Card tone="muted" className="px-4 py-3">
          <PriceRows />
        </Card>
        <p className="mt-2 text-[11.5px] leading-relaxed text-ink-faint">
          Nothing is ordered until you approve. You pay after delivery.
        </p>
      </section>

      <ApproveBar label={`Approve · ${PRICE.total}`} />
    </div>
  );
}

/* V2 — Quote: the cart as a document you sign off on. No thumbnails. */

function QuoteDetail() {
  return (
    <div className="flex min-h-full flex-col bg-surface font-sans text-ink">
      <header className="px-5 pt-6 pb-4">
        <BackLink />
      </header>

      <section className="px-5">
        <Card className="px-5 py-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[10.5px] font-semibold tracking-[0.16em] text-ink-faint uppercase">
                Quote
              </div>
              <h1 className="mt-1.5 text-[17px] font-semibold tracking-tight">
                Order {ORDER.number}
              </h1>
            </div>
            <StatusBadge />
          </div>
          <p className="mt-1 text-[12px] text-ink-muted">
            {ORDER.retailer} · {ORDER.store} · {ORDER.placed}
          </p>

          <div className="mt-4 border-t border-hairline-soft pt-3.5">
            {ITEMS.map((item) => (
              <div
                key={item.model}
                className="flex items-baseline justify-between gap-3 py-1.5"
              >
                <div className="min-w-0 text-[12.5px] text-ink">
                  <span className="text-ink-muted tabular-nums">
                    {item.qty} ×{" "}
                  </span>
                  {item.name}
                </div>
                <span className="text-[12.5px] font-medium text-ink tabular-nums">
                  {item.total}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-2 border-t border-hairline-soft pt-2.5">
            <PriceRows />
          </div>
        </Card>
        <p className="mt-2 px-1 text-[11.5px] leading-relaxed text-ink-faint">
          We read these from the cart you forwarded. Something wrong? Call{" "}
          {SITE.phone}.
        </p>
      </section>

      <section className="mt-6 px-5">
        <h2 className="mb-2.5 text-[13px] font-semibold text-ink">
          Deliver to
        </h2>
        <DeliveryFields />
      </section>

      <section className="mt-6 px-5">
        <div className="text-[10.5px] font-semibold tracking-[0.16em] text-ink-faint uppercase">
          History
        </div>
        <div className="mt-2 space-y-1 text-[11.5px] text-ink-muted">
          <div>Received — {ORDER.placed}, 8:02a</div>
          <div>Checkout invite sent — {ORDER.placed}, 8:41a</div>
        </div>
      </section>

      <ApproveBar
        label={`Approve quote · ${PRICE.total}`}
        note="By approving you accept the price above."
      />
    </div>
  );
}

/* V3 — Sticky summary: cards scroll, the total + CTA stay pinned. */

function StickySummaryDetail() {
  return (
    <div className="flex min-h-full flex-col bg-surface font-sans text-ink">
      <OrderHeading />

      <section className="px-5">
        <WaitingCard />
      </section>

      <section className="mt-5 px-5">
        <Card>
          <div className="flex items-baseline justify-between border-b border-hairline-soft px-4 py-3">
            <h2 className="text-[13px] font-semibold text-ink">4 items</h2>
            <span className="text-[12px] text-ink-muted tabular-nums">
              Materials {PRICE.materials}
            </span>
          </div>
          <ul className="divide-y divide-hairline-soft">
            {ITEMS.slice(0, 2).map((item) => (
              <li
                key={item.model}
                className="flex items-center gap-3 px-4 py-3"
              >
                <Thumb />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium text-ink">
                    {item.name}
                  </div>
                  <div className="mt-0.5 text-[11.5px] text-ink-faint">
                    {item.qty}×
                  </div>
                </div>
                <span className="text-[13px] font-semibold text-ink tabular-nums">
                  {item.total}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-hairline-soft px-4 py-2.5">
            <button
              type="button"
              className="cursor-pointer text-[12.5px] font-medium text-accent"
            >
              Show all 4 →
            </button>
          </div>
        </Card>
      </section>

      <section className="mt-5 px-5">
        <h2 className="mb-2.5 text-[13px] font-semibold text-ink">Drop-off</h2>
        <DeliveryFields />
      </section>

      <section className="mt-5 px-5">
        <h2 className="mb-2 text-[13px] font-semibold text-ink">Price</h2>
        <Card tone="muted" className="px-4 py-3">
          <PriceRows />
        </Card>
      </section>

      <div className="sticky bottom-0 mt-auto border-t border-hairline bg-surface px-5 pt-3.5 pb-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-medium tracking-[0.1em] text-ink-faint uppercase">
              Total
            </div>
            <div className="text-[17px] font-semibold text-ink tabular-nums">
              {PRICE.total}
            </div>
          </div>
          <Button size="md" className="px-6">
            Approve
          </Button>
        </div>
      </div>
    </div>
  );
}

/* V4 — Numbered one-pager: the wizard's 1 · 2 · 3 rendered as the order page. */

function NumberedDetail() {
  return (
    <div className="flex min-h-full flex-col bg-surface font-sans text-ink">
      <OrderHeading />

      <section className="px-5">
        <div className="flex items-center gap-2.5">
          <SectionNumber n={1} />
          <h2 className="text-[13.5px] font-semibold text-ink">
            Check the items
          </h2>
        </div>
        <p className="mt-2 text-[12.5px] leading-relaxed text-ink-muted">
          We read these from the cart you forwarded:
        </p>
        <List className="mt-2.5">
          {ITEMS.map((item) => (
            <ItemRow key={item.model} item={item} />
          ))}
        </List>
        <button
          type="button"
          className="mt-2.5 flex cursor-pointer items-center gap-1.5 text-[12.5px] font-medium text-accent"
        >
          <PhoneIcon className="h-3.5 w-3.5" />
          Wrong? Call us — we&apos;ll fix it before anything is ordered.
        </button>
      </section>

      <section className="mt-6 px-5">
        <div className="flex items-center gap-2.5">
          <SectionNumber n={2} />
          <h2 className="text-[13.5px] font-semibold text-ink">Delivery</h2>
        </div>
        <div className="mt-3">
          <DeliveryFields />
        </div>
      </section>

      <section className="mt-6 px-5">
        <div className="flex items-center gap-2.5">
          <SectionNumber n={3} />
          <h2 className="text-[13.5px] font-semibold text-ink">Price</h2>
        </div>
        <Card tone="muted" className="mt-3 px-4 py-3">
          <PriceRows />
        </Card>
      </section>

      <ApproveBar
        label={`Approve · ${PRICE.total}`}
        note="You pay after delivery. Nothing is ordered until you approve."
      />
    </div>
  );
}

/* V5 — Guided: human tone, sections in order, next steps spelled out. */

function GuidedDetail() {
  return (
    <div className="flex min-h-full flex-col bg-surface font-sans text-ink">
      <header className="px-5 pt-6 pb-5">
        <BackLink />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <StatusBadge />
          <span className="text-[12px] text-ink-faint">
            Order {ORDER.number} · {ORDER.retailer} · {ORDER.placed}
          </span>
        </div>
        <h1 className="mt-3 text-[19px] leading-snug font-semibold tracking-tight">
          We read your cart — check it over, then tell us where it goes.
        </h1>
      </header>

      <section className="px-5">
        <h2 className="text-[13px] font-semibold text-ink">Your items</h2>
        <List className="mt-2.5">
          {ITEMS.map((item) => (
            <ItemRow key={item.model} item={item} />
          ))}
        </List>
        <Card
          tone="muted"
          className="mt-2.5 flex items-start gap-2.5 px-3.5 py-3"
        >
          <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" />
          <p className="text-[12px] leading-relaxed text-ink-muted">
            Something wrong with the cart? Call {SITE.phone} — we&apos;ll fix it
            before anything is ordered.
          </p>
        </Card>
      </section>

      <section className="mt-6 px-5">
        <h2 className="text-[13px] font-semibold text-ink">
          Where it&apos;s going
        </h2>
        <div className="mt-2.5">
          <DeliveryFields />
        </div>
      </section>

      <section className="mt-6 px-5">
        <h2 className="text-[13px] font-semibold text-ink">The price</h2>
        <Card tone="muted" className="mt-2.5 px-4 py-3">
          <PriceRows />
        </Card>
      </section>

      <section className="mt-6 px-5">
        <AfterApproveCard />
      </section>

      <ApproveBar
        label={`Approve · ${PRICE.total}`}
        note="You pay after delivery."
      />
    </div>
  );
}

/* V6 — Numbered receipt: the picks merged — 4's skeleton, 2's receipt card. */

function NumberedReceiptDetail() {
  return (
    <div className="flex min-h-full flex-col bg-surface font-sans text-ink">
      <OrderHeading />

      <section className="px-5">
        <WaitingCard />
      </section>

      <section className="mt-5 px-5">
        <div className="flex items-center gap-2.5">
          <SectionNumber n={1} />
          <h2 className="text-[13.5px] font-semibold text-ink">
            Check the items
          </h2>
        </div>
        <p className="mt-2 text-[12.5px] leading-relaxed text-ink-muted">
          We read these from the cart you forwarded:
        </p>
        <ReceiptCard className="mt-2.5" meta={RECEIPT_META} />
        <WrongItemLink className="mt-2.5" />
      </section>

      <section className="mt-6 px-5">
        <div className="flex items-center gap-2.5">
          <SectionNumber n={2} />
          <h2 className="text-[13.5px] font-semibold text-ink">Delivery</h2>
        </div>
        <div className="mt-3">
          <DeliveryFields />
        </div>
      </section>

      <section className="mt-6 px-5">
        <AfterApproveCard />
      </section>

      <ApproveBar
        label={`Approve · ${PRICE.total}`}
        note="You pay after delivery. Nothing is ordered until you approve."
      />
    </div>
  );
}

export type DetailVariation = {
  name: string;
  tag: string;
  blurb: string;
  Component: ComponentType;
};

export const DETAIL_VARIATIONS: DetailVariation[] = [
  {
    name: "Checklist",
    tag: "Action-led",
    blurb:
      "Items lead; the page reads as a to-do — check the cart, set the drop-off, approve. No timeline.",
    Component: ChecklistDetail,
  },
  {
    name: "Quote",
    tag: "Document",
    blurb:
      "The cart as an itemized quote you sign off on. No thumbnails — verification is by description and price. History sits in the document footer.",
    Component: QuoteDetail,
  },
  {
    name: "Sticky summary",
    tag: "Always-visible total",
    blurb:
      "Cards scroll; the bar doesn't. Item count, total, and Approve stay pinned; items collapse to two rows plus Show all.",
    Component: StickySummaryDetail,
  },
  {
    name: "Numbered one-pager",
    tag: "Wireframe literal",
    blurb:
      "The checkout wizard's 1 · 2 · 3 sections rendered as the order page's awaiting state, with the sticky approve.",
    Component: NumberedDetail,
  },
  {
    name: "Guided",
    tag: "Human",
    blurb:
      "A status sentence up top, sections in order, support one tap away, and a strip for what happens after approval.",
    Component: GuidedDetail,
  },
];

export const ROUND2_VARIATIONS: DetailVariation[] = [
  {
    name: "Numbered receipt",
    tag: "Merged pick",
    blurb:
      "Four's skeleton with two's receipt card — items, fees, and the total line in one card, so price doesn't need its own section. One's escape hatch, three's waiting-on-you message, five's after-you-approve strip.",
    Component: NumberedReceiptDetail,
  },
  {
    name: "One thing at a time",
    tag: "Interactive",
    blurb:
      "The same flow as a wizard: confirm the store → review the cart → set the drop-off → final review with an expandable materials line. Confirm advances, Back returns — click through it.",
    Component: StepWizardDetail,
  },
];
