import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

import { ExceptionBoard } from "./review-exceptions";
import { GuidedReview } from "./review-guided";
import { ReviewQueue } from "./review-queue";

export const metadata: Metadata = {
  title: "Dispatcher console — review queue",
};

const SCREENS: {
  name: string;
  tag: string;
  blurb: string;
  Component: ComponentType;
}[] = [
  {
    name: "1 · The checklist",
    tag: "everything on one screen",
    blurb:
      "The queue holds every order waiting on a dispatcher — a clean parse is one check, not a pass. The open order shows all of it at once: the email beside the lines the parser read (with the reconcile that catches a misread cart), the delivery address the customer captured, the store with its distance to the site and the nearest alternative called out, the delivery size, and the fees. The gate at the bottom names exactly what is still blocking the invite.",
    Component: ReviewQueue,
  },
  {
    name: "2 · The guided pass",
    tag: "rate card · customer preview",
    blurb:
      "One order at a time, built for speed: progress, keyboard moves, and a check per verification step. Two things the flat checklist can't do — it prices from a proposed rate card (size class + mileage beyond a free band, shown with its arithmetic, overridable with a reason that is logged), and it renders the invite the customer will actually see before you send it. The trust signals say where to look first: parser confidence, how many carts this template has matched, and when it last failed.",
    Component: GuidedReview,
  },
  {
    name: "3 · Exceptions first",
    tag: "risk-sorted · two sources",
    blurb:
      "The queue sorted by risk: exceptions get the full treatment, clean orders sit in a one-pass lane showing their quote and a send button. The exception here is the store — the customer picked one 7.2 mi from their site when the nearest is 1.8 mi — so the screen shows what each source gave us (store and address from the customer, items from the email), a distance strip against the typical run, the size the load actually needs, and the two decisions that resolve it: keep the store, or switch and let the mileage recompute.",
    Component: ExceptionBoard,
  },
];

export default function DispatchMockupsPage() {
  return (
    <main className="min-h-screen bg-[#111113] px-8 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/mockups"
            className="text-[11px] tracking-[0.12em] text-zinc-500 uppercase transition-colors hover:text-zinc-300"
          >
            ← All screens
          </Link>
          <h1 className="mt-2 text-[15px] font-medium text-zinc-200">
            Review queue — three directions
          </h1>
          <p className="mt-1 max-w-3xl text-[13px] text-zinc-500">
            The dispatcher&apos;s job is verification, so the queue is where
            every order is checked before the customer is invited to pay — the
            items against the email, the delivery address, the store and its
            distance, the delivery size, and the price. Desktop 1120 wide,
            cropped to 640 tall. The same demo order runs through all three:
            #1046 is misread, #1044 is clean, #1052 picked a store 7.2 mi away.
          </p>
        </div>
        <ThemeToggle />
      </div>

      <div className="mt-8 space-y-10">
        {SCREENS.map((screen) => (
          <section key={screen.name}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[13px] font-medium text-zinc-200">
                {screen.name}
              </span>
              <span className="text-[11px] tracking-[0.12em] text-zinc-500 uppercase">
                {screen.tag}
              </span>
            </div>
            <div className="mt-3 h-160 overflow-hidden rounded-2xl border border-zinc-800 bg-white shadow-2xl">
              <screen.Component />
            </div>
            <p className="mt-3 max-w-3xl text-[12px] leading-relaxed text-zinc-500">
              {screen.blurb}
            </p>
          </section>
        ))}
      </div>
    </main>
  );
}
