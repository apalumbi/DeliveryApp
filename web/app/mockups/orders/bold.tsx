import {
  Archivo,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Manrope,
  Schibsted_Grotesk,
  Hanken_Grotesk,
} from "next/font/google";
import { ALIAS, ORDERS } from "./shared";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"] });
const archivo = Archivo({ subsets: ["latin"] });
const schibsted = Schibsted_Grotesk({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });
const hanken = Hanken_Grotesk({ subsets: ["latin"] });

/* B1 — Site standard: engineering credibility, Plex, signal-yellow marker */

const b1Dot: Record<string, string> = {
  Delivered: "bg-[#1F8A4C]",
  "Awaiting approval": "bg-[#EAB308]",
  "On the way": "bg-[#2563EB]",
  Paid: "bg-[#B4B4AE]",
};

function SiteStandard() {
  return (
    <div
      className={`${plex.className} flex min-h-full flex-col bg-[#F7F7F4] text-[#16181A]`}
    >
      <header className="flex items-center justify-between px-5 pt-6 pb-5">
        <div>
          <div className="text-[15px] font-semibold tracking-tight">
            Acme Construction
          </div>
          <div className="mt-0.5 text-[10.5px] font-medium tracking-[0.18em] text-[#8A8D91] uppercase">
            Materials portal
          </div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#16181A] text-[11px] font-semibold text-[#F5C400]">
          AC
        </div>
      </header>

      <section className="border-y border-[#E7E7E3] bg-white px-5 py-5">
        <h2 className="text-[19px] font-semibold tracking-tight">
          Start an order
        </h2>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[#5C6066]">
          Build your cart at Home Depot or Lowe&apos;s, then share it to the
          address below. Don&apos;t check out.
        </p>
        <div className="mt-3.5 flex items-stretch rounded-lg border border-[#DFDFDA] bg-[#F7F7F4]">
          <span
            className={`${plexMono.className} flex-1 truncate px-3.5 py-3 text-[12.5px] font-medium`}
          >
            {ALIAS}
          </span>
          <button
            type="button"
            className="m-1 shrink-0 cursor-pointer rounded-md bg-[#16181A] px-3.5 text-[11px] font-semibold tracking-widest text-white uppercase"
          >
            Copy
          </button>
        </div>
      </section>

      <section className="flex-1 px-5 pt-5">
        <div className="flex items-baseline justify-between pb-1">
          <h2 className="text-[11px] font-semibold tracking-[0.16em] text-[#8A8D91] uppercase">
            Your orders
          </h2>
          <span className="text-[11.5px] text-[#8A8D91]">4</span>
        </div>
        <ul>
          {ORDERS.map((o) => (
            <li
              key={o.id}
              className="flex items-center gap-3 border-b border-[#E7E7E3] py-3.5"
            >
              <span className={`h-2 w-2 rounded-full ${b1Dot[o.status]}`} />
              <div className="min-w-0 flex-1">
                <div className="text-[14.5px] font-semibold tracking-tight">
                  {o.id}
                </div>
                <div className="mt-0.5 text-[12px] text-[#8A8D91]">
                  {o.status} · {o.retailer} · {o.date}
                </div>
              </div>
              <div className="text-[16px] font-semibold tabular-nums">
                {o.total}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* B2 — Contractor modern: black sign-panel hero, sentence case, one orange */

const b2Dot: Record<string, string> = {
  Delivered: "bg-[#22C55E]",
  "Awaiting approval": "bg-[#F97316]",
  "On the way": "bg-[#3B82F6]",
  Paid: "bg-[#A1A1AA]",
};

function ContractorModern() {
  return (
    <div
      className={`${archivo.className} flex min-h-full flex-col bg-white text-[#18181B]`}
    >
      <header className="flex items-center justify-between px-5 pt-6 pb-4">
        <span className="text-[15px] font-semibold tracking-[-0.01em]">
          Acme Construction
        </span>
        <div className="h-8 w-8 rounded-full bg-[#F4F4F5]" />
      </header>

      <section className="px-5">
        <div className="rounded-xl bg-[#18181B] px-5 py-5 text-white">
          <h2 className="text-[18px] font-semibold tracking-[-0.01em]">
            Start an order
          </h2>
          <p className="mt-1 text-[12.5px] leading-relaxed text-white/60">
            Build a cart at Home Depot or Lowe&apos;s, then share it to this
            address.
          </p>
          <div className="mt-3.5 flex items-center justify-between gap-3 rounded-lg bg-white/10 px-3.5 py-3">
            <span className="truncate font-mono text-[12px] text-white/90">
              {ALIAS}
            </span>
            <button
              type="button"
              className="shrink-0 cursor-pointer rounded-md bg-[#F97316] px-3 py-1.5 text-[11.5px] font-semibold text-white"
            >
              Copy
            </button>
          </div>
        </div>
      </section>

      <section className="mt-5 flex-1 px-5">
        <div className="flex items-baseline justify-between pb-1">
          <h2 className="text-[13px] font-semibold">Your orders</h2>
          <span className="text-[12px] text-[#A1A1AA]">4 orders</span>
        </div>
        <ul>
          {ORDERS.map((o) => (
            <li
              key={o.id}
              className="flex items-center justify-between border-b border-[#F0F0F1] py-3.5"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-semibold tracking-[-0.01em]">
                    {o.id}
                  </span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${b2Dot[o.status]}`}
                  />
                </div>
                <div className="mt-0.5 text-[12px] text-[#71717A]">
                  {o.status} · {o.retailer} · {o.date}
                </div>
              </div>
              <span className="text-[17px] font-semibold tracking-[-0.01em] tabular-nums">
                {o.total}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* B3 — Editorial warm: big quiet numerals, status rules, forest accent */

const b3Rule: Record<string, string> = {
  Delivered: "bg-[#1F8A4C]",
  "Awaiting approval": "bg-[#D97706]",
  "On the way": "bg-[#2563EB]",
  Paid: "bg-[#C9C4B8]",
};

function EditorialWarm() {
  return (
    <div
      className={`${schibsted.className} flex min-h-full flex-col bg-[#FBFAF7] text-[#1C1B18]`}
    >
      <header className="flex items-center justify-between px-5 pt-6 pb-2">
        <span className="text-[14px] font-medium tracking-tight">
          Acme Construction
        </span>
        <span className="text-[10.5px] font-medium tracking-[0.2em] text-[#8A857A] uppercase">
          Orders
        </span>
      </header>

      <section className="px-5 pt-4 pb-5">
        <h2 className="text-[11px] font-semibold tracking-[0.2em] text-[#166534] uppercase">
          Start an order
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-[#6F6B63]">
          Build your cart at Home Depot or Lowe&apos;s and share it to:
        </p>
        <div className="mt-2 flex items-baseline justify-between gap-3 border-b border-[#E4E1D8] pb-3">
          <span className="truncate text-[19px] font-medium tracking-tight">
            {ALIAS}
          </span>
          <button
            type="button"
            className="shrink-0 cursor-pointer text-[12px] font-medium text-[#166534] underline decoration-[#166534]/30 underline-offset-4"
          >
            Copy
          </button>
        </div>
      </section>

      <section className="flex-1 px-5">
        <h2 className="text-[10.5px] font-medium tracking-[0.2em] text-[#8A857A] uppercase">
          Recent
        </h2>
        <ul>
          {ORDERS.map((o) => (
            <li
              key={o.id}
              className="flex items-baseline justify-between border-b border-[#EFECE4] py-4"
            >
              <div>
                <div className="text-[15px] font-medium tracking-tight">
                  {o.id}
                </div>
                <div className="mt-1.5 flex items-center gap-2 text-[10.5px] font-medium tracking-[0.14em] text-[#8A857A] uppercase">
                  <span className={`h-0.75 w-4 ${b3Rule[o.status]}`} />
                  {o.status}
                </div>
                <div className="mt-1 text-[11.5px] text-[#A8A395]">
                  {o.retailer} · {o.date}
                </div>
              </div>
              <span className="text-[22px] font-medium tracking-tight tabular-nums">
                {o.total}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* B4 — Monochrome + orange: only the actionable thing has color */

const b4Dot: Record<string, string> = {
  Delivered: "bg-[#D4D4D0]",
  "Awaiting approval": "bg-[#F97316]",
  "On the way": "bg-[#D4D4D0]",
  Paid: "bg-[#D4D4D0]",
};

function MonochromeOrange() {
  return (
    <div
      className={`${manrope.className} flex min-h-full flex-col bg-[#F5F5F3] text-[#0A0A0A]`}
    >
      <header className="flex items-center justify-between px-5 pt-6 pb-6">
        <span className="text-[15px] font-semibold tracking-[-0.01em]">
          Acme Construction
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D4D4D0] text-[10.5px] font-semibold text-[#8A8A85]">
          AC
        </div>
      </header>

      <section className="px-5">
        <h2 className="text-[15px] font-semibold tracking-[-0.01em]">
          Start an order
        </h2>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[#6B6B66]">
          Build your cart at Home Depot or Lowe&apos;s, then share it to:
        </p>
        <div className="mt-2 text-[21px] leading-tight font-bold tracking-[-0.03em] break-all">
          {ALIAS}
        </div>
        <button
          type="button"
          className="mt-3.5 w-full cursor-pointer rounded-lg bg-[#0A0A0A] py-3 text-[13px] font-semibold text-white"
        >
          Copy address
        </button>
      </section>

      <section className="mt-7 flex-1 px-5">
        <h2 className="text-[11px] font-semibold tracking-[0.16em] text-[#8A8A85] uppercase">
          Your orders
        </h2>
        <ul className="mt-1">
          {ORDERS.map((o) => (
            <li
              key={o.id}
              className="flex items-center justify-between border-b border-[#E4E4E0] py-3.5"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${b4Dot[o.status]}`}
                />
                <div>
                  <div className="text-[14px] font-semibold tracking-[-0.01em]">
                    {o.id}
                  </div>
                  <div className="mt-0.5 text-[11.5px] text-[#8A8A85]">
                    {o.status} · {o.retailer} · {o.date}
                  </div>
                </div>
              </div>
              <span className="text-[17px] font-bold tracking-[-0.02em] tabular-nums">
                {o.total}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* B5 — Navy logistics: full-bleed navy hero, amber accent */

const b5Dot: Record<string, string> = {
  Delivered: "bg-[#1F8A4C]",
  "Awaiting approval": "bg-[#F2A900]",
  "On the way": "bg-[#2563EB]",
  Paid: "bg-[#C3C9D2]",
};

function NavyLogistics() {
  return (
    <div
      className={`${hanken.className} flex min-h-full flex-col bg-white text-[#0E1B2C]`}
    >
      <header className="bg-[#0E1B2C] px-5 pt-6 pb-6 text-white">
        <div className="flex items-center justify-between">
          <span className="text-[14.5px] font-semibold tracking-tight">
            Acme Construction
          </span>
          <span className="text-[10px] font-medium tracking-[0.18em] text-white/50 uppercase">
            Portal
          </span>
        </div>
        <h2 className="mt-5 text-[18px] font-semibold tracking-tight">
          Start an order
        </h2>
        <p className="mt-1 text-[12.5px] leading-relaxed text-white/60">
          Build your cart at Home Depot or Lowe&apos;s, then share it to:
        </p>
        <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-white/15 bg-white/5 px-3.5 py-3">
          <span className="truncate font-mono text-[12px] text-[#F2A900]">
            {ALIAS}
          </span>
          <button
            type="button"
            className="shrink-0 cursor-pointer rounded-md bg-[#F2A900] px-3 py-1.5 text-[11.5px] font-semibold text-[#0E1B2C]"
          >
            Copy
          </button>
        </div>
      </header>

      <section className="flex-1 px-5 pt-5">
        <h2 className="text-[11px] font-semibold tracking-[0.16em] text-[#8B94A3] uppercase">
          Your orders
        </h2>
        <ul className="mt-1">
          {ORDERS.map((o) => (
            <li
              key={o.id}
              className="flex items-center justify-between border-b border-[#EDF0F4] py-3.5"
            >
              <div>
                <div className="text-[14.5px] font-semibold tracking-tight">
                  {o.id}
                </div>
                <div className="mt-0.5 flex items-center gap-2 text-[12px] text-[#5B6675]">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${b5Dot[o.status]}`}
                  />
                  {o.status} · {o.retailer} · {o.date}
                </div>
              </div>
              <span className="text-[16px] font-semibold tabular-nums">
                {o.total}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export const BOLD_VARIATIONS = [
  {
    name: "Site standard",
    tag: "Technical",
    blurb:
      "IBM Plex + a signal-yellow marker. Engineering-document credibility instead of stencil drama.",
    Component: SiteStandard,
  },
  {
    name: "Contractor modern",
    tag: "Sturdy",
    blurb:
      "The black sign-panel hero keeps 5's punch; sentence case and one orange kill the cartoon.",
    Component: ContractorModern,
  },
  {
    name: "Editorial warm",
    tag: "Composed",
    blurb:
      "3's warmth with sans numerals — big quiet totals, status shown as color rules, forest accent.",
    Component: EditorialWarm,
  },
  {
    name: "Monochrome + orange",
    tag: "Focused",
    blurb:
      "Almost no color. Orange appears only on the one thing you can act on. Address is the hero.",
    Component: MonochromeOrange,
  },
  {
    name: "Navy logistics",
    tag: "Trustworthy",
    blurb:
      "Full-bleed navy hero, amber accent. Reads like a freight company that has never lost a pallet.",
    Component: NavyLogistics,
  },
] as const;
