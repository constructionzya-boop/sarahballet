import { cn } from "@noema/ui";

// Le logo est servi depuis /public/brand/. Pour utiliser les exports définitifs,
// il suffit de remplacer les fichiers SVG — aucun changement de code requis.
const SRC = {
  full: "/brand/logo.svg", // wordmark Night — fonds clairs
  white: "/brand/logo-white.svg", // wordmark blanc — fonds Night
  mark: "/brand/mark.svg", // picto seul (favicon, écrans de chargement)
} as const;

export type LogoProps = {
  variant?: keyof typeof SRC;
  className?: string;
  alt?: string;
};

export function Logo({ variant = "full", className, alt = "Noéma Construction" }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG statique de marque, next/image superflu
    <img src={SRC[variant]} alt={alt} className={cn("block w-auto", className)} />
  );
}
