"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { cn } from "@noema/ui";
import type { ModuleConfig } from "../../lib/three/moduleBuilder";
import { PhotoFrame } from "../PhotoFrame";

type NavExt = Navigator & { connection?: { saveData?: boolean } };

const Tour3D = dynamic(() => import("./Tour3D").then((m) => m.Tour3D), {
  ssr: false,
  loading: () => (
    <div className="grid h-full min-h-[420px] place-items-center rounded-3xl bg-night">
      <p className="text-sm text-cream/70">Chargement de la scène 3D…</p>
    </div>
  ),
});

export type Tour3DPosterProps = {
  config: ModuleConfig;
  priceFcfa?: number;
  label?: string;
  className?: string;
};

/**
 * Affiche un poster léger ; la scène WebGL n'est montée qu'au clic (chunk 3D
 * chargé à la demande) → aucun impact sur le LCP de la page.
 */
export function Tour3DPoster({ config, priceFcfa, label, className }: Tour3DPosterProps) {
  const [started, setStarted] = useState(false);
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    setSaveData(Boolean((navigator as NavExt).connection?.saveData));
  }, []);

  if (started) return <Tour3D config={config} priceFcfa={priceFcfa} className={className} />;

  return (
    <div className={cn("relative overflow-hidden rounded-3xl", className)}>
      <PhotoFrame
        fill
        label={label ?? "Aperçu 3D du module"}
        className="absolute inset-0 rounded-3xl border-0"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-night/40 p-6 text-center backdrop-blur-[1px]">
        {saveData ? (
          <p className="max-w-xs text-sm font-medium text-white">
            Économiseur de données actif — visite 3D désactivée. Consultez la galerie photos.
          </p>
        ) : (
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white shadow-soft transition-[filter] hover:brightness-110 active:scale-95"
          >
            ▶ Démarrer la visite 3D
            <span className="text-white/70">~2 Mo</span>
          </button>
        )}
      </div>
    </div>
  );
}
