import { create } from 'zustand';
import { MovieNode, movieUniverseData } from '../lib/movieUniverse';

interface ConstellationState {
  progress: number;
  setProgress: (p: number) => void;
  selectedMovieId: string | null;
  setSelectedMovieId: (id: string | null) => void;
  hoveredMovieId: string | null;
  setHoveredMovieId: (id: string | null) => void;
  cameraTarget: [number, number, number] | null;
  setCameraTarget: (target: [number, number, number] | null) => void;
}

export const useConstellationGraph = create<ConstellationState>((set, get) => ({
  progress: 0,
  setProgress: (progress) => {
    if (Math.abs(get().progress - progress) > 0.001) set({ progress });
  },
  selectedMovieId: null,
  setSelectedMovieId: (id) => {
    if (get().selectedMovieId !== id) {
      set({ selectedMovieId: id });
      if (id) {
        const movie = movieUniverseData.find(m => m.id === id);
        if (movie) {
          set({ cameraTarget: movie.coordinates });
        }
      }
    }
  },
  hoveredMovieId: null,
  setHoveredMovieId: (id) => {
    if (get().hoveredMovieId !== id) set({ hoveredMovieId: id });
  },
  cameraTarget: null,
  setCameraTarget: (target) => set({ cameraTarget: target }),
}));
