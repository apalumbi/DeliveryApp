import { IBM_Plex_Mono, Newsreader, Work_Sans } from "next/font/google";
import { ALIAS, ORDERS } from "./shared";

const work = Work_Sans({ subsets: ["latin"] });
const newsreader = Newsreader({ subsets: ["latin"] });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"] });

/* A1 — Gallery minimal: whitespace, hairlines, big light numerals */

function GalleryMinimal() {
  return (
    <div
      className={`${work.className} flex min-h-full flex-col bg-white text-[#111111]`}
    >
      <header className="flex items-baseline justify-between px-6 pt-8 pb-6">
        <span className="text-[13px] font-medium tracking-[0.02em]">
          Acme Construction
        </span>
        <span className="text-[9.5px] font-medium tracking-[0.28em] text-[#9A9A9A] uppercase">
          Orders
        </span>
      </header>

      <section className="px-6 pb-8">
        <h2 className="text-[9.5px] font-medium tracking-[0.28em] text-[#9A9A9A] uppercase">
          Start an order
        </h2>
        <p className="mt-3 text-[13px] leading-loose font-light text-[#5A5A5A]">
          Build a cart at Home Depot or Lowe&apos;s, then share it to the
          address below.
        </p>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <span className="truncate text-[17px] tracking-tight">{ALIAS}</span>
          <button
            type="button"
            className="shrink-0 cursor-pointer border border-[#DADADA] px-3 py-1.5 text-[10px] font-medium tracking-[0.18em] text-[#111] uppercase"
          >
            Copy
          </button>
        </div>
      </section>

      <section className="flex-1 px-6">
        <h2 className="text-[9.5px] font-medium tracking-[0.28em] text-[#9A9A9A] uppercase">
          Recent orders
        </h2>
        <ul className="mt-2">
          {ORDERS.map((o) => (
            <li
              key={o.id}
              className="flex items-baseline justify-between border-t border-[#EDEDED] py-5"
            >
              <div>
                <div className="text-[13px] tracking-[0.02em]">{o.id}</div>
                <div className="mt-1.5 text-[10px] font-light tracking-[0.2em] text-[#9A9A9A] uppercase">
                  {o.status}
                </div>
                <div className="mt-1 text-[11px] font-light text-[#B5B5B5]">
                  {o.retailer} · {o.date}
                </div>
              </div>
              <span className="text-[24px] font-light tracking-tight tabular-nums">
                {o.total}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* A2 — Studio editorial: restrained serif, clay accent, reading rhythm */

function StudioEditorial() {
  return (
    <div
      className={`${work.className} flex min-h-full flex-col bg-[#FAFAF8] text-[#1A1A1A]`}
    >
      <header className="flex items-baseline justify-between px-5 pt-7 pb-5">
        <span className={`${newsreader.className} text-[17px] font-medium`}>
          Acme Construction
        </span>
        <span className="text-[9.5px] font-medium tracking-[0.26em] text-[#A3A099] uppercase">
          Orders
        </span>
      </header>

      <section className="px-5 pb-6">
        <h2 className={`${newsreader.className} text-[20px] font-medium`}>
          Start an order
        </h2>
        <p className="mt-2 text-[12.5px] leading-relaxed font-light text-[#6B6862]">
          Build a cart at Home Depot or Lowe&apos;s, then share it to the
          address below.
        </p>
        <div className="mt-3 flex items-center justify-between gap-3 border-y border-[#E7E4DD] py-3">
          <span className="truncate font-mono text-[12px] tracking-tight">
            {ALIAS}
          </span>
          <button
            type="button"
            className="shrink-0 cursor-pointer text-[10.5px] font-medium tracking-[0.18em] text-[#8C6A4A] uppercase underline underline-offset-4"
          >
            Copy
          </button>
        </div>
      </section>

      <section className="flex-1 px-5">
        <ul>
          {ORDERS.map((o) => (
            <li
              key={o.id}
              className="flex items-baseline justify-between border-b border-[#EFECE6] py-4"
            >
              <div>
                <div className="text-[12.5px] font-medium tracking-[0.02em]">
                  {o.id}
                </div>
                <div className="mt-1 text-[10px] font-light tracking-[0.2em] text-[#A3A099] uppercase">
                  {o.status} — {o.retailer}
                </div>
                <div className="mt-1 text-[10.5px] font-light text-[#BDB9B0]">
                  {o.date}
                </div>
              </div>
              <span
                className={`${newsreader.className} text-[21px] tabular-nums`}
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

/* A3 — Concrete + glass: square grid, mono labels, outlined chips */

function ConcreteGlass() {
  return (
    <div className="flex min-h-full flex-col bg-[#F1F0EE] font-sans text-[#141414]">
      <header className="flex items-center justify-between border-b border-[#D9D6D1] px-5 py-4">
        <span className="text-[14px] font-medium tracking-tight">
          Acme Construction
        </span>
        <span
          className={`${plexMono.className} text-[10px] tracking-[0.14em] text-[#6B6B66] uppercase`}
        >
          portal v1
        </span>
      </header>

      <section className="border-b border-[#D9D6D1] px-5 py-5">
        <h2
          className={`${plexMono.className} text-[10.5px] tracking-[0.16em] text-[#6B6B66] uppercase`}
        >
          Start an order
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-[#4A4A46]">
          Build your cart at Home Depot or Lowe&apos;s, then share it to:
        </p>
        <div className="mt-3 flex items-stretch border border-[#141414]">
          <span
            className={`${plexMono.className} flex-1 truncate bg-white px-3 py-3 text-[12px]`}
          >
            {ALIAS}
          </span>
          <button
            type="button"
            className="shrink-0 cursor-pointer border-l border-[#141414] bg-[#141414] px-3.5 text-[10px] font-medium tracking-[0.14em] text-white uppercase"
          >
            Copy
          </button>
        </div>
      </section>

      <section className="flex-1">
        <div className="flex items-baseline justify-between px-5 pt-4 pb-2">
          <h2
            className={`${plexMono.className} text-[10.5px] tracking-[0.16em] text-[#6B6B66] uppercase`}
          >
            Your orders
          </h2>
          <span
            className={`${plexMono.className} text-[10.5px] text-[#6B6B66]`}
          >
            04
          </span>
        </div>
        <ul>
          {ORDERS.map((o) => (
            <li
              key={o.id}
              className="flex items-center justify-between border-t border-[#D9D6D1] px-5 py-3.5"
            >
              <div>
                <div className="text-[13.5px] font-medium tabular-nums">
                  {o.id}
                </div>
                <div className="mt-0.5 text-[11.5px] text-[#6B6B66]">
                  {o.retailer} · {o.date}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="border border-[#C6C3BE] px-2 py-0.5 text-[10px] tracking-[0.06em] text-[#4A4A46] uppercase">
                  {o.status}
                </span>
                <span className="text-[14.5px] font-medium tabular-nums">
                  {o.total}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export const ARCHITECTURE_VARIATIONS = [
  {
    name: "Gallery minimal",
    tag: "Swiss",
    blurb:
      "Whitespace as the main material. Hairlines, tracked micro-labels, big light numerals.",
    Component: GalleryMinimal,
  },
  {
    name: "Studio editorial",
    tag: "Monograph",
    blurb:
      "A restrained serif for headings and totals, clay accent, reading rhythm between rules.",
    Component: StudioEditorial,
  },
  {
    name: "Concrete + glass",
    tag: "Grid",
    blurb:
      "Square grid, mono labels, outlined status chips. Swiss restraint with a technical edge.",
    Component: ConcreteGlass,
  },
] as const;
