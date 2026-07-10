"use client";

import { useEffect, useMemo } from "react";
import { OrbitControls, ContactShadows, Html } from "@react-three/drei";
import { buildModule, type ModuleConfig } from "../../lib/three/moduleBuilder";
import { getHotspots } from "../../lib/three/hotspots";
import { useTourStore } from "../../lib/three/store";

const DEG = Math.PI / 180;

function configHash(c: ModuleConfig): string {
  return `${c.preset}|${c.extraTravees}|${c.level}|${c.base}|${[...c.options].sort().join(",")}`;
}

export function ModuleScene({ config, shadows }: { config: ModuleConfig; shadows: boolean }) {
  const hash = configHash(config);
  // Rebuild live à chaque changement de config ; dispose de l'ancien module.
  const built = useMemo(() => buildModule(config), [hash]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => built.dispose(), [built]);

  const hotspots = useMemo(() => getHotspots(config), [hash]); // eslint-disable-line react-hooks/exhaustive-deps

  const mode = useTourStore((s) => s.mode);
  const timeOfDay = useTourStore((s) => s.timeOfDay);
  const interacted = useTourStore((s) => s.interacted);
  const activeHotspot = useTourStore((s) => s.activeHotspot);
  const setInteracted = useTourStore((s) => s.setInteracted);
  const setActiveHotspot = useTourStore((s) => s.setActiveHotspot);

  const day = timeOfDay === "day";
  const target: [number, number, number] = mode === "interior" ? [0, 1.5, 0] : [0, 1.3, 0];

  return (
    <>
      <color attach="background" args={[day ? "#dfeaf2" : "#2a2036"]} />
      <hemisphereLight intensity={0.5} color="#ffffff" groundColor="#b0552e" />
      <ambientLight intensity={day ? 0.35 : 0.25} />
      <directionalLight
        position={day ? [6, 10, 4] : [-8, 4, -2]}
        intensity={day ? 1.5 : 1.1}
        color={day ? "#fff5e6" : "#ff9d6b"}
        castShadow={shadows}
        shadow-mapSize={[1024, 1024]}
      />

      <primitive object={built.group} />

      {/* Sol latérite */}
      <mesh rotation-x={-Math.PI / 2} position-y={-0.02} receiveShadow>
        <circleGeometry args={[14, 48]} />
        <meshStandardMaterial color="#a9673f" roughness={1} />
      </mesh>
      <ContactShadows position={[0, 0.02, 0]} scale={16} blur={2.6} opacity={0.5} far={6} />

      {hotspots.map((h) => (
        <Html key={h.id} position={h.position} center distanceFactor={9} zIndexRange={[20, 0]}>
          <div className="relative">
            <button
              type="button"
              aria-label={h.title}
              onClick={() => setActiveHotspot(activeHotspot === h.id ? null : h.id)}
              className="grid size-5 place-items-center rounded-full bg-orange text-white shadow-soft motion-safe:animate-pulse"
            >
              <span className="size-1.5 rounded-full bg-white" />
            </button>
            {activeHotspot === h.id ? (
              <div className="absolute left-6 top-0 w-56 rounded-2xl border border-white/60 bg-white/80 p-3 text-left shadow-soft backdrop-blur-xl">
                <p className="text-sm font-bold text-night">{h.title}</p>
                <p className="mt-1 text-xs text-night/70">{h.body}</p>
                <a href={h.href} className="mt-2 inline-block text-xs font-semibold text-dawn">
                  En savoir plus →
                </a>
              </div>
            ) : null}
          </div>
        </Html>
      ))}

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.1}
        autoRotate={!interacted && mode === "exterior"}
        autoRotateSpeed={0.5}
        minDistance={mode === "interior" ? 0.5 : 4}
        maxDistance={18}
        maxPolarAngle={85 * DEG}
        target={target}
        onStart={setInteracted}
      />
    </>
  );
}
