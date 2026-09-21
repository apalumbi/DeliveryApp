import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chevron, ImageIcon, PhoneIcon } from "@/components/ui/icons";
import { ListItem } from "@/components/ui/list";
import { cn } from "@/lib/utils";
import { orderStatusLabel, orderStatusTone } from "@/lib/tokens";

import {
  APPROVE_STEPS,
  ITEMS,
  ORDER,
  PRICE,
  SITE,
  STATUS,
  type Item,
} from "./data";

export function BackLink() {
  return (
    <button
      type="button"
      className="cursor-pointer text-[12px] font-medium text-ink-muted transition-colors hover:text-ink"
    >
      ← Orders
    </button>
  );
}

export function StatusBadge() {
  return (
    <Badge tone={orderStatusTone[STATUS]} bordered>
      {orderStatusLabel[STATUS]}
    </Badge>
  );
}

export function Thumb() {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-sunken text-ink-faint ring-1 ring-hairline-soft">
      <ImageIcon className="h-4 w-4" />
    </div>
  );
}

export function ItemRow({
  item,
  thumb = true,
}: {
  item: Item;
  thumb?: boolean;
}) {
  return (
    <ListItem>
      {thumb ? <Thumb /> : null}
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-medium text-ink">{item.name}</div>
        <div className="mt-0.5 text-[11.5px] text-ink-faint">
          {item.brand} · Model #{item.model}
        </div>
      </div>
      <div className="text-right">
        <div className="text-[13px] font-semibold text-ink tabular-nums">
          {item.total}
        </div>
        <div className="mt-0.5 text-[11.5px] text-ink-faint tabular-nums">
          {item.qty}×
        </div>
      </div>
    </ListItem>
  );
}

export function ReceiptItemRow({ item }: { item: Item }) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <Thumb />
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-medium text-ink">{item.name}</div>
        <div className="mt-0.5 text-[11.5px] text-ink-faint">
          {item.brand} · Model #{item.model}
        </div>
      </div>
      <div className="text-right">
        <div className="text-[13px] font-semibold text-ink tabular-nums">
          {item.total}
        </div>
        <div className="mt-0.5 text-[11.5px] text-ink-faint tabular-nums">
          {item.qty}×
        </div>
      </div>
    </div>
  );
}

/** The receipt: location header up top, inset dividers, items, total line. */
export function ReceiptCard({
  meta,
  showPrice = true,
  className,
}: {
  meta: string;
  showPrice?: boolean;
  className?: string;
}) {
  return (
    <Card className={cn("px-5 py-5", className)}>
      <div className="text-[10.5px] font-semibold tracking-[0.16em] text-ink-faint uppercase">
        Pick up at
      </div>
      <div className="mt-1.5 text-[17px] font-semibold tracking-tight">
        {ORDER.retailer} · {ORDER.store}
      </div>
      <p className="mt-1 text-[12px] text-ink-muted">{meta}</p>

      <div className="mt-4 border-t border-hairline-soft pt-3">
        {ITEMS.map((item) => (
          <ReceiptItemRow key={item.model} item={item} />
        ))}
      </div>

      <div className="mt-2 border-t border-hairline-soft pt-2.5">
        {showPrice ? (
          <PriceRows />
        ) : (
          <div className="flex items-baseline justify-between text-[12.5px]">
            <span className="text-ink-muted">Materials subtotal</span>
            <span className="text-ink tabular-nums">{PRICE.materials}</span>
          </div>
        )}
      </div>
    </Card>
  );
}

export function PriceRows() {
  const rows: [string, string][] = [
    ["Materials", PRICE.materials],
    ["Sizing fee", PRICE.sizing],
    ["Delivery fee", PRICE.delivery],
  ];
  return (
    <div>
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="flex items-baseline justify-between py-1 text-[12.5px]"
        >
          <span className="text-ink-muted">{label}</span>
          <span className="text-ink tabular-nums">{value}</span>
        </div>
      ))}
      <div className="mt-2 flex items-baseline justify-between border-t border-hairline-soft pt-2.5">
        <span className="text-[13px] font-semibold text-ink">Total</span>
        <span className="text-[15px] font-semibold text-ink tabular-nums">
          {PRICE.total}
        </span>
      </div>
    </div>
  );
}

