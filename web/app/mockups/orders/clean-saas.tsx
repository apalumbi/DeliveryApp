import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chevron, CopyIcon } from "@/components/ui/icons";
import { List, ListItem } from "@/components/ui/list";
import { StatusDot } from "@/components/ui/status-dot";
import {
  orderStatusLabel,
  orderStatusTone,
  type OrderStatus,
} from "@/lib/tokens";

import { ALIAS } from "./shared";

/** Demo data keyed by domain status — see docs/architecture/04-order-lifecycle.md. */
const SAAS_ORDERS: {
  id: string;
  status: OrderStatus;
  total: string;
  retailer: string;
  date: string;
}[] = [
  {
    id: "#1042",
    status: "delivered",
    total: "$482.80",
    retailer: "Home Depot",
    date: "Sep 17",
  },
  {
    id: "#1039",
    status: "awaiting_customer",
    total: "$120.10",
    retailer: "Lowe's",
    date: "Sep 16",
  },
  {
    id: "#1036",
    status: "en_route",
    total: "$212.45",
    retailer: "Home Depot",
    date: "Sep 16",
  },
  {
    id: "#1031",
    status: "paid",
    total: "$87.20",
    retailer: "Lowe's",
    date: "Sep 12",
  },
];

/** The approved direction — Clean SaaS on design tokens. */
export function CleanSaas() {
  return (
    <div className="flex min-h-full flex-col bg-surface font-sans text-ink">
      <header className="flex items-center justify-between px-5 pt-6 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-control bg-accent text-xs font-semibold text-accent-ink">
            A
          </div>
          <span className="text-[15px] font-semibold">Acme Construction</span>
        </div>
        <div className="h-8 w-8 rounded-full bg-sunken ring-1 ring-hairline" />
      </header>

      <section className="px-5">
        <Card tone="muted" className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[13px] font-semibold text-ink">
              Start an order
            </h2>
            <Badge tone="accent" bordered>
              1 min
            </Badge>
          </div>
          <p className="mt-1 text-[12.5px] leading-relaxed text-ink-muted">
            Build a cart at Home Depot or Lowe&apos;s, then share it to this
            address.
          </p>
          <div className="mt-3 flex items-center justify-between gap-2 rounded-field border border-hairline bg-card px-3 py-2.5">
            <span className="truncate font-mono text-[12px] text-ink">
              {ALIAS}
            </span>
            <Button>
              <CopyIcon className="h-3.5 w-3.5" />
              Copy
            </Button>
          </div>
          <button
            type="button"
            className="mt-3 cursor-pointer text-[12.5px] font-medium text-accent"
          >
            How to share your cart →
          </button>
        </Card>
      </section>

      <section className="mt-6 flex-1 px-5">
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="text-[13px] font-semibold text-ink">Your orders</h2>
          <span className="text-[12px] text-ink-faint">4</span>
        </div>
        <List>
          {SAAS_ORDERS.map((o) => (
            <ListItem key={o.id}>
              <StatusDot tone={orderStatusTone[o.status]} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium text-ink">
                    {o.id}
                  </span>
                  <Badge tone={orderStatusTone[o.status]} bordered>
                    {orderStatusLabel[o.status]}
                  </Badge>
                </div>
                <div className="mt-0.5 text-[12px] text-ink-faint">
                  {o.retailer} · {o.date}
                </div>
              </div>
              <span className="text-[13px] font-semibold tabular-nums">
                {o.total}
              </span>
              <Chevron className="h-4 w-4 text-ink-faint/60" />
            </ListItem>
          ))}
        </List>
      </section>
    </div>
  );
}
