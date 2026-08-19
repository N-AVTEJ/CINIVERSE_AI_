import { create } from "zustand";

interface PlanetFocusState {
  focusedPlanetId: string | null;
  hoveredPlanetId: string | null;
  setFocusedPlanetId: (id: string | null) => void;
  setHoveredPlanetId: (id: string | null) => void;
}

export const usePlanetFocus = create<PlanetFocusState>((set) => ({
  focusedPlanetId: null,
  hoveredPlanetId: null,
  setFocusedPlanetId: (id) => set({ focusedPlanetId: id }),
  setHoveredPlanetId: (id) => set({ hoveredPlanetId: id }),
}));
