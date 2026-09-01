import { create } from "zustand";

interface EraTransitionState {
  isTransitioning: boolean;
  transitionType: string;
  triggerTransition: (type: string) => void;
  endTransition: () => void;
}

export const useEraTransition = create<EraTransitionState>((set, get) => ({
  isTransitioning: false,
  transitionType: 'dissolve',
  triggerTransition: (type) => {
    if (!get().isTransitioning || get().transitionType !== type) {
      set({ isTransitioning: true, transitionType: type });
    }
  },
  endTransition: () => {
    if (get().isTransitioning) {
      set({ isTransitioning: false });
    }
  }
}));

