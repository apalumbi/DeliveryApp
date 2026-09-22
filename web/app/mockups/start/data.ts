export const COMPANY = "Acme Construction";

export const SUPPORT_PHONE = "(864) 555-0147";

export type Site = { label: string; address: string };

export const SITES: Site[] = [
  { label: "Oakwood Phase 2", address: "421 Commerce Rd, Bldg 3" },
  { label: "Warehouse", address: "12 Industrial Way" },
];

export type RetailerId = "homedepot" | "lowes";

export type Store = {
  name: string;
  distance: number;
  hours: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  number: string;
  /** Verified when the store list is seeded. Missing → the button falls back to the homepage. */
  storeUrl?: string;
};

export type Retailer = {
  id: RetailerId;
  name: string;
  homeUrl: string;
  /** The button on the retailer's store page that makes it their store. */
  storeAction: string;
  /** Nearest first — the recommendation is simply stores[0]. */
  stores: Store[];
};

export const RETAILERS: Retailer[] = [
  {
    id: "homedepot",
    name: "Home Depot",
    homeUrl: "https://www.homedepot.com",
    storeAction: "Shop This Store",
    stores: [
      {
        name: "The Home Depot · North Frisco",
        distance: 2.4,
        hours: "Open until 10 PM",
        street: "5995 Eldorado Pkwy",
        city: "Frisco",
        state: "TX",
        zip: "75033",
        number: "6513",
        storeUrl:
          "https://www.homedepot.com/l/North-Frisco/TX/Frisco/75033/6513",
      },
      {
        name: "The Home Depot · West Plano",
        distance: 5.1,
        hours: "Open until 10 PM",
        street: "3200 Dallas Pkwy",
        city: "Plano",
        state: "TX",
        zip: "75093",
        number: "3602",
      },
      {
        name: "The Home Depot · McKinney",
        distance: 8.4,
        hours: "Open until 9 PM",
        street: "1701 N Central Expy",
        city: "McKinney",
        state: "TX",
        zip: "75070",
        number: "4105",
      },
    ],
  },
  {
    id: "lowes",
    name: "Lowe's",
    homeUrl: "https://www.lowes.com",
    storeAction: "Set as My Store",
    stores: [
      {
        name: "Lowe's · North Frisco",
        distance: 1.8,
        hours: "Open until 9 PM",
        street: "3360 Preston Rd",
        city: "Frisco",
        state: "TX",
        zip: "75034",
        number: "1059",
        storeUrl: "https://www.lowes.com/store/TX-Frisco/1059",
      },
      {
        name: "Lowe's · Frisco West",
        distance: 3.6,
        hours: "Open until 10 PM",
        street: "4800 Eldorado Pkwy",
        city: "Frisco",
        state: "TX",
        zip: "75033",
        number: "2694",
      },
      {
        name: "Lowe's · McKinney",
        distance: 7.2,
        hours: "Open until 9 PM",
        street: "2200 N Central Expy",
        city: "McKinney",
        state: "TX",
        zip: "75071",
        number: "0672",
      },
    ],
  },
];

/** Where the "Open …" button goes: the store page when the store has one, else the homepage. */
export function storeLink(retailer: Retailer, store: Store) {
  return store.storeUrl ?? retailer.homeUrl;
}
