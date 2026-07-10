import { cn } from "@noema/ui";

const RATIO: Record<string, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
};

export type PhotoFrameProps = {
  /** Légende de l'emplacement, ex. « Rendu Box Commerce — façade avant ». */
  label: string;
  ratio?: "16/9" | "4/3" | "1/1";
  /** Remplit le parent (pour les fonds hero) au lieu d'imposer un ratio. */
  fill?: boolean;
  className?: string;
};

/**
 * Emplacement d'image en attente de rendu réel. TOUTES les images du site
 * passent par ce composant : il suffit de remplacer son contenu au fur et à
 * mesure que les rendus arrivent.
 */
export function PhotoFrame({ label, ratio = "4/3", fill = false, className }: PhotoFrameProps) {
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
