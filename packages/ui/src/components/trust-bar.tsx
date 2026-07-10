import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

export type TrustItem = {
  label: string;
  /** Détail optionnel (ex. « Essais LBTP »). */
  detail?: string;
};

export type TrustBarProps = ComponentProps<"ul"> & {
  items: readonly TrustItem[];
};

/** Bandeau de réassurance : agréments, laboratoire (LBTP), assurances. */
export function TrustBar({ items, className, ...props }: TrustBarProps) {
  return (
    <ul
      className={cn("flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-night/70", className)}
      {...props}
    >
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          <span className="font-medium text-night">{item.label}</span>
          {item.detail ? <span className="text-night/50">— {item.detail}</span> : null}
        </li>
      ))}
    </ul>
  );
}
