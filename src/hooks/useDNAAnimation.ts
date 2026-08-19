import { create } from 'zustand';

interface DNAAnimationState {
  progress: number;
  setProgress: (p: number) => void;
  activeAttributeId: string | null;
  setActiveAttributeId: (id: string | null) => void;
}

export const useDNAAnimation = create<DNAAnimationState>((set) => ({
  progress: 0,
  setProgress: (progress) => set({ progress }),
  activeAttributeId: null,
  setActiveAttributeId: (id) => set({ activeAttributeId: id }),
}));
