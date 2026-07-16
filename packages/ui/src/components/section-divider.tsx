/*
 * SectionDivider — séparateur SVG plein-largeur entre deux sections de couleurs
 * différentes. Aucune image : un simple <svg preserveAspectRatio="none"> étiré.
 * Le fond du séparateur prend la couleur `from` (section du dessus) et la forme
 * est remplie de `to` (section du dessous), révélant la transition.
 *
 * Usage sobre : 2-3 par page maximum, aux transitions fortes.
 */

import { cn } from "../lib/cn";

export type DividerVariant =
  | "wave"
  | "curve"
  | "tilt"
  | "tilt-opacity"
  | "drops"
  | "zigzag"
  | "clouds"
  | "mountains";

/** Nom de token de la charte → variable CSS de couleur. */
export type ColorToken = "night" | "dawn" | "dew" | "cream" | "sand" | "snow" | "white" | "orange";

const W = 1440;
const H = 120;

function bumps(count: number, kind: "arc" | "cloud"): string {
  const step = W / count;
  let d = `M0,${H}`;
  for (let i = 0; i < count; i++) {
    const x0 = i * step;
    const mid = x0 + step / 2;
    const x1 = x0 + step;
    if (kind === "arc") {
      // Gouttes suspendues : demi-cercles vers le bas.
      d += ` L${x0},20 Q${mid},${H} ${x1},20`;
    } else {
      // Nuages : bosses arrondies vers le haut.
      d += ` L${x0},80 C${x0 + step * 0.2},20 ${x1 - step * 0.2},20 ${x1},80`;
    }
  }
  d += ` L${W},${H} Z`;
  return d;
}

function zigzag(count: number): string {
  const step = W / count;
  let d = `M0,0`;
  for (let i = 0; i < count; i++) {
    const peak = i * step + step / 2;
    const valley = (i + 1) * step;
    d += ` L${peak},${H} L${valley},0`;
  }
  d += ` L${W},${H} L0,${H} Z`;
  return d;
}

const PATHS: Record<DividerVariant, string> = {
  wave: `M0,48 C320,128 700,-24 1024,40 C1240,84 1360,72 ${W},44 L${W},${H} L0,${H} Z`,
  curve: `M0,8 C480,128 960,128 ${W},8 L${W},${H} L0,${H} Z`,
  tilt: `M0,${H} L${W},8 L${W},${H} Z`,
  "tilt-opacity": `M0,${H} L${W},24 L${W},${H} Z`,
  drops: bumps(9, "arc"),
  zigzag: zigzag(9),
  clouds: bumps(6, "cloud"),
  mountains: `M0,${H} L240,26 L480,92 L720,14 L960,84 L1200,30 L${W},100 L${W},${H} L0,${H} Z`,
};

// Couche arrière translucide (variante tilt-opacity) : un second plan décalé.
const TILT_BACK = `M0,${H} L${W},60 L${W},${H} Z`;

export type SectionDividerProps = {
  variant?: DividerVariant;
  /** Couleur du dessus (fond du séparateur). */
  from?: ColorToken;
  /** Couleur du dessous (remplissage de la forme). */
  to?: ColorToken;
  /** Retourne verticalement la forme (transition montante). */
  flip?: boolean;
  /** Hauteur du séparateur en px (desktop). */
  height?: number;
  className?: string;
};

export function SectionDivider({
  variant = "wave",
  from = "snow",
  to = "night",
  flip = false,
  height = 90,
  className,
}: SectionDividerProps) {
  const fromVar = `var(--color-${from})`;
  const toVar = `var(--color-${to})`;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none w-full overflow-hidden leading-[0]", className)}
      style={{ backgroundColor: fromVar }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="block w-full"
        style={{ height, transform: flip ? "scaleY(-1)" : undefined }}
      >
        {variant === "tilt-opacity" ? (
          <path d={TILT_BACK} fill={toVar} opacity={0.4} />
        ) : null}
        <path d={PATHS[variant]} fill={toVar} />
      </svg>
    </div>
  );
}
