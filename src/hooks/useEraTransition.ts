import { create } from "zustand";

interface EraTransitionState {
  isTransitioning: boolean;
  transitionProgress: number;
  transitionType: string;
  triggerTransition: (type: string) => void;
  updateProgress: (delta: number) => void;
}

export const useEraTransition = create<EraTransitionState>((set, get) => ({
  isTransitioning: false,
  transitionProgress: 0,
  transitionType: 'dissolve',
  triggerTransition: (type) => set({ isTransitioning: true, transitionProgress: 1, transitionType: type }),
  updateProgress: (delta) => {
    const { isTransitioning, transitionProgress } = get();
    if (isTransitioning) {
      const newProgress = Math.max(0, transitionProgress - delta * 1.5);
      set({ transitionProgress: newProgress, isTransitioning: newProgress > 0 });
    }
  }
}));
