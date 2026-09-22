import type { Metadata } from "next";
import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

import { DETAIL_VARIATIONS, ROUND2_VARIATIONS } from "./variations";

export const metadata: Metadata = {
  title: "Order detail — design directions",
};

const ROUNDS = [
  {
    id: "round2",
    title: "Round 2 — your picks",
    note: "Six merges the picks; Seven is the same flow one thing at a time — click through it.",
    startAt: 6,
    items: ROUND2_VARIATIONS,
  },
  {
    id: "round1",
    title: "Round 1 — five skeletons",
    note: "Same content, same tokens — only the structure changes.",
    startAt: 1,
    items: DETAIL_VARIATIONS,
  },
];

export default function OrderDetailMockupsPage() {
  return (
    <main className="min-h-screen bg-[#111113] px-8 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/mockups/orders"
            className="text-[11px] tracking-[0.12em] text-zinc-500 uppercase transition-colors hover:text-zinc-300"
          >
            ← Orders list
          </Link>
          <h1 className="mt-2 text-[15px] font-medium text-zinc-200">
            Order detail — design directions
          </h1>
          <p className="mt-1 max-w-2xl text-[13px] text-zinc-500">
            The awaiting-approval state: the page the customer lands on to
            review a forwarded cart, and the tracking record it becomes after
            approval. Every frame is #1039 · Lowe&apos;s · North Frisco · 3
            items · $120.10 — the awaiting-approval row from the approved list.
            Mobile 390 wide, cropped to 633 tall. Scroll sideways.
          </p>
        </div>
        <ThemeToggle />
      </div>

      {ROUNDS.map((round) => (
        <section key={round.id} id={round.id} className="mt-12 scroll-mt-6">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="text-[13px] font-semibold tracking-[0.14em] text-zinc-300 uppercase">
              {round.title}
            </h2>
            <p className="text-[12px] text-zinc-500">{round.note}</p>
          </div>

          <div className="mt-5 flex snap-x gap-8 overflow-x-auto pb-6">
            {round.items.map((v, i) => (
              <div key={v.name} className="w-97.5 shrink-0 snap-start">
                <div className="mb-3 flex items-baseline justify-between">
                  <span className="text-[13px] font-medium text-zinc-200">
                    {round.startAt + i} · {v.name}
                  </span>
                  <span className="text-[11px] tracking-[0.12em] text-zinc-500 uppercase">
                    {v.tag}
                  </span>
                </div>
                <div className="h-158.25 overflow-hidden rounded-4xl border border-zinc-800 bg-white shadow-2xl">
                  <div data-frame-scroll className="h-full overflow-y-auto">
                    <v.Component />
                  </div>
                </div>
                <p className="mt-3 text-[12px] leading-relaxed text-zinc-500">
                  {v.blurb}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
