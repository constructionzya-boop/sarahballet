import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const alert = cva("rounded-md border px-4 py-3 text-sm", {
  variants: {
    tone: {
      info: "border-dawn/30 bg-dew/30 text-night",
      warning: "border-accent/30 bg-accent/8 text-night",
    },
  },
  defaultVariants: { tone: "info" },
});

export type AlertProps = ComponentProps<"div"> & VariantProps<typeof alert>;

/** Encart de message — utilisé notamment pour la mention « hypothèse V1 ». */
export function Alert({ className, tone, ...props }: AlertProps) {
  return <div role="note" className={cn(alert({ tone }), className)} {...props} />;
}
