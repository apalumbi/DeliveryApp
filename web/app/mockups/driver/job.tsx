import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CameraIcon,
  CheckIcon,
  PhoneIcon,
  PinIcon,
} from "@/components/ui/icons";
import { List, ListItem } from "@/components/ui/list";
import { orderStatusLabel, orderStatusTone } from "@/lib/tokens";

import {
  DISPATCH_PHONE,
  DONE_STEPS,
  ITEMS,
  JOB,
  NEXT_STEPS,
  PRICE,
  SITE,
} from "./data";

function Screen({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-surface font-sans text-ink">
      {children}
    </div>
  );
}

function JobHeader() {
  return (
    <header className="px-5 pt-6 pb-4">
      <button
        type="button"
        className="cursor-pointer text-[12px] font-medium text-ink-muted transition-colors hover:text-ink"
      >
        ← Jobs
      </button>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-[19px] font-semibold tracking-tight">
            Order {JOB.number}
          </h1>
          <p className="mt-1 text-[12.5px] text-ink-muted">
            {JOB.retailer} · {JOB.store}
          </p>
        </div>
        <Badge tone={orderStatusTone.driver_at_store} bordered>
          {orderStatusLabel.driver_at_store}
        </Badge>
      </div>
    </header>
  );
}

function PickupCard() {
  return (
    <section className="px-5">
      <Card className="p-4">
        <div className="text-[10.5px] font-semibold tracking-[0.16em] text-ink-faint uppercase">
          Pick up at
        </div>
        <div className="mt-1.5 text-[15px] font-semibold tracking-tight">
          {JOB.retailer} · {JOB.store}
        </div>
        <p className="mt-1 text-[12px] text-ink-muted">
          {JOB.storeAddress} · {JOB.hours}
        </p>
        <Button intent="secondary" size="sm" className="mt-3">
          <PinIcon className="h-3.5 w-3.5" />
          Navigate
        </Button>
      </Card>
    </section>
  );
}

function BuyList() {
  return (
    <section className="mt-4 px-5">
      <div className="mb-2 flex items-baseline justify-between">
        <h2 className="text-[13px] font-semibold">Buy exactly this</h2>
        <span className="text-[12px] text-ink-faint">
          {ITEMS.length} items · {PRICE.materials}
        </span>
      </div>
      <List>
        {ITEMS.map((item) => (
          <ListItem key={item.model} className="px-3.5 py-2.5">
            <div className="min-w-0 flex-1">
              <div className="text-[12.5px] font-medium">{item.name}</div>
              <div className="mt-0.5 text-[11px] text-ink-faint">
                {item.brand} · Model #{item.model}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[12.5px] font-semibold tabular-nums">
                {item.total}
              </div>
              <div className="mt-0.5 text-[11px] text-ink-faint tabular-nums">
                {item.qty}×
              </div>
            </div>
          </ListItem>
        ))}
      </List>
      <p className="mt-2 text-[11.5px] leading-relaxed text-ink-faint">
        Out of stock? Call dispatch before you substitute anything.
      </p>
    </section>
  );
}

function DeliverCard() {
  return (
    <section className="mt-4 px-5">
      <h2 className="mb-2 text-[13px] font-semibold">Deliver to</h2>
      <Card className="p-4">
        <div className="text-[13px] font-medium">{SITE.label}</div>
        <div className="mt-0.5 text-[12px] text-ink-muted">{SITE.address}</div>
        <p className="mt-2.5 border-t border-hairline-soft pt-2.5 text-[12px] leading-relaxed text-ink">
          {SITE.notes}
        </p>
        <div className="mt-2.5 flex items-center gap-1.5 text-[12px] text-ink-muted">
          <PhoneIcon className="h-3.5 w-3.5 text-ink-faint" />
          {SITE.contact} · <span className="tabular-nums">{SITE.phone}</span>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-ink-faint">
          Unlocked because you accepted. The board never shows this.
        </p>
      </Card>
    </section>
  );
}

