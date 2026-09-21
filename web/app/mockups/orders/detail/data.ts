import type { OrderStatus } from "@/lib/tokens";

/** The review state — see docs/architecture/04-order-lifecycle.md. */
export const STATUS: OrderStatus = "awaiting_customer";

/** Demo data: the awaiting-approval row (#1039) from the approved orders list. */
export const ORDER = {
  number: "#1039",
  retailer: "Lowe's",
  store: "North Frisco",
  placed: "Sep 16",
};

export type Item = {
  name: string;
  brand: string;
  model: string;
  qty: number;
  total: string;
};

export const ITEMS: Item[] = [
  {
    name: "2×4×8 SPF stud",
    brand: "Top Choice",
    model: "5116",
    qty: 6,
    total: "$23.10",
  },
  {
    name: "2×6×8 pressure-treated deck board",
    brand: "Severe Weather",
    model: "2411",
    qty: 4,
    total: "$34.40",
  },
  {
    name: "3 in. deck screws, 1 lb box",
    brand: "Deck Plus",
    model: "8812",
    qty: 2,
    total: "$10.80",
  },
  {
    name: "16 oz. wood glue",
    brand: "Gorilla",
    model: "6203",
    qty: 1,
    total: "$1.80",
  },
];

export const PRICE = {
  materials: "$70.10",
  sizing: "$25.00",
  delivery: "$25.00",
  total: "$120.10",
};

export const RECEIPT_META = `Order ${ORDER.number} · ${ORDER.placed} · ${ITEMS.length} items`;

export const SITE = {
  label: "Oakwood Phase 2",
  address: "421 Commerce Rd, Bldg 3",
  notes: "Gate code 4412, rear entrance — ask for Dave",
  contact: "Dave",
  phone: "(864) 555-0147",
};

export const APPROVE_STEPS = [
  "Driver found",
  "Bought at Lowe's",
  "Delivered",
  "You pay",
];
