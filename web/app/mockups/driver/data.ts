import { ITEMS, ORDER, PRICE, SITE } from "../orders/detail/data";

/**
 * Driver demo data. The accepted job is order #1039 — the same order the
 * portal and the order page use (`orders/detail/data.ts`), so the two surfaces
 * never drift. Board postings are other orders; only the fields the driver
 * guide promises appear before accept (store, item count, payout, notes).
 */

export const DRIVER = {
  name: "Marcus Webb",
  initials: "MW",
};

export const DISPATCH_PHONE = "(864) 555-0100";

export type Posting = {
  number: string;
  retailer: string;
  store: string;
  address: string;
  hours: string;
  items: number;
  payout: string;
  posted: string;
  note: string;
};

export const POSTINGS: Posting[] = [
  {
    number: "#1048",
    retailer: "Home Depot",
    store: "West Plano",
    address: "3200 Dallas Pkwy, Plano",
    hours: "Open until 10 PM",
    items: 9,
    payout: "$48.00",
    posted: "11 min ago",
    note: "Heavy load — bring a cart",
  },
  {
    number: "#1050",
    retailer: "Lowe's",
    store: "Frisco West",
    address: "4800 Eldorado Pkwy, Frisco",
    hours: "Open until 10 PM",
    items: 5,
    payout: "$36.00",
    posted: "4 min ago",
    note: "Store closes at 9 PM",
  },
];

/** The accepted job: #1039, now in the driver's hands. */
export const JOB = {
  ...ORDER,
  payout: "$32.00",
  hours: "Open until 9 PM",
  storeAddress: "3360 Preston Rd, Frisco",
};

/** Where the job stands — the driver's own transitions, in order. */
export const DONE_STEPS = [
  { label: "Driver assigned", time: "9:12 AM" },
  { label: "At store", time: "9:41 AM" },
];

export const NEXT_STEPS = ["Items purchased", "On the way", "Delivered"];

export { ITEMS, PRICE, SITE };
