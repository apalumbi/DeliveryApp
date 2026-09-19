import {
  Archivo,
  Fraunces,
  Roboto_Condensed,
  Space_Grotesk,
} from "next/font/google";

import { CopyIcon } from "@/components/ui/icons";

import { CleanSaas } from "./clean-saas";
import { ALIAS } from "./shared";

const condensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
const fraunces = Fraunces({ subsets: ["latin"] });
const grotesk = Space_Grotesk({ subsets: ["latin"] });
const archivo = Archivo({ subsets: ["latin"] });

type Order = {
  id: string;
  status: string;
  total: string;
  retailer: string;
  date: string;
};

const ORDERS: Order[] = [
  {
    id: "#1042",
    status: "Delivered",
    total: "$482.80",
    retailer: "Home Depot",
    date: "Sep 17",
  },
  {
    id: "#1039",
    status: "Awaiting approval",
    total: "$120.10",
    retailer: "Lowe's",
    date: "Sep 16",
  },
  {
    id: "#1036",
    status: "On the way",
    total: "$212.45",
    retailer: "Home Depot",
    date: "Sep 16",
  },
  {
    id: "#1031",
    status: "Paid",
    total: "$87.20",
    retailer: "Lowe's",
    date: "Sep 12",
  },
];

/* 1 — Job-site tool */

const v1Stripe: Record<string, string> = {
  Delivered: "bg-[#1F8A4C]",
  "Awaiting approval": "bg-[#FF5C00]",
  "On the way": "bg-[#2563EB]",
  Paid: "bg-[#9A9A93]",
};

