import { cn } from "@noema/ui";

const RATIO: Record<string, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
};

export type PhotoFrameProps = {
  /** Légende de l'emplacement, ex. « Rendu Box Commerce — façade avant ». */
  label: string;
  /**
   * Chemin public de l'image (ex. « /renders/box-commerce-3quart-1.webp »).
   * Si absent, le composant reste un placeholder en attente de rendu.
   */
  src?: string;
  ratio?: "16/9" | "4/3" | "1/1";
  /** Remplit le parent (pour les fonds hero) au lieu d'imposer un ratio. */
  fill?: boolean;
  /** Charge l'image en priorité (hero au-dessus de la ligne de flottaison). */
  priority?: boolean;
  /** object-position CSS, ex. « center 40% ». */
  objectPosition?: string;
  className?: string;
};

/**
 * Emplacement d'image du site. Si `src` est fourni, affiche le rendu (recadré
 * en `object-cover`) ; sinon, reste un placeholder discret. Toutes les images
 * du site passent par ce composant : il suffit d'ajouter une `src` au fur et à
 * mesure que les rendus arrivent.
 */
export function PhotoFrame({
  label,
  src,
  ratio = "4/3",
  fill = false,
  priority = false,
  objectPosition,
  className,
}: PhotoFrameProps) {
  if (src) {
    return (
      <div
        role="img"
        aria-label={label}
        className={cn(
          "overflow-hidden rounded-2xl bg-snow",
          fill ? "h-full w-full" : RATIO[ratio],
          className,
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={label}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover"
          style={objectPosition ? { objectPosition } : undefined}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-dashed border-dew bg-snow p-6 text-center",
        fill ? "h-full w-full" : RATIO[ratio],
        className,
      )}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-8 text-dawn/50">
        <path
          fill="currentColor"
          d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2v7.6l3.3-3.3 3 3 4-4L19 15V7H5Zm3.5 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
        />
      </svg>
      <span className="max-w-[80%] text-[11px] font-medium uppercase tracking-widest text-dawn/70">
        {label}
      </span>
    </div>
  );
}
