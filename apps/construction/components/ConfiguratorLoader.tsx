"use client";

import dynamic from "next/dynamic";

// Le configurateur est chargé dynamiquement (îlot client) pour ne pas alourdir
// le reste du site, qui reste statique.
const Configurator = dynamic(() => import("./Configurator").then((m) => m.Configurator), {
  ssr: false,
  loading: () => (
    <div className="rounded-3xl bg-white p-10 text-center text-sm text-night/50 shadow-soft">
      Chargement du configurateur…
    </div>
  ),
});

export function ConfiguratorLoader() {
  return <Configurator />;
}
