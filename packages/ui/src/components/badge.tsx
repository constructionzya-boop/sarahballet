import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const badge = cva("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", {
  variants: {
    tone: {
      neutral: "bg-night/8 text-night",
      accent: "bg-accent/12 text-accent",
      dawn: "bg-dawn/12 text-dawn",
      outline: "border border-night/20 text-night",
    },
  },
  defaultVariants: { tone: "neutral" },
});

export type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badge>;

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badge({ tone }), className)} {...props} />;
}
