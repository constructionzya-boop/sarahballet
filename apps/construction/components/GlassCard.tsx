import type { ComponentProps } from "react";
import { cn } from "@noema/ui";

/** Carte « verre dépoli » — posée sur un visuel (hero, module vedette). */
export function GlassCard({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/60 bg-white/70 p-5 shadow-soft backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
}