function ProgressCard() {
  return (
    <section className="mt-4 px-5">
      <h2 className="mb-2 text-[13px] font-semibold">Progress</h2>
      <Card className="px-4 py-2.5">
        {DONE_STEPS.map((step) => (
          <div key={step.label} className="flex items-center gap-2.5 py-1.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-bg text-success-ink">
              <CheckIcon className="h-3 w-3" />
            </span>
            <span className="flex-1 text-[12.5px] text-ink">{step.label}</span>
            <span className="text-[11.5px] text-ink-faint tabular-nums">
              {step.time}
            </span>
          </div>
        ))}
        {NEXT_STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2.5 py-1.5">
            {i === 0 ? (
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
            ) : (
              <span className="h-5 w-5 shrink-0 rounded-full border border-hairline" />
            )}
            <span
              className={
                i === 0
                  ? "flex-1 text-[12.5px] font-medium text-ink"
                  : "flex-1 text-[12.5px] text-ink-faint"
              }
            >
              {label}
            </span>
          </div>
        ))}
      </Card>
    </section>
  );
}

function Sheet({ children }: { children: ReactNode }) {
  return (
    <div className="mt-auto rounded-t-card border-t border-hairline bg-card px-5 pt-3.5 pb-5 shadow-[0_-10px_30px_-16px_rgb(15_23_42/0.35)]">
      <div className="mx-auto mb-3.5 h-1 w-9 rounded-full bg-hairline" />
      {children}
    </div>
  );
}

export function JobDetail() {
  return (
    <Screen>
      <JobHeader />
      <PickupCard />
      <BuyList />
      <DeliverCard />
      <ProgressCard />

      <div className="sticky bottom-0 mt-auto border-t border-hairline bg-surface px-5 pt-3.5 pb-5">
        <Button size="md" className="w-full">
          Items purchased
        </Button>
        <p className="mt-2 text-center text-[11px] leading-relaxed text-ink-faint">
          Photograph the receipt after you load.
        </p>
        <button
          type="button"
          className="mt-2 flex w-full cursor-pointer items-center justify-center gap-1.5 text-[11.5px] font-medium text-ink-muted transition-colors hover:text-ink"
        >
          <PhoneIcon className="h-3.5 w-3.5" />
          Call dispatch {DISPATCH_PHONE}
        </button>
      </div>
    </Screen>
  );
}

export function ReceiptPrompt() {
  return (
    <Screen>
      <JobHeader />
      <PickupCard />

      <Sheet>
        <h2 className="text-[15px] font-semibold tracking-tight">
          Photograph the receipt
        </h2>
        <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
          It&apos;s the evidence behind the charge. The dispatcher sees it on
          the order.
        </p>
        <div className="mt-3.5 flex h-26 flex-col items-center justify-center gap-1.5 rounded-field border border-dashed border-hairline bg-card-muted text-ink-faint">
          <CameraIcon className="h-6 w-6" />
          <span className="text-[11.5px]">Opens your camera</span>
        </div>
        <Button size="md" className="mt-3.5 w-full">
          Take photo
        </Button>
        <Button intent="ghost" size="md" className="mt-2 w-full">
          Skip — enter a reason
        </Button>
      </Sheet>
    </Screen>
  );
}

export function SkipReason() {
  return (
    <Screen>
      <JobHeader />
      <PickupCard />

      <Sheet>
        <h2 className="text-[15px] font-semibold tracking-tight">
          Why are you skipping?
        </h2>
        <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
          You can skip the photo, but not silently — the dispatcher sees this on
          the order.
        </p>
        <div className="mt-3.5 rounded-field border border-hairline bg-card px-3 py-2.5 text-[12.5px] leading-relaxed text-ink">
          Receipt left in the truck — I&apos;ll send a photo tonight.
        </div>
        <Button size="md" className="mt-3.5 w-full">
          Skip without a photo
        </Button>
        <Button intent="secondary" size="md" className="mt-2 w-full">
          Take photo instead
        </Button>
        <p className="mt-2.5 text-center text-[11px] leading-relaxed text-ink-faint">
          The same sheet gates the delivery photo at the site.
        </p>
      </Sheet>
    </Screen>
  );
}
