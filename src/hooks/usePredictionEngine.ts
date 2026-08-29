import { create } from "zustand";

export type PredictionPhase = 'idle' | 'scanning' | 'converging' | 'revealing' | 'complete';

interface PredictionEngineState {
  phase: PredictionPhase;
  progress: number;
  setPhase: (phase: PredictionPhase) => void;
  setProgress: (progress: number) => void;
}

export const usePredictionEngine = create<PredictionEngineState>((set, get) => ({
  phase: 'idle',
  progress: 0,
  setPhase: (phase) => {
    if (get().phase !== phase) set({ phase });
  },
  setProgress: (progress) => {
    if (Math.abs(get().progress - progress) > 0.001) set({ progress });
  },
}));
