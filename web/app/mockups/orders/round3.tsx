import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { ALIAS, ORDERS } from "./shared";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"] });

type Palette = {
  name: string;
  tag: string;
  blurb: string;
  pageBg: string;
  cardBg: string;
  ink: string;
  muted: string;
  hairline: string;
  headerBg: string;
  headerInk: string;
  headerMuted: string;
  bandMode: "full" | "card";
  bandBg: string;
  bandBorder: string;
  bandInk: string;
  bandMuted: string;
  addressBg: string;
  addressInk: string;
  addressBorder: string;
  buttonBg: string;
  buttonInk: string;
  listMode: "rows" | "cards";
  status: Record<string, string>;
};

const PALETTES: Palette[] = [
  {
    name: "Signal",
    tag: "Your palette",
    blurb:
      "The palette from your screenshot — orange primary, navy secondary, cool gray ground.",
    pageBg: "#e8ebed",
    cardBg: "#ffffff",
    ink: "#22303f",
    muted: "#7b8794",
    hairline: "#cccccc",
    headerBg: "transparent",
    headerInk: "#2f4b79",
    headerMuted: "#7b8794",
    bandMode: "card",
    bandBg: "#ffffff",
    bandBorder: "#cccccc",
    bandInk: "#2f4b79",
    bandMuted: "#6b7785",
    addressBg: "#f4f5f7",
    addressInk: "#2f4b79",
    addressBorder: "#cccccc",
    buttonBg: "#df6035",
    buttonInk: "#ffffff",
    listMode: "cards",
    status: {
      Delivered: "#2f4b79",
      "Awaiting approval": "#c2521f",
      "On the way": "#4a6f96",
      Paid: "#8a94a0",
    },
  },
  {
    name: "Navy standard",
    tag: "Hybrid",
    blurb:
      "Site standard's distinct band with Navy logistics' colors. The two things you liked, combined.",
    pageBg: "#f6f7f9",
    cardBg: "#ffffff",
    ink: "#0e1b2c",
    muted: "#8a8d91",
    hairline: "#e3e6ea",
    headerBg: "transparent",
    headerInk: "#0e1b2c",
    headerMuted: "#8a8d91",
    bandMode: "full",
    bandBg: "#0e1b2c",
    bandBorder: "#0e1b2c",
    bandInk: "#ffffff",
    bandMuted: "#9aa7b8",
    addressBg: "#1b2a3d",
    addressInk: "#f2a900",
    addressBorder: "#2b3d52",
    buttonBg: "#f2a900",
    buttonInk: "#0e1b2c",
    listMode: "rows",
    status: {
      Delivered: "#1f8a4c",
      "Awaiting approval": "#d97706",
      "On the way": "#2563eb",
      Paid: "#94a3b8",
    },
  },
  {
    name: "Steel & hi-vis",
    tag: "OSHA",
    blurb:
      "Steel blue with hi-vis yellow. The safety-vest palette, kept clean.",
    pageBg: "#f1f5f9",
    cardBg: "#ffffff",
    ink: "#334155",
    muted: "#7c8798",
    hairline: "#dbe2ea",
    headerBg: "#334155",
    headerInk: "#ffffff",
    headerMuted: "#a8b4c4",
    bandMode: "full",
    bandBg: "#475569",
    bandBorder: "#475569",
    bandInk: "#ffffff",
    bandMuted: "#cbd5e1",
    addressBg: "#334155",
    addressInk: "#facc15",
    addressBorder: "#5b6b80",
    buttonBg: "#facc15",
    buttonInk: "#334155",
    listMode: "rows",
    status: {
      Delivered: "#16a34a",
      "Awaiting approval": "#b45309",
      "On the way": "#2563eb",
      Paid: "#94a3b8",
    },
  },
  {
    name: "Forest & cream",
    tag: "Earthy",
    blurb:
      "Deep green on cream — the 2026 earthy direction, reads stable and considered.",
    pageBg: "#faf7f0",
    cardBg: "#ffffff",
    ink: "#1f2b22",
    muted: "#8b8577",
    hairline: "#e7e0d2",
    headerBg: "transparent",
    headerInk: "#14532d",
    headerMuted: "#8b8577",
    bandMode: "full",
    bandBg: "#14532d",
    bandBorder: "#14532d",
    bandInk: "#fdfbf5",
    bandMuted: "#b9cbb9",
    addressBg: "#0f3f22",
    addressInk: "#f0d9a8",
    addressBorder: "#2c6440",
    buttonBg: "#d97706",
    buttonInk: "#ffffff",
    listMode: "rows",
    status: {
      Delivered: "#15803d",
      "Awaiting approval": "#b45309",
      "On the way": "#1d4ed8",
      Paid: "#a8a29e",
    },
  },
  {
    name: "Concrete & signal",
    tag: "Trade",
    blurb:
      "The general contractor you liked, pushed: concrete ground, signal-orange card, white order tiles.",
    pageBg: "#e9e7e2",
    cardBg: "#ffffff",
    ink: "#1f1f1f",
    muted: "#8a8a85",
    hairline: "#d8d5cf",
    headerBg: "#1f1f1f",
    headerInk: "#ffffff",
    headerMuted: "#9a9a95",
    bandMode: "card",
    bandBg: "#fff3ea",
    bandBorder: "#ffd9bf",
    bandInk: "#1f1f1f",
    bandMuted: "#7a6a5e",
    addressBg: "#ffffff",
    addressInk: "#1f1f1f",
    addressBorder: "#e8c9ad",
    buttonBg: "#ff6b00",
    buttonInk: "#ffffff",
    listMode: "cards",
    status: {
      Delivered: "#1f8a4c",
      "Awaiting approval": "#e2570a",
      "On the way": "#2563eb",
      Paid: "#8a8a85",
    },
  },
  {
    name: "Brick & sand",
    tag: "Warm",
    blurb:
      "Brick red on sand. Warm and material, without drifting into bakery territory.",
    pageBg: "#f7f2ea",
    cardBg: "#ffffff",
    ink: "#2b2118",
    muted: "#9c9184",
    hairline: "#e8dfd0",
    headerBg: "transparent",
    headerInk: "#9a3412",
    headerMuted: "#9c9184",
    bandMode: "full",
    bandBg: "#9a3412",
    bandBorder: "#9a3412",
    bandInk: "#fff7ef",
    bandMuted: "#e8c4ab",
    addressBg: "#7f2a0e",
    addressInk: "#ffe3c7",
    addressBorder: "#b0552f",
    buttonBg: "#ffd9b0",
    buttonInk: "#7f2a0e",
    listMode: "rows",
    status: {
      Delivered: "#15803d",
      "Awaiting approval": "#c2410c",
      "On the way": "#1d4ed8",
      Paid: "#a8a29e",
    },
  },
  {
    name: "Slate & lime",
    tag: "Hi-vis",
    blurb:
      "Slate with hi-vis lime. The boldest of the eight — either confident or too much, you'll know instantly.",
    pageBg: "#f8fafc",
    cardBg: "#ffffff",
    ink: "#0f172a",
    muted: "#7c8698",
    hairline: "#e2e8f0",
    headerBg: "transparent",
    headerInk: "#0f172a",
    headerMuted: "#7c8698",
    bandMode: "full",
    bandBg: "#0f172a",
    bandBorder: "#0f172a",
    bandInk: "#ffffff",
    bandMuted: "#94a3b8",
    addressBg: "#1e293b",
    addressInk: "#a3e635",
    addressBorder: "#334155",
    buttonBg: "#a3e635",
    buttonInk: "#0f172a",
    listMode: "rows",
    status: {
      Delivered: "#16a34a",
      "Awaiting approval": "#a16207",
      "On the way": "#2563eb",
      Paid: "#94a3b8",
    },
  },
  {
    name: "Marine & copper",
    tag: "Premium",
    blurb:
      "Deep marine teal with copper. The quiet-money palette — expensive without being loud.",
    pageBg: "#f5f3ef",
    cardBg: "#ffffff",
    ink: "#14201f",
    muted: "#7f8a86",
    hairline: "#e2ded4",
    headerBg: "transparent",
    headerInk: "#0f3d3e",
    headerMuted: "#7f8a86",
    bandMode: "full",
    bandBg: "#0f3d3e",
    bandBorder: "#0f3d3e",
    bandInk: "#f2ede4",
    bandMuted: "#a8c0bd",
    addressBg: "#0a2f30",
    addressInk: "#e9c89a",
    addressBorder: "#2a5253",
    buttonBg: "#b87333",
    buttonInk: "#ffffff",
    listMode: "rows",
    status: {
      Delivered: "#15803d",
      "Awaiting approval": "#b45309",
      "On the way": "#1d4ed8",
      Paid: "#a8a29e",
    },
  },
];