function FieldLabel({ children }: { children: string }) {
  return (
    <div className="mb-1.5 text-[11.5px] font-medium text-ink-muted">
      {children}
    </div>
  );
}

export function DeliveryFields({
  newAddress = false,
}: {
  newAddress?: boolean;
}) {
  return (
    <div className="space-y-3.5">
      <div>
        <FieldLabel>Site</FieldLabel>
        <div className="flex items-center justify-between gap-2 rounded-field border border-hairline bg-card px-3 py-2.5">
          <div className="min-w-0">
            <div className="truncate text-[13px] font-medium text-ink">
              {SITE.label}
            </div>
            <div className="mt-0.5 truncate text-[11.5px] text-ink-faint">
              {SITE.address}
            </div>
          </div>
          <Chevron className="h-4 w-4 shrink-0 rotate-90 text-ink-faint" />
        </div>
        {newAddress ? (
          <button
            type="button"
            className="mt-2 flex cursor-pointer items-center gap-1 text-[12.5px] font-medium text-accent"
          >
            <span className="text-[15px] leading-none">+</span>
            Enter a new address
          </button>
        ) : null}
      </div>
      <div>
        <FieldLabel>Notes for the driver</FieldLabel>
        <div className="rounded-field border border-hairline bg-card px-3 py-2.5 text-[13px] leading-relaxed text-ink">
          {SITE.notes}
        </div>
      </div>
      <div>
        <FieldLabel>On-site contact</FieldLabel>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-field border border-hairline bg-card px-3 py-2.5 text-[13px] text-ink">
            {SITE.contact}
          </div>
          <div className="rounded-field border border-hairline bg-card px-3 py-2.5 text-[13px] text-ink tabular-nums">
            {SITE.phone}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ApproveBar({ label, note }: { label: string; note?: string }) {
  return (
    <div className="sticky bottom-0 mt-auto border-t border-hairline bg-surface px-5 pt-3.5 pb-5">
      <Button size="md" className="w-full">
        {label}
      </Button>
      {note ? (
        <p className="mt-2 text-center text-[11px] leading-relaxed text-ink-faint">
          {note}
        </p>
      ) : null}
    </div>
  );
}

export function SectionNumber({ n }: { n: number }) {
  return (
    <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-sunken text-[11px] font-semibold text-ink-muted">
      {n}
    </span>
  );
}

export function OrderHeading() {
  return (
    <header className="px-5 pt-6 pb-5">
      <BackLink />
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-[19px] font-semibold tracking-tight">
            Order {ORDER.number}
          </h1>
          <p className="mt-1 text-[12.5px] text-ink-muted">
            {ORDER.retailer} · {ORDER.store} · {ORDER.placed}
          </p>
        </div>
        <StatusBadge />
      </div>
    </header>
  );
}

export function WaitingCard() {
  return (
    <Card tone="muted" className="px-4 py-3.5">
      <p className="text-[12.5px] leading-relaxed text-ink">
        Waiting on you — check the items, set the drop-off, approve the price.
      </p>
    </Card>
  );
}

export function WrongItemLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={cn(
        "flex cursor-pointer items-center gap-1.5 text-[12.5px] font-medium text-accent",
        className,
      )}
    >
      <PhoneIcon className="h-3.5 w-3.5" />
      Something wrong? Call {SITE.phone}
    </button>
  );
}

export function AfterApproveCard() {
  return (
    <Card className="px-4 py-3.5">
      <div className="text-[11px] font-semibold tracking-[0.14em] text-ink-faint uppercase">
        After you approve
      </div>
      <div className="mt-3 flex items-start">
        {APPROVE_STEPS.map((label, i) => (
          <div
            key={label}
            className="flex flex-1 flex-col items-center gap-1.5 text-center"
          >
            <span className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-sunken text-[10.5px] font-semibold text-ink-muted">
              {i + 1}
            </span>
            <span className="text-[10.5px] leading-tight text-ink-muted">
              {label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
