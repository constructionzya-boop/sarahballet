import type { Metadata } from "next";
import { VisiteTour } from "../../components/three/VisiteTour";
import { type ProjectId } from "../../lib/pricing";

export const metadata: Metadata = {
  title: "Visite 3D — Noéma Construction",
  description: "Explorez les modules en 3D interactive : tournez, entrez, mesurez.",
};

const PRESETS: ProjectId[] = ["commerce", "studio", "local-pro"];

export default async function VisitePage({
  searchParams,
}: {
  searchParams: Promise<{ preset?: string; travees?: string }>;
}) {
  const sp = await searchParams;
  const preset = PRESETS.includes(sp.preset as ProjectId) ? (sp.preset as ProjectId) : "commerce";
  // `travees` = profondeur totale en travées (base 4) → extra 0-2.
  const total = Number(sp.travees);
  const extra = Number.isFinite(total) ? Math.max(0, Math.min(2, total - 4)) : 0;

  return (
    <main className="px-3 py-6 sm:px-4">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header>
          <p className="text-xs font-semibold uppercase tracking-widest text-dawn">Visite 3D</p>
          <h1 className="mt-1 text-4xl font-black tracking-tight text-night sm:text-5xl">
            Explorez le module en 3D
          </h1>
          <p className="mt-2 max-w-2xl text-night/60">
            Tournez autour, entrez à l&apos;intérieur, découvrez le Toit Parasol et la trame de 1,20
            m. Chaque preset se met à jour en temps réel.
          </p>
        </header>
        <VisiteTour initialPreset={preset} initialTravees={extra} />
      </div>
    </main>
  );
}
