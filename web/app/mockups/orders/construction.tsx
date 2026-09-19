import { Barlow, Chivo } from "next/font/google";
import { ALIAS, ORDERS } from "./shared";

const barlow = Barlow({ subsets: ["latin"], weight: ["400", "500", "600"] });
const chivo = Chivo({ subsets: ["latin"] });

/* C1 — General contractor: charcoal bar, concrete ground, safety orange sign */

const c1Status: Record<string, string> = {
  Delivered: "text-[#1F8A4C]",
  "Awaiting approval": "text-[#FF6B00]",
  "On the way": "text-[#2563EB]",
  Paid: "text-[#8A8A85]",
};

function GeneralContractor() {
  return (
    <div
      className={`${barlow.className} flex min-h-full flex-col bg-[#E9E7E2] text-[#1F1F1F]`}
    >
      <header className="flex items-center justify-between bg-[#1F1F1F] px-5 py-4 text-white">
        <span className="text-[14.5px] font-semibold tracking-[0.06em] uppercase">
          Acme Construction
        </span>
        <span className="text-[10px] font-medium tracking-[0.18em] text-white/50 uppercase">
          Materials
        </span>
      </header>

      <section className="px-5 pt-5">
        <div className="rounded-md border-l-4 border-[#FF6B00] bg-white px-4 py-4">
          <div className="text-[10.5px] font-semibold tracking-[0.16em] text-[#8A8A85] uppercase">
            Step 1 — Start an order
          </div>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[#4B4B47]">
            Build your cart at Home Depot or Lowe&apos;s, then share it to the
            address below.
          </p>
          <div className="mt-3 flex items-stretch rounded-sm border border-[#D8D5CF] bg-[#F7F6F4]">
            <span className="flex-1 truncate px-3 py-2.5 font-mono text-[12px] font-medium">
              {ALIAS}
            </span>
            <button
              type="button"
              className="m-1 shrink-0 cursor-pointer rounded-sm bg-[#FF6B00] px-3 text-[11px] font-semibold tracking-[0.08em] text-white uppercase"
            >
              Copy
            </button>
          </div>
          <button
            type="button"
            className="mt-2.5 cursor-pointer text-[11px] font-semibold tracking-widest text-[#FF6B00] uppercase"
          >
            How to share →
          </button>
        </div>
      </section>

      <section className="flex-1 px-5 pt-5 pb-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[10.5px] font-semibold tracking-[0.16em] text-[#8A8A85] uppercase">
            Your orders
          </h2>
          <span className="text-[11px] text-[#8A8A85]">4 total</span>
        </div>
        <ul className="mt-2 space-y-2">
          {ORDERS.map((o) => (
            <li
              key={o.id}
              className="flex items-center justify-between rounded-md bg-white px-4 py-3"
            >
              <div>
                <div className="text-[14px] font-semibold">{o.id}</div>
                <div className="mt-0.5 text-[11.5px] text-[#8A8A85]">
                  {o.retailer} · {o.date}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[15px] font-semibold tabular-nums">
                  {o.total}
                </div>
                <div
                  className={`mt-0.5 text-[10px] font-semibold tracking-widest uppercase ${c1Status[o.status]}`}
                >
                  {o.status}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* C2 — Blue-collar premium: navy panel, orange action, status bars */

const c2Bar: Record<string, string> = {
  Delivered: "bg-[#1F8A4C]",
  "Awaiting approval": "bg-[#F97316]",
  "On the way": "bg-[#2563EB]",
  Paid: "bg-[#C3C9D2]",
};

function BlueCollarPremium() {
  return (
    <div
      className={`${chivo.className} flex min-h-full flex-col bg-[#FAFAF7] text-[#10243E]`}
    >
      <header className="flex items-center justify-between px-5 pt-6 pb-4">
        <span className="text-[15px] font-semibold tracking-tight">
          Acme Construction
        </span>
        <span className="text-[10px] font-semibold tracking-[0.18em] text-[#8A93A3] uppercase">
          Portal
        </span>
      </header>

      <section className="px-5">
        <div className="rounded-xl bg-[#10243E] px-4 py-4 text-white">
          <h2 className="text-[15px] font-semibold">Start an order</h2>
          <p className="mt-1 text-[12.5px] leading-relaxed text-white/60">
            Build your cart at Home Depot or Lowe&apos;s, then share it to this
            address.
          </p>
          <div className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-white/10 px-3.5 py-2.5">
            <span className="truncate font-mono text-[12px] text-white">
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

      <section className="flex-1 px-5 pt-5">
        <div className="flex items-baseline justify-between border-b-2 border-[#10243E] pb-2">
          <h2 className="text-[11px] font-semibold tracking-[0.16em] uppercase">
            Your orders
          </h2>
          <span className="text-[11px] text-[#8A93A3]">4</span>
        </div>
        <ul>
          {ORDERS.map((o) => (
            <li
              key={o.id}
              className="flex items-center justify-between border-b border-[#E3E6EB] py-3.5"
            >
              <div className="flex items-center gap-3">
                <span className={`h-8 w-1 rounded-full ${c2Bar[o.status]}`} />
                <div>
                  <div className="text-[14.5px] font-semibold">{o.id}</div>
                  <div className="mt-0.5 text-[12px] text-[#8A93A3]">
                    {o.status} · {o.retailer} · {o.date}
                  </div>
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

export const CONSTRUCTION_VARIATIONS = [
  {
    name: "General contractor",
    tag: "Trade",
    blurb:
      "Charcoal bar, concrete ground, one safety-orange sign. Sturdy and dependable without stencil clichés.",
    Component: GeneralContractor,
  },
  {
    name: "Blue-collar premium",
    tag: "Trust",
    blurb:
      "Deep navy panel (the trust color) with a single orange action. Reads like a firm that shows up.",
    Component: BlueCollarPremium,
  },
] as const;
