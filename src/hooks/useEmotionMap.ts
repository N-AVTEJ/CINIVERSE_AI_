import { create } from 'zustand';
import { EMOTION_MAP_MOVIES, EmotionMovieItem } from '../lib/emotionMapData';
import { EMOTION_REGIONS, EmotionRegionData } from '../lib/emotionRegions';

export interface EmotionMapState {
  movies: EmotionMovieItem[];
  regions: EmotionRegionData[];
  selectedMovieId: string | null;
  hoveredMovieId: string | null;
  selectedRegionId: string | null;
  hoveredRegionId: string | null;
  
  // Transformation state (1 to 7)
  isTransforming: boolean;
  transformStep: number; // 0 (inactive), 1..7
  focalMovieId: string | null;

  // Scroll & view state
  scrollProgress: number; // 0.0 to 1.0
  isReducedMotion: boolean;

  // Actions
  setSelectedMovie: (id: string | null) => void;
  setHoveredMovie: (id: string | null) => void;
  setSelectedRegion: (id: string | null) => void;
  setHoveredRegion: (id: string | null) => void;
  setScrollProgress: (progress: number) => void;
  setTransformState: (isTransforming: boolean, step: number, focalId?: string | null) => void;
  setReducedMotion: (reduced: boolean) => void;
  resetSelection: () => void;
}

export const useEmotionMap = create<EmotionMapState>((set, get) => ({
  movies: EMOTION_MAP_MOVIES,
  regions: EMOTION_REGIONS,
  selectedMovieId: null,
  hoveredMovieId: null,
  selectedRegionId: null,
  hoveredRegionId: null,
  isTransforming: false,
  transformStep: 0,
  focalMovieId: null,
  scrollProgress: 0,
  isReducedMotion: false,

  setSelectedMovie: (id) => {
    if (get().selectedMovieId !== id) {
      set({ selectedMovieId: id });
    }
  },

  setHoveredMovie: (id) => {
    if (get().hoveredMovieId !== id) {
      set({ hoveredMovieId: id });
    }
  },

  setSelectedRegion: (id) => {
    if (get().selectedRegionId !== id) {
      set({ selectedRegionId: id });
    }
  },

  setHoveredRegion: (id) => {
    if (get().hoveredRegionId !== id) {
      set({ hoveredRegionId: id });
    }
  },

  setScrollProgress: (progress) => {
    const current = get().scrollProgress;
    if (Math.abs(current - progress) > 0.005) {
      set({ scrollProgress: progress });
    }
  },

  setTransformState: (isTransforming, step, focalId = null) => {
    set({ isTransforming, transformStep: step, focalMovieId: focalId ?? get().focalMovieId });
  },

  setReducedMotion: (reduced) => set({ isReducedMotion: reduced }),

  resetSelection: () =>
    set({
      selectedMovieId: null,
      selectedRegionId: null,
      isTransforming: false,
      transformStep: 0,
      focalMovieId: null,
    }),
}));
