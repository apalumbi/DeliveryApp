import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/tokens";

export const statusDot = cva("size-2 shrink-0 rounded-full", {
  variants: {
    tone: {
      neutral: "bg-neutral",
      info: "bg-info",
      success: "bg-success",
      warning: "bg-warning",
      danger: "bg-danger",
    } satisfies Record<Tone, string>,
  },
  defaultVariants: { tone: "neutral" },
});

type StatusDotProps = ComponentProps<"span"> & VariantProps<typeof statusDot>;

export function StatusDot({ className, tone, ...props }: StatusDotProps) {
  return (
    <span aria-hidden className={cn(statusDot({ tone }), className)} {...props} />
  );
}