function PaletteOrders({ p }: { p: Palette }) {
  const band = (
    <>
      <h2
        className="text-[18px] font-semibold tracking-tight"
        style={{ color: p.bandInk }}
      >
        Start an order
      </h2>
      <p
        className="mt-1.5 text-[13px] leading-relaxed"
        style={{ color: p.bandMuted }}
      >
        Build your cart at Home Depot or Lowe&apos;s, then share it to the
        address below.
      </p>
      <div
        className="mt-3.5 flex items-stretch rounded-lg"
        style={{
          background: p.addressBg,
          border: `1px solid ${p.addressBorder}`,
        }}
      >
        <span
          className={`${plexMono.className} flex-1 truncate px-3.5 py-3 text-[12.5px] font-medium`}
          style={{ color: p.addressInk }}
        >
          {ALIAS}
        </span>
        <button
          type="button"
          className="m-1 shrink-0 cursor-pointer rounded-md px-3.5 text-[11px] font-semibold tracking-widest uppercase"
          style={{ background: p.buttonBg, color: p.buttonInk }}
        >
          Copy
        </button>
      </div>
    </>
  );

  return (
    <div
      className={`${plex.className} flex min-h-full flex-col`}
      style={{ background: p.pageBg, color: p.ink }}
    >
      <header
        className="flex items-center justify-between px-5 py-4"
        style={{ background: p.headerBg, color: p.headerInk }}
      >
        <span className="text-[14.5px] font-semibold tracking-tight">
          Acme Construction
        </span>
        <span
          className="text-[10px] font-semibold tracking-[0.18em] uppercase"
          style={{ color: p.headerMuted }}
        >
          Portal
        </span>
      </header>

      {p.bandMode === "full" ? (
        <section className="px-5 py-5" style={{ background: p.bandBg }}>
          {band}
        </section>
      ) : (
        <section className="px-5 pt-5">
          <div
            className="rounded-xl px-4 py-4"
            style={{
              background: p.bandBg,
              border: `1px solid ${p.bandBorder}`,
            }}
          >
            {band}
          </div>
        </section>
      )}

      <section
        className={
          p.listMode === "cards" ? "flex-1 px-5 pt-5 pb-5" : "flex-1 px-5 pt-5"
        }
      >
        <div className="flex items-baseline justify-between pb-1">
          <h2
            className="text-[11px] font-semibold tracking-[0.16em] uppercase"
            style={{ color: p.muted }}
          >
            Your orders
          </h2>
          <span className="text-[11.5px]" style={{ color: p.muted }}>
            4
          </span>
        </div>
        <ul className={p.listMode === "cards" ? "space-y-2" : ""}>
          {ORDERS.map((o) => (
            <li
              key={o.id}
              className={
                p.listMode === "cards"
                  ? "flex items-center justify-between rounded-lg px-4 py-3"
                  : "flex items-center justify-between border-b py-3.5"
              }
              style={
                p.listMode === "cards"
                  ? { background: p.cardBg }
                  : { borderColor: p.hairline }
              }
            >
              <div>
                <div className="text-[14.5px] font-semibold tracking-tight">
                  {o.id}
                </div>
                <div className="mt-0.5 text-[12px]" style={{ color: p.muted }}>
                  <span
                    className="text-[10.5px] font-semibold tracking-widest uppercase"
                    style={{ color: p.status[o.status] }}
                  >
                    {o.status}
                  </span>{" "}
                  · {o.retailer} · {o.date}
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

export const ROUND3_VARIATIONS = PALETTES.map((p) => ({
  name: p.name,
  tag: p.tag,
  blurb: p.blurb,
  Component: () => <PaletteOrders p={p} />,
}));
