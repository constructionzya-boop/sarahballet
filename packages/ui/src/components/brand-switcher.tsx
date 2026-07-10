import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

export type BrandLink = {
  slug: string;
  name: string;
  href: string;
};

/** Les 5 sites du réseau — présent sur les 7 sites (sentiment de groupe). */
export const NOEMA_BRANDS: readonly BrandLink[] = [
  { slug: "construction", name: "Noéma Construction", href: "https://noema-construction.com" },
  { slug: "etansol", name: "Étansol", href: "https://etansol.com" },
  { slug: "hydralis", name: "Hydralis", href: "https://hydralis.com" },
  { slug: "ventalis", name: "Ventalis", href: "https://ventalis.com" },
  { slug: "saniva", name: "Saniva", href: "https://saniva.com" },
];

export type BrandSwitcherProps = ComponentProps<"nav"> & {
  /** Marque active (slug) — mise en avant. */
  current?: string;
  brands?: readonly BrandLink[];
};

export function BrandSwitcher({
  current,
  brands = NOEMA_BRANDS,
  className,
  ...props
}: BrandSwitcherProps) {
  return (
    <nav aria-label="Réseau Noéma" className={cn("flex flex-wrap gap-1", className)} {...props}>
      {brands.map((brand) => {
        const active = brand.slug === current;
        return (
          <a
            key={brand.slug}
            href={brand.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-md px-2.5 py-1 text-sm font-medium transition-colors",
              active ? "bg-night text-cream" : "text-night/70 hover:bg-night/5 hover:text-night",
            )}
          >
            {brand.name}
          </a>
        );
      })}
    </nav>
  );
}
