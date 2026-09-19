import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export type CardTone = "card" | "muted";

export const card = cva("rounded-card border border-hairline shadow-card", {
  variants: {
    tone: {
      card: "bg-card",
      muted: "bg-card-muted",
    } satisfies Record<CardTone, string>,
  },
  defaultVariants: { tone: "card" },
});

type CardProps = ComponentProps<"div"> & VariantProps<typeof card>;

export function Card({ className, tone, ...props }: CardProps) {
  return <div className={cn(card({ tone }), className)} {...props} />;
}
