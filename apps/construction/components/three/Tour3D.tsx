"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { cn } from "@noema/ui";
import { ModuleScene } from "./ModuleScene";
import { bays, BAY, type ModuleConfig } from "../../lib/three/moduleBuilder";
import { getHotspots } from "../../lib/three/hotspots";
import { useTourStore } from "../../lib/three/store";
import { formatFcfa } from "../../lib/pricing";
import { PhotoFrame } from "../PhotoFrame";

type NavExt = Navigator & { deviceMemory?: number };
type Perf = { shadows: boolean; dpr: [number, number]; antialias: boolean };

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

function detectPerf(): Perf {
  const mem = (navigator as NavExt).deviceMemory ?? 4;
  const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
  const mobile = coarse || mem < 4;
  return { shadows: !mobile, dpr: mobile ? [1, 1.5] : [1, 1.75], antialias: mem >= 4 };
}

export type Tour3DProps = {
  config: ModuleConfig;
  priceFcfa?: number;
  className?: string;
};

export function Tour3D({ config, priceFcfa, className }: Tour3DProps) {
  const [ready, setReady] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const [perf, setPerf] = useState<Perf>({ shadows: false, dpr: [1, 1.5], antialias: false });
  const [paused, setPaused] = useState(false);
  const [lost, setLost] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const mode = useTourStore((s) => s.mode);
  const setMode = useTourStore((s) => s.setMode);
  const timeOfDay = useTourStore((s) => s.timeOfDay);
  const toggleTime = useTourStore((s) => s.toggleTime);
  const reset = useTourStore((s) => s.reset);

  useEffect(() => {
    setWebgl(hasWebGL());
    setPerf(detectPerf());
    setReady(true);
  }, []);

  // Pause du rendu si l'onglet est caché ou le canvas hors du viewport.
  useEffect(() => {
    const el = wrapRef.current;
    const update = (visible: boolean) => setPaused(document.hidden || !visible);
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    let io: IntersectionObserver | undefined;
    if (el && "IntersectionObserver" in window) {
      io = new IntersectionObserver(([e]) => update(e?.isIntersecting ?? true), {
        threshold: 0.05,
      });
      io.observe(el);
    }
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      io?.disconnect();
    };
  }, []);

  const size = useMemo(() => {
    const { w, d } = bays(config);
    return { width: w * BAY, depth: d * BAY, height: 3.2 };
  }, [config]);
  const hotspots = useMemo(() => getHotspots(config), [config]);

  const toggleFullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen?.();
  };

  if (ready && !webgl) {
    return (
      <div
        className={cn("grid gap-3 rounded-3xl bg-white p-4 shadow-soft sm:grid-cols-2", className)}
      >
        <PhotoFrame label="Rendu module — vue extérieure" ratio="4/3" />
        <PhotoFrame label="Rendu module — intérieur" ratio="4/3" />
        <p className="text-xs text-night/50 sm:col-span-2">
          Votre appareil ne gère pas la 3D temps réel — voici la galerie photos.
        </p>
      </div>
    );
  }

  const OverlayBtn =
    "pointer-events-auto rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold text-night shadow-soft backdrop-blur transition-colors hover:bg-white";

  return (
    <div>
      <div
        ref={wrapRef}
        className={cn("relative overflow-hidden rounded-3xl bg-night", className)}
        aria-label={`Visite 3D du module ${config.preset}`}
      >
        {lost ? (
          <div className="grid h-full place-items-center p-6 text-center">
            <div>
              <p className="text-sm text-cream/70">La scène 3D a été interrompue.</p>
              <button
                type="button"
                onClick={() => setLost(false)}
                className="mt-3 rounded-full bg-orange px-5 py-2 text-sm font-semibold text-white"
              >
                Relancer la visite
              </button>
            </div>
          </div>
        ) : (
          <Canvas
            className="!absolute inset-0"
            frameloop={paused ? "never" : "always"}
            dpr={perf.dpr}
            shadows={perf.shadows}
            gl={{ antialias: perf.antialias, powerPreference: "high-performance" }}
            camera={{ position: [7, 4.5, 9], fov: 45 }}
            onCreated={({ gl }) => {
              gl.domElement.addEventListener(
                "webglcontextlost",
                (e) => {
                  e.preventDefault();
                  setLost(true);
                },
                { once: true },
              );
            }}
          >
            <ModuleScene config={config} shadows={perf.shadows} />
          </Canvas>
        )}

        {/* Overlay (hors WebGL) */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="pointer-events-auto flex rounded-full bg-white/85 p-0.5 shadow-soft backdrop-blur">
              {(["exterior", "interior"] as const).map((mViz) => (
                <button
                  key={mViz}
                  type="button"
                  onClick={() => setMode(mViz)}
                  aria-pressed={mode === mViz}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                    mode === mViz ? "bg-night text-cream" : "text-night",
                  )}
                >
                  {mViz === "exterior" ? "Extérieur" : "Intérieur"}
                </button>
              ))}
            </div>
            <div className="flex gap-1.5">
              <button type="button" onClick={toggleTime} className={OverlayBtn}>
                {timeOfDay === "day" ? "☀ Jour" : "🌆 Crépuscule"}
              </button>
              <button
                type="button"
                onClick={reset}
                className={OverlayBtn}
                aria-label="Réinitialiser la caméra"
              >
                ⟲
              </button>
              <button
                type="button"
                onClick={toggleFullscreen}
                className={OverlayBtn}
                aria-label="Plein écran"
              >
                ⤢
              </button>
            </div>
          </div>

          <div className="flex items-end justify-between gap-2">
            <span className="pointer-events-auto rounded-full bg-white/85 px-3 py-1.5 text-xs font-medium text-night shadow-soft backdrop-blur tabular-nums">
              {size.width.toFixed(1)} × {size.depth.toFixed(1)} × {size.height.toFixed(1)} m
            </span>
            {priceFcfa != null ? (
              <span className="pointer-events-auto rounded-full bg-orange px-3 py-1.5 text-xs font-bold text-white shadow-soft tabular-nums">
                {formatFcfa(priceFcfa)}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Liste texte des hotspots (SEO + lecteurs d'écran) + aide clavier */}
      <details className="mt-2 rounded-2xl bg-white p-4 text-sm shadow-soft">
        <summary className="cursor-pointer font-semibold text-night">
          Points d&apos;intérêt & commandes
        </summary>
        <ul className="mt-3 flex flex-col gap-2">
          {hotspots.map((h) => (
            <li key={h.id}>
              <span className="font-semibold text-night">{h.title}</span> —{" "}
              <span className="text-night/70">{h.body}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-night/50">
          Commandes : glisser pour tourner, molette/pincer pour zoomer, « Intérieur » pour entrer.
        </p>
      </details>
    </div>
  );
}
