import { create } from 'zustand';

interface DNAAnimationState {
  progress: number;
  setProgress: (p: number) => void;
  activeAttributeId: string | null;
  setActiveAttributeId: (id: string | null) => void;
}

export const useDNAAnimation = create<DNAAnimationState>((set, get) => ({
  progress: 0,
  setProgress: (progress) => {
    if (Math.abs(get().progress - progress) > 0.001) set({ progress });
  },
  activeAttributeId: null,
  setActiveAttributeId: (id) => {
    if (get().activeAttributeId !== id) set({ activeAttributeId: id });
  },
}));
