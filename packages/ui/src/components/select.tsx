import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-md border border-night/20 bg-white px-3 text-base text-night focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
