import type { ComponentProps } from "react";

import { card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** A card-shaped container of divided rows. */
export function List({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      className={cn(
        card(),
        "divide-y divide-hairline-soft overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

/** One row in a List. */
export function ListItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      className={cn("flex items-center gap-3 px-4 py-3", className)}
      {...props}
    />
  );
}
