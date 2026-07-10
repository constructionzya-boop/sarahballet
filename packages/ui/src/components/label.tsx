import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

export function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control -- primitive : le consommateur associe via htmlFor
    <label className={cn("mb-1.5 block text-sm font-medium text-night", className)} {...props} />
  );
}
