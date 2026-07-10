import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

/** Conteneur centré avec largeur max et gouttières mobile-first. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)} {...props} />;
}

/** Bloc de section vertical avec espacement standard. */
export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("py-12 sm:py-16", className)} {...props} />;
}
