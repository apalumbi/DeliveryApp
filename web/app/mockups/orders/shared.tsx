export const ALIAS = "acme@orders.example.com";

export type Order = {
  id: string;
  status: string;
  total: string;
  retailer: string;
  date: string;
};

export const ORDERS: Order[] = [
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
