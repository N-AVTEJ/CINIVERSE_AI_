import { create } from "zustand";

interface DirectorWorldState {
  activeDirectorId: string | null;
  isInsideWorld: boolean;
  cameraTransitionProgress: number; // 0 to 1
  enterWorld: (id: string) => void;
  leaveWorld: () => void;
  updateTransition: (progress: number) => void;
}

export const useDirectorWorld = create<DirectorWorldState>((set) => ({
  activeDirectorId: null,
  isInsideWorld: false,
  cameraTransitionProgress: 0,
  
  enterWorld: (id) => {
    set({ activeDirectorId: id, cameraTransitionProgress: 0 });
    // Simulate camera fly-in over time in the hook, or let the component do it.
    // The component will drive updateTransition.
  },
  leaveWorld: () => set({ activeDirectorId: null, isInsideWorld: false, cameraTransitionProgress: 0 }),
  updateTransition: (progress) => {
    set({ cameraTransitionProgress: progress });
    if (progress >= 1) {
      set({ isInsideWorld: true });
    }
  }
}));
