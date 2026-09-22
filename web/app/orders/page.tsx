import type { Metadata } from "next";
import type { ReactNode } from "react";
import { connection } from "next/server";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, TBody, Td, Th, THead, Tr } from "@/components/ui/table";
import {
  createServerClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import {
  orderStatusLabel,
  orderStatusTone,
  type OrderStatus,
} from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Orders",
};

type Retailer = "homedepot" | "lowes";

type OrderRow = {
  id: string;
  order_number: string;
  status: OrderStatus;
  retailer: Retailer;
  total_cents: number;
  created_at: string;
  companies: { name: string } | null;
};

const RETAILER_LABEL: Record<Retailer, string> = {
  homedepot: "Home Depot",
  lowes: "Lowe's",
};

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const shortDate = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

function Shell({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <h1 className="text-[15px] font-medium text-ink">Orders</h1>
      <p className="mt-1 text-[13px] text-ink-muted">
        Read from the <code>orders</code> table on the publishable key, so RLS
        decides what appears here.
      </p>
      {children}
    </main>
  );
}

function Notice({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className="mt-6 p-6">
      <h2 className="text-[13px] font-medium text-ink">{title}</h2>
      <div className="mt-2 text-[13px] leading-6 text-ink-muted">
        {children}
      </div>
    </Card>
  );
}

export default async function OrdersPage() {
  // Next 16: stop prerendering here so the query runs per request. The older
  // `export const dynamic = "force-dynamic"` is deprecated. This sits above the
  // configuration check on purpose — otherwise the route's rendering mode would
  // depend on whether the environment happened to be populated at build time,
  // and a build without it would bake the notice in permanently.
  await connection();

  if (!isSupabaseConfigured()) {
    return (
      <Shell>
        <Notice title="Supabase is not configured">
          Copy <code>web/.env.example</code> to <code>web/.env.local</code> and
          fill in <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code>.
        </Notice>
      </Shell>
    );
  }

  const { data, error } = await createServerClient()
    .from("orders")
    .select(
      "id, order_number, status, retailer, total_cents, created_at, companies (name)",
    )
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return (
      <Shell>
        <Notice title="Could not read orders">{error.message}</Notice>
      </Shell>
    );
  }

  // supabase-js infers an array for an embedded relation when there is no
  // generated Database type, but orders.company_id -> companies.id is
  // many-to-one, so PostgREST returns a single object. Assert the real shape
  // through `unknown`; this cast goes away once the schema types are generated.
  const orders = (data ?? []) as unknown as OrderRow[];

  if (orders.length === 0) {
    return (
      <Shell>
        <Notice title="No orders visible">
          <p>
            The query succeeded but returned no rows. Every policy on{" "}
            <code>orders</code> keys off <code>auth.uid()</code>, so with nobody
            signed in this client sees nothing. That is RLS working, not a bug.
          </p>
          <p className="mt-2">
            To see rows without a session, read through the secret-key client in{" "}
            <code>lib/supabase/admin.ts</code> — but that bypasses RLS, so it
            needs a guard.
          </p>
        </Notice>
      </Shell>
    );
  }

  return (
    <Shell>
      <Card className="mt-6 overflow-hidden">
        <Table>
          <THead>
            <Tr>
              <Th>Order</Th>
              <Th>Customer</Th>
              <Th>Retailer</Th>
              <Th>Status</Th>
              <Th className="text-right">Total</Th>
              <Th className="text-right">Placed</Th>
            </Tr>
          </THead>
          <TBody>
            {orders.map((order) => (
              <Tr key={order.id}>
                <Td className="font-medium tabular-nums">
                  {order.order_number}
                </Td>
                <Td className="text-ink-muted">
                  {order.companies?.name ?? "—"}
                </Td>
                <Td className="text-ink-muted">
                  {RETAILER_LABEL[order.retailer]}
                </Td>
                <Td>
                  <Badge tone={orderStatusTone[order.status]}>
                    {orderStatusLabel[order.status]}
                  </Badge>
                </Td>
                <Td className="text-right tabular-nums">
                  {money.format(order.total_cents / 100)}
                </Td>
                <Td className="text-right text-ink-muted tabular-nums">
                  {shortDate.format(new Date(order.created_at))}
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </Card>
    </Shell>
  );
}
