import { create } from "zustand";

export type PredictionPhase = 'idle' | 'scanning' | 'converging' | 'revealing' | 'complete';

interface PredictionEngineState {
  phase: PredictionPhase;
  progress: number;
  setPhase: (phase: PredictionPhase) => void;
  setProgress: (progress: number) => void;
}

export const usePredictionEngine = create<PredictionEngineState>((set) => ({
  phase: 'idle',
  progress: 0,
  setPhase: (phase) => set({ phase }),
  setProgress: (progress) => set({ progress }),
}));
