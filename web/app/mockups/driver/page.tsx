import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

import { JobBoard, JobBoardTaken } from "./board";
import { JobDetail, ReceiptPrompt, SkipReason } from "./job";

export const metadata: Metadata = {
  title: "Driver app — mockups",
};

const SCREENS: {
  name: string;
  tag: string;
  blurb: string;
  Component: ComponentType;
}[] = [
  {
    name: "Job board",
    tag: "open postings",
    blurb:
      "Everything the driver needs to decide: store and address, item count, payout, posted-ago, and any special note. The customer's address and drop-off notes are deliberately absent.",
    Component: JobBoard,
  },
  {
    name: "Job board · just taken",
    tag: "first-accept-wins",
    blurb:
      "The loser of the race is told immediately, in place. No half-assigned job, and nobody drives to a store for an order that isn't theirs.",
    Component: JobBoardTaken,
  },
  {
    name: "Job detail · at the store",
    tag: "accepted",
    blurb:
      "The buy list, the drop-off that just unlocked, and the status ladder. Forward only — a wrong tap is a phone call to the dispatcher, not an undo.",
    Component: JobDetail,
  },
  {
    name: "Receipt prompt",
    tag: "evidence",
    blurb:
      "Prompted on Items Purchased. Capture it, or skip and say why — the receipt is the evidence behind the charge, so a skip is visible on the order.",
    Component: ReceiptPrompt,
  },
  {
    name: "Skip with a reason",
    tag: "guardrail",
    blurb:
      "Skipping is allowed; skipping silently is not. The same sheet gates the delivery photo at the site, and the dispatcher reads the reason either way.",
    Component: SkipReason,
  },
];

export default function DriverMockupsPage() {
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
            Driver app — first pass
          </h1>
          <p className="mt-1 max-w-2xl text-[13px] text-zinc-500">
            Mobile PWA, 390 wide, cropped to 633 tall. The accepted job is order
            #1039 — the same order the portal and the order page use. Board
            postings are other orders. Scroll sideways.
          </p>
        </div>
        <ThemeToggle />
      </div>

      <div className="mt-5 flex snap-x gap-8 overflow-x-auto pb-6">
        {SCREENS.map((screen, i) => (
          <div key={screen.name} className="w-97.5 shrink-0 snap-start">
            <div className="mb-3 flex items-baseline justify-between">
              <span className="text-[13px] font-medium text-zinc-200">
                {i + 1} · {screen.name}
              </span>
              <span className="text-[11px] tracking-[0.12em] text-zinc-500 uppercase">
                {screen.tag}
              </span>
            </div>
            <div className="h-158.25 overflow-hidden rounded-4xl border border-zinc-800 bg-white shadow-2xl">
              <div data-frame-scroll className="h-full overflow-y-auto">
                <screen.Component />
              </div>
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-zinc-500">
              {screen.blurb}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
