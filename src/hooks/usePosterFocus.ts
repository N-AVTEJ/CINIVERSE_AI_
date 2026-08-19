import { create } from "zustand";

interface FocusState {
  focusedPosterId: string | null;
  setFocusedPosterId: (id: string | null) => void;
}

export const usePosterFocus = create<FocusState>((set) => ({
  focusedPosterId: null,
  setFocusedPosterId: (id) => set({ focusedPosterId: id }),
}));
