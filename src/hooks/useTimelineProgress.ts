import { create } from "zustand";

interface TimelineState {
  progress: number;
  setProgress: (p: number) => void;
  activeEraId: string | null;
  setActiveEraId: (id: string | null) => void;
}

export const useTimelineProgress = create<TimelineState>((set) => ({
  progress: 0,
  setProgress: (progress) => set({ progress }),
  activeEraId: "silent",
  setActiveEraId: (id) => set({ activeEraId: id }),
}));
