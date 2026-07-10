import type { ComponentProps } from "react";
import { cn } from "@noema/ui";

/** Carte blanche flottante — la brique de mise en page du site. */
export function SoftCard({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("rounded-3xl bg-white p-6 shadow-soft sm:p-8", className)} {...props} />
  );
}
