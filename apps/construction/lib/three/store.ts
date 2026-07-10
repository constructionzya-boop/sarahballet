// Store léger de l'état de VUE 3D (mode caméra, ambiance, hotspot actif).
// La configuration du module (preset/travées/…) transite par props depuis le
// configurateur — les types de lib/pricing restent la source unique.

import { create } from "zustand";

export type TourMode = "exterior" | "interior";
export type TimeOfDay = "day" | "sunset";

type TourState = {
  mode: TourMode;
  timeOfDay: TimeOfDay;
  interacted: boolean;
  activeHotspot: string | null;
  setMode: (m: TourMode) => void;
  toggleTime: () => void;
  setInteracted: () => void;
  setActiveHotspot: (id: string | null) => void;
  reset: () => void;
};

export const useTourStore = create<TourState>((set) => ({
  mode: "exterior",
  timeOfDay: "day",
  interacted: false,
  activeHotspot: null,
  setMode: (mode) => set({ mode }),
  toggleTime: () => set((s) => ({ timeOfDay: s.timeOfDay === "day" ? "sunset" : "day" })),
  setInteracted: () => set({ interacted: true }),
  setActiveHotspot: (activeHotspot) => set({ activeHotspot }),
  reset: () => set({ mode: "exterior", interacted: false, activeHotspot: null }),
}));
