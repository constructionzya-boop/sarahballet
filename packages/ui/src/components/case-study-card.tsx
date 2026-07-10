import type { ComponentProps } from "react";
import { cn } from "../lib/cn";
import { Badge } from "./badge";

export type CaseStudyCardProps = Omit<ComponentProps<"article">, "title"> & {
  title: string;
  /** Usage / offre (ex. « Box Commerce »). */
  usage: string;
  /** Délai de pose affiché (ex. « Posé en 1 jour »). */
  duration?: string;
  location?: string;
  imageUrl?: string;
  imageAlt?: string;
};

/** Étude de cas normalisée (preuve sociale) — photo, usage, délai, lieu. */
export function CaseStudyCard({
  title,
  usage,
  duration,
  location,
  imageUrl,
  imageAlt,
  className,
  ...props
}: CaseStudyCardProps) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-lg border border-night/10 bg-snow shadow-sm",
        className,
      )}
      {...props}
    >
      <div className="aspect-[4/3] w-full bg-concrete/30">
        {imageUrl ? (
          <img src={imageUrl} alt={imageAlt ?? title} className="size-full object-cover" />
        ) : null}
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">{usage}</Badge>
          {duration ? <Badge tone="dawn">{duration}</Badge> : null}
        </div>
        <h3 className="text-lg font-semibold text-night">{title}</h3>
        {location ? <p className="text-sm text-night/60">{location}</p> : null}
      </div>
    </article>
  );
}