function JobSiteTool() {
  return (
    <div
      className={`${condensed.className} flex min-h-full flex-col bg-[#F5F5F3] text-[#161616]`}
    >
      <header className="flex items-center justify-between border-b-2 border-[#161616] px-5 py-4">
        <div>
          <div className="text-[17px] font-bold tracking-[0.08em] uppercase">
            Acme Construction
          </div>
          <div className="text-[11px] font-medium tracking-[0.14em] text-[#6B6B66] uppercase">
            Materials portal
          </div>
        </div>
        <div className="flex h-9 w-9 items-center justify-center border-2 border-[#161616] bg-[#FF5C00] text-[13px] font-bold text-white">
          AC
        </div>
      </header>

      <section className="border-b-2 border-[#161616] p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="bg-[#161616] px-2 py-1 text-[10px] font-bold tracking-[0.14em] text-white uppercase">
            Step 1
          </span>
          <span className="text-[13px] font-medium tracking-[0.08em] uppercase">
            Start an order
          </span>
        </div>
        <p className="text-[13px] leading-snug text-[#3F3F3B]">
          Build your cart at Home Depot or Lowe&apos;s. Share it to the address
          below — don&apos;t check out.
        </p>
        <div className="mt-3 flex items-stretch border-2 border-[#161616] bg-white">
          <div className="flex-1 px-3 py-3 font-mono text-[12.5px] font-medium">
            {ALIAS}
          </div>
          <button
            type="button"
            className="cursor-pointer border-l-2 border-[#161616] bg-[#FF5C00] px-3 text-[11px] font-bold tracking-widest text-white uppercase"
          >
            Copy
          </button>
        </div>
        <button
          type="button"
          className="mt-2 cursor-pointer text-[11px] font-medium tracking-widest text-[#6B6B66] uppercase"
        >
          How to share →
        </button>
      </section>

      <section className="flex-1">
        <div className="flex items-baseline justify-between px-5 pt-4 pb-2">
          <h2 className="text-[13px] font-bold tracking-[0.12em] uppercase">
            Your orders
          </h2>
          <span className="text-[11px] tracking-widest text-[#6B6B66] uppercase">
            4 total
          </span>
        </div>
        <ul>
          {ORDERS.map((o) => (
            <li
              key={o.id}
              className="flex items-center gap-3 border-t-2 border-[#161616] px-5 py-3.5"
            >
              <span className={`h-10 w-1.5 ${v1Stripe[o.status]}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-[14px] font-bold">{o.id}</span>
                  <span className="text-[11px] font-bold tracking-widest text-[#6B6B66] uppercase">
                    {o.status}
                  </span>
                </div>
                <div className="text-[12px] text-[#6B6B66]">
                  {o.retailer} · {o.date}
                </div>
              </div>
              <div className="text-[15px] font-bold tabular-nums">
                {o.total}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* 2 — Clean SaaS — promoted to ./clean-saas.tsx; still listed below for comparison */

/* 3 — Warm local */

const v3Dot: Record<string, string> = {
  Delivered: "bg-[#3F7A4E]",
  "Awaiting approval": "bg-[#C2410C]",
  "On the way": "bg-[#3B6EA5]",
  Paid: "bg-[#B9A88F]",
};

function WarmLocal() {
  return (
    <div className="flex min-h-full flex-col bg-[#FAF6EF] font-sans text-[#2B2118]">
      <header className="px-5 pt-7 pb-5">
        <div className="text-[11px] font-medium tracking-[0.18em] text-[#A08D75] uppercase">
          Acme Construction
        </div>
        <h1
          className={`${fraunces.className} mt-1 text-[26px] leading-tight font-semibold`}
        >
          Your materials
        </h1>
      </header>

      <section className="mx-4 rounded-3xl border border-[#E8DFD2] bg-white p-5 shadow-[0_1px_2px_rgba(43,33,24,0.06)]">
        <h2 className={`${fraunces.className} text-[18px] font-semibold`}>
          Start an order
        </h2>
        <p className="mt-1 text-[13px] leading-relaxed text-[#7A6A55]">
          Send us your Home Depot or Lowe&apos;s cart and we&apos;ll take it
          from there.
        </p>
        <div className="mt-3 rounded-2xl bg-[#F6EFE4] px-4 py-3">
          <div className="text-[10.5px] font-medium tracking-[0.16em] text-[#A08D75] uppercase">
            Share your cart to
          </div>
          <div className="mt-1 flex items-center justify-between gap-2">
            <span className="truncate font-mono text-[12.5px]">{ALIAS}</span>
            <button
              type="button"
              className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-[#B4552D] px-3 py-1.5 text-[11.5px] font-medium text-white"
            >
              <CopyIcon className="h-3.5 w-3.5" />
              Copy
            </button>
          </div>
        </div>
        <button
          type="button"
          className="mt-3 cursor-pointer text-[12.5px] font-medium text-[#B4552D] underline decoration-[#B4552D]/40 underline-offset-4"
        >
          How to share your cart
        </button>
      </section>

      <section className="mt-6 flex-1 px-4 pb-6">
        <h2 className="px-1 pb-2 text-[11px] font-medium tracking-[0.18em] text-[#A08D75] uppercase">
          Recent orders
        </h2>
        <ul className="space-y-2.5">
          {ORDERS.map((o) => (
            <li
              key={o.id}
              className="flex items-center justify-between rounded-2xl border border-[#E8DFD2] bg-white px-4 py-3.5"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[13.5px] font-medium">{o.id}</span>
                  <span className="flex items-center gap-1.5 text-[11.5px] text-[#7A6A55]">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${v3Dot[o.status]}`}
                    />
                    {o.status}
                  </span>
                </div>
                <div className="mt-0.5 text-[12px] text-[#A08D75]">
                  {o.retailer} · {o.date}
                </div>
              </div>
              <span
                className={`${fraunces.className} text-[16px] font-semibold tabular-nums`}
              >
                {o.total}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* 4 — Dark tech */

const v4Dot: Record<string, string> = {
  Delivered: "bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]",
  "Awaiting approval": "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
  "On the way": "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]",
  Paid: "bg-zinc-600",
};

function DarkTech() {
  return (
    <div
      className={`${grotesk.className} flex min-h-full flex-col bg-[#09090B] text-zinc-100`}
    >
      <header className="flex items-center justify-between px-5 pt-6 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-linear-to-br from-teal-400 to-cyan-600" />
          <span className="text-[14px] font-medium tracking-tight">
            Acme Construction
          </span>
        </div>
        <div className="h-7 w-7 rounded-full border border-zinc-800 bg-zinc-900" />
      </header>

      <section className="px-5">
        <div className="rounded-2xl border border-zinc-800 bg-[#101013] p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[13px] font-medium">Start an order</h2>
            <span className="rounded-md border border-teal-400/20 bg-teal-400/10 px-2 py-0.5 text-[10.5px] font-medium text-teal-300">
              Recommended
            </span>
          </div>
          <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-400">
            Build a cart at Home Depot or Lowe&apos;s and share it to:
          </p>
          <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-dashed border-zinc-700 bg-black/40 px-3 py-2.5">
            <span className="truncate font-mono text-[12px] text-teal-200">
              {ALIAS}
            </span>
            <button
              type="button"
              className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-teal-400 px-2.5 py-1.5 text-[11.5px] font-semibold text-zinc-950"
            >
              <CopyIcon className="h-3.5 w-3.5" />
              Copy
            </button>
          </div>
          <button
            type="button"
            className="mt-3 cursor-pointer text-[12px] text-zinc-500"
          >
            How to share →
          </button>
        </div>
      </section>

      <section className="mt-6 flex-1 px-5">
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="text-[13px] font-medium">Your orders</h2>
          <span className="text-[11.5px] text-zinc-600">4</span>
        </div>
        <ul className="overflow-hidden rounded-2xl border border-zinc-800">
          {ORDERS.map((o, i) => (
            <li
              key={o.id}
              className={`flex items-center gap-3 bg-[#0E0E11] px-4 py-3 ${
                i > 0 ? "border-t border-zinc-800/80" : ""
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${v4Dot[o.status]}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium text-zinc-200">
                    {o.id}
                  </span>
                  <span className="text-[11.5px] text-zinc-500">
                    {o.status}
                  </span>
                </div>
                <div className="mt-0.5 text-[11.5px] text-zinc-600">
                  {o.retailer} · {o.date}
                </div>
              </div>
              <span className="text-[13px] font-medium text-zinc-100 tabular-nums">
                {o.total}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* 5 — Bold type */

function BoldType() {
  return (
    <div
      className={`${archivo.className} flex min-h-full flex-col bg-white text-[#0A0A0A]`}
    >
      <header className="flex items-center justify-between border-b-[3px] border-[#0A0A0A] px-5 py-4">
        <span className="text-[15px] font-extrabold tracking-tight uppercase">
          Acme Construction
        </span>
        <span className="text-[11px] font-semibold tracking-[0.12em] text-[#0A0A0A]/50 uppercase">
          Orders
        </span>
      </header>

      <section className="border-b-[3px] border-[#0A0A0A] bg-[#FFD400] px-5 py-5">
        <h2 className="text-[22px] leading-none font-black tracking-tight uppercase">
          Start an order
        </h2>
        <p className="mt-2 text-[12.5px] leading-snug font-medium text-[#0A0A0A]/70">
          Build a cart at Home Depot or Lowe&apos;s. Share it here. Don&apos;t
          check out.
        </p>
        <div className="mt-3 flex items-stretch border-2 border-[#0A0A0A] bg-white">
          <span className="flex-1 truncate px-3 py-2.5 font-mono text-[12px] font-semibold">
            {ALIAS}
          </span>
          <button
            type="button"
            className="shrink-0 cursor-pointer border-l-2 border-[#0A0A0A] bg-[#0A0A0A] px-3.5 text-[11px] font-bold tracking-[0.12em] text-white uppercase"
          >
            Copy
          </button>
        </div>
      </section>

      <section className="flex-1">
        <ul>
          {ORDERS.map((o) => (
            <li key={o.id} className="border-b border-[#0A0A0A]/15 px-5 py-4">
              <div className="flex items-baseline justify-between">
                <span className="text-[20px] font-extrabold tracking-tight tabular-nums">
                  {o.id}
                </span>
                <span className="text-[20px] font-extrabold tracking-tight tabular-nums">
                  {o.total}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between text-[11.5px] font-semibold tracking-widest text-[#0A0A0A]/55 uppercase">
                <span>{o.status}</span>
                <span>
                  {o.retailer} · {o.date}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export const VARIATIONS = [
  {
    name: "Job-site tool",
    tag: "Industrial",
    blurb:
      "Condensed type, hard edges, safety orange. Feels like a tool for people in boots, not a website.",
    Component: JobSiteTool,
  },
  {
    name: "Clean SaaS",
    tag: "Neutral",
    blurb:
      "The safe default: white cards, soft status pills, indigo accent. Familiar and unopinionated.",
    Component: CleanSaas,
  },
  {
    name: "Warm local",
    tag: "Approachable",
    blurb:
      "Cream, terracotta, serif headings. Reads like a small business that knows your name.",
    Component: WarmLocal,
  },
  {
    name: "Dark tech",
    tag: "Modern",
    blurb:
      "Near-black, teal glow, dashed address box. Contemporary app energy.",
    Component: DarkTech,
  },
  {
    name: "Bold type",
    tag: "Editorial",
    blurb:
      "Huge order numbers, thick rules, a yellow block. Confident and scannable from arm's length.",
    Component: BoldType,
  },
] as const;
