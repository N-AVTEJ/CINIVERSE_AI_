import { create } from "zustand";

interface TimelineState {
  progress: number;
  setProgress: (p: number) => void;
  activeEraId: string | null;
  setActiveEraId: (id: string | null) => void;
}

export const useTimelineProgress = create<TimelineState>((set, get) => ({
  progress: 0,
  setProgress: (progress) => {
    if (Math.abs(get().progress - progress) > 0.001) set({ progress });
  },
  activeEraId: "silent",
  setActiveEraId: (id) => {
    if (get().activeEraId !== id) set({ activeEraId: id });
  },
}));
