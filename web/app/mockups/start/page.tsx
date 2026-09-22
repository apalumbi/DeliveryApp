import type { Metadata } from "next";
import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

import { StepWizardDetail } from "../orders/detail/wizard";
import { ApprovalEmail } from "./email";
import { StartOrderFlow } from "./flow";
import { HomeScreen } from "./home";

export const metadata: Metadata = {
  title: "The customer flow — home → start → email → approve",
};

const FRAMES = [
  {
    name: "Home",
    tag: "Uber-ish",
    blurb:
      "One primary action, one secondary door. No alias, no order list — 'See past orders' is a tap away.",
    node: <HomeScreen />,
  },
  {
    name: "Home · approval waiting",
    tag: "Conditional",
    blurb:
      "When an order is waiting on them, one line appears under Start. A required action, not a list.",
    node: <HomeScreen pending />,
  },
  {
    name: "Start an order",
    tag: "Interactive · 5 steps",
    blurb:
      "Site → retailer → store → check your store → build & share. Click through it: the store, the link, and the copy all follow the retailer you pick. Both retailers open their store page — the link comes from the seeded store record, and a store without one falls back to the homepage.",
    node: <StartOrderFlow />,
  },
  {
    name: "Email · cart ready to review",
    tag: "The way back in",
    blurb:
      "Sent when the dispatcher confirms the cart and the price. One CTA, the order summary, and a call-us line for a wrong store or item. Sender brand is a placeholder.",
    node: <ApprovalEmail />,
  },
  {
    name: "Order page · review & approve",
    tag: "Interactive · mockup 7",
    blurb:
      "Where the email lands: store confirmation, receipt with the total line, delivery capture, and the sticky approve. After approval this same page becomes the tracking record.",
    node: <StepWizardDetail />,
  },
];

export default function StartMockupsPage() {
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
            The customer flow — home → start → email → approve
          </h1>
          <p className="mt-1 max-w-2xl text-[13px] text-zinc-500">
            The whole loop, in order. Between frames 3 and 4 the customer is on
            the retailer&apos;s site building and sharing the cart — that part
            isn&apos;t ours. The dispatcher reviews in between frames 4 and 5.
            Mobile 390 wide, cropped to 633 tall. Scroll sideways.
          </p>
        </div>
        <ThemeToggle />
      </div>

      <section className="mt-12">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h2 className="text-[13px] font-semibold tracking-[0.14em] text-zinc-300 uppercase">
            The flow, in order
          </h2>
          <p className="text-[12px] text-zinc-500">
            Same tokens as the order detail directions.
          </p>
        </div>

        <div className="mt-5 flex snap-x gap-8 overflow-x-auto pb-6">
          {FRAMES.map((frame, i) => (
            <div key={frame.name} className="w-97.5 shrink-0 snap-start">
              <div className="mb-3 flex items-baseline justify-between">
                <span className="text-[13px] font-medium text-zinc-200">
                  {i + 1} · {frame.name}
                </span>
                <span className="text-[11px] tracking-[0.12em] text-zinc-500 uppercase">
                  {frame.tag}
                </span>
              </div>
              <div className="h-158.25 overflow-hidden rounded-4xl border border-zinc-800 bg-white shadow-2xl">
                <div data-frame-scroll className="h-full overflow-y-auto">
                  {frame.node}
                </div>
              </div>
              <p className="mt-3 text-[12px] leading-relaxed text-zinc-500">
                {frame.blurb}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
