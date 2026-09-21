"use client";

import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chevron } from "@/components/ui/icons";
import { orderStatusLabel, orderStatusTone } from "@/lib/tokens";

import { ITEMS, ORDER, PRICE, RECEIPT_META, STATUS } from "./data";
import {
  AfterApproveCard,
  DeliveryFields,
  ReceiptCard,
  WrongItemLink,
} from "./parts";

const STEP_COUNT = 4;

/** V7 — one thing at a time: store → cart → drop-off → final review. */
export function StepWizardDetail() {
  const [step, setStep] = useState(0);
  const [showMaterials, setShowMaterials] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    rootRef.current?.closest("[data-frame-scroll]")?.scrollTo({ top: 0 });
  }, [step]);

  return (
    <div
      ref={rootRef}
      className="flex min-h-full flex-col bg-surface font-sans text-ink"
    >
      <header className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between gap-3">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="flex cursor-pointer items-center gap-1 text-[12px] font-medium text-ink-muted transition-colors hover:text-ink"
            >
              <Chevron className="h-3.5 w-3.5 rotate-180" />
              Back
            </button>
          ) : (
            <span className="text-[12px] font-medium text-ink-muted">
              ← Orders
            </span>
          )}
          <Badge tone={orderStatusTone[STATUS]} bordered>
            {orderStatusLabel[STATUS]}
          </Badge>
        </div>

        <div className="mt-4 flex items-center gap-1.5">
          {Array.from({ length: STEP_COUNT }, (_, i) => (
            <span
              key={i}
              className={
                i <= step
                  ? "h-1 flex-1 rounded-full bg-accent"
                  : "h-1 flex-1 rounded-full bg-sunken"
              }
            />
          ))}
        </div>
        <div className="mt-2 text-[10.5px] font-semibold tracking-[0.14em] text-ink-faint uppercase">
          Step {step + 1} of {STEP_COUNT} · Order {ORDER.number}
        </div>
      </header>

      <section className="px-5">
        {step === 0 ? <StoreStep /> : null}
        {step === 1 ? <CartStep /> : null}
        {step === 2 ? <SiteStep /> : null}
        {step === 3 ? (
          <FinalStep
            showMaterials={showMaterials}
            onToggleMaterials={() => setShowMaterials((v) => !v)}
          />
        ) : null}
      </section>

      <div className="sticky bottom-0 mt-auto border-t border-hairline bg-surface px-5 pt-3 pb-5">
        <div className="flex justify-center">
          <WrongItemLink className="text-[11.5px]" />
        </div>
        <Button
          size="md"
          className="mt-2 w-full"
          onClick={() => setStep((s) => Math.min(STEP_COUNT - 1, s + 1))}
        >
          {step === STEP_COUNT - 1 ? `Approve · ${PRICE.total}` : "Confirm"}
        </Button>
      </div>
    </div>
  );
}

function StoreStep() {
  return (
    <div>
      <h1 className="text-[19px] leading-snug font-semibold tracking-tight">
        Pick up from Lowe&apos;s North Frisco?
      </h1>
      <p className="mt-2 text-[12.5px] leading-relaxed text-ink-muted">
        We&apos;ll buy your materials here. If you built your cart at a
        different store, call us before you approve.
      </p>
      <Card className="mt-4 px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-control bg-sunken text-[12px] font-semibold text-ink-muted">
            L
          </div>
          <div>
            <div className="text-[13px] font-medium text-ink">
              {ORDER.retailer} · {ORDER.store}
            </div>
            <div className="mt-0.5 text-[11.5px] text-ink-faint">
              This is where your materials will be bought.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function CartStep() {
  return (
    <div>
      <h1 className="text-[19px] leading-snug font-semibold tracking-tight">
        Review your cart
      </h1>
      <p className="mt-2 text-[12.5px] leading-relaxed text-ink-muted">
        We read these from the cart you forwarded.
      </p>
      <ReceiptCard className="mt-3.5" meta={RECEIPT_META} showPrice={false} />
    </div>
  );
}

function SiteStep() {
  return (
    <div>
      <h1 className="text-[19px] leading-snug font-semibold tracking-tight">
        Where should we drop it off?
      </h1>
      <p className="mt-2 text-[12.5px] leading-relaxed text-ink-muted">
        Pick a saved site or enter a new address. Notes and contact go to the
        driver.
      </p>
      <div className="mt-3.5">
        <DeliveryFields newAddress />
      </div>
    </div>
  );
}

function FinalStep({
  showMaterials,
  onToggleMaterials,
}: {
  showMaterials: boolean;
  onToggleMaterials: () => void;
}) {
  return (
    <div>
      <h1 className="text-[19px] leading-snug font-semibold tracking-tight">
        Final review
      </h1>
      <div className="mt-3.5">
        <AfterApproveCard />
      </div>
      <Card className="mt-3.5 px-4 py-3">
        <button
          type="button"
          onClick={onToggleMaterials}
          className="flex w-full cursor-pointer items-center justify-between"
        >
          <span className="text-[12.5px] font-medium text-ink">
            Materials ({ITEMS.length})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[12.5px] text-ink tabular-nums">
              {PRICE.materials}
            </span>
            <Chevron
              className={
                showMaterials
                  ? "h-4 w-4 -rotate-90 text-ink-faint"
                  : "h-4 w-4 rotate-90 text-ink-faint"
              }
            />
          </span>
        </button>
        {showMaterials ? (
          <div className="mt-2 border-t border-hairline-soft pt-2">
            {ITEMS.map((item) => (
              <div
                key={item.model}
                className="flex items-baseline justify-between gap-3 py-1 text-[11.5px]"
              >
                <span className="min-w-0 truncate text-ink-muted">
                  {item.qty} × {item.name}
                </span>
                <span className="text-ink tabular-nums">{item.total}</span>
              </div>
            ))}
          </div>
        ) : null}
        <div className="mt-2 border-t border-hairline-soft pt-2">
          <div className="flex items-baseline justify-between py-1 text-[12.5px]">
            <span className="text-ink-muted">Sizing fee</span>
            <span className="text-ink tabular-nums">{PRICE.sizing}</span>
          </div>
          <div className="flex items-baseline justify-between py-1 text-[12.5px]">
            <span className="text-ink-muted">Delivery fee</span>
            <span className="text-ink tabular-nums">{PRICE.delivery}</span>
          </div>
        </div>
        <div className="mt-2 flex items-baseline justify-between border-t border-hairline pt-2.5">
          <span className="text-[13px] font-semibold text-ink">Total</span>
          <span className="text-[15px] font-semibold text-ink tabular-nums">
            {PRICE.total}
          </span>
        </div>
      </Card>
    </div>
  );
}
