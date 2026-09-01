import { create } from "zustand";

interface DirectorWorldState {
  activeDirectorId: string | null;
  isInsideWorld: boolean;
  enterWorld: (id: string) => void;
  leaveWorld: () => void;
  completeTransition: () => void;
}

export const useDirectorWorld = create<DirectorWorldState>((set, get) => ({
  activeDirectorId: null,
  isInsideWorld: false,
  
  enterWorld: (id) => {
    if (get().activeDirectorId !== id || get().isInsideWorld) {
      set({ activeDirectorId: id, isInsideWorld: false });
    }
  },
  leaveWorld: () => {
    if (get().activeDirectorId !== null || get().isInsideWorld) {
      set({ activeDirectorId: null, isInsideWorld: false });
    }
  },
  completeTransition: () => {
    if (!get().isInsideWorld) {
      set({ isInsideWorld: true });
    }
  }
}));

