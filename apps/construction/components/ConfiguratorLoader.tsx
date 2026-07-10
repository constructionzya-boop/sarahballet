"use client";

import dynamic from "next/dynamic";
import { Logo } from "./Logo";

// Le configurateur est chargé dynamiquement (îlot client) pour ne pas alourdir
// le reste du site, qui reste statique.
const Configurator = dynamic(() => import("./Configurator").then((m) => m.Configurator), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center gap-4 rounded-3xl bg-white p-10 text-center shadow-soft">
      <Logo variant="mark" alt="" className="h-12 motion-safe:animate-pulse" />
      <p className="text-sm text-night/50">Chargement du configurateur…</p>
    </div>
  ),
});

export function ConfiguratorLoader() {
  return <Configurator />;
}
