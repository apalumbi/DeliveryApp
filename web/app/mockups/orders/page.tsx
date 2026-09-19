import type { Metadata } from "next";
import Link from "next/link";
import { VARIATIONS } from "./variations";
import { ROUND3_VARIATIONS } from "./round3";
import { BOLD_VARIATIONS } from "./bold";
import { CONSTRUCTION_VARIATIONS } from "./construction";
import { ARCHITECTURE_VARIATIONS } from "./architecture";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Orders list — design directions",
};

const ROUNDS = [
  {
    id: "round3",
    title: "Round 3 — palettes",
    note: "Same skeleton (distinct Start block + colored status words), eight palettes. Type held constant so you're only judging color.",
    items: ROUND3_VARIATIONS,
  },
  {
    id: "round1",
    title: "Round 1",
    note: "The first five, kept for comparison. 2 · Clean SaaS runs on design tokens — try the theme switcher.",
    items: VARIATIONS,
  },
  {
    id: "bold",
    title: "Bold, refined",
    note: "Five takes on 5's hierarchy — address as hero, big findable numbers — without the cartoon.",
    items: BOLD_VARIATIONS,
  },
  {
    id: "construction",
    title: "Construction brands",
    note: "What the trade actually looks like: deep navy, charcoal, safety orange, sturdy type.",
    items: CONSTRUCTION_VARIATIONS,
  },
  {
    id: "architecture",
    title: "Architecture firms",
    note: "Swiss minimalism: whitespace, hairlines, restrained type, almost no color.",
    items: ARCHITECTURE_VARIATIONS,
  },
];

export default function OrdersMockupsPage() {
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
            Orders list — design directions
          </h1>
          <p className="mt-1 text-[13px] text-zinc-500">
            Same content in every frame, mobile 390×844. Scroll sideways.
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
                    {i + 1} · {v.name}
                  </span>
                  <span className="text-[11px] tracking-[0.12em] text-zinc-500 uppercase">
                    {v.tag}
                  </span>
                </div>
                <div className="h-211 overflow-hidden rounded-4xl border border-zinc-800 bg-white shadow-2xl">
                  <div className="h-full overflow-y-auto">
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
