import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const heading = cva("font-semibold tracking-tight text-night", {
  variants: {
    level: {
      1: "text-4xl sm:text-5xl",
      2: "text-3xl sm:text-4xl",
      3: "text-2xl",
      4: "text-xl",
    },
  },
  defaultVariants: { level: 2 },
});

export type HeadingProps = ComponentProps<"h2"> & VariantProps<typeof heading>;

export function Heading({ className, level, ...props }: HeadingProps) {
  // eslint-disable-next-line jsx-a11y/heading-has-content -- primitive : contenu fourni par le consommateur
  return <h2 className={cn(heading({ level }), className)} {...props} />;
}

export function Text({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-base leading-relaxed text-night/80", className)} {...props} />;
}

/** Sur-titre (eyebrow) en capitales pour introduire une section. */
export function Eyebrow({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn("text-xs font-semibold uppercase tracking-widest text-accent", className)}
      {...props}
    />
  );
}
