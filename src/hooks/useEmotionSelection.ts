import { create } from 'zustand';
import { EmotionEngineStep } from '../lib/emotionTimeline';

interface EmotionSelectionState {
  selectedEmotionIds: string[];
  activeStep: EmotionEngineStep;
  hoveredEmotionId: string | null;
  focusedMovieId: string | null;
  multiEmotionMode: boolean;
  
  // Actions
  toggleEmotion: (id: string) => void;
  selectSingleEmotion: (id: string) => void;
  clearEmotions: () => void;
  setHoveredEmotion: (id: string | null) => void;
  setActiveStep: (step: EmotionEngineStep) => void;
  setFocusedMovieId: (id: string | null) => void;
  setMultiEmotionMode: (enabled: boolean) => void;
  resetEngine: () => void;
}

export const useEmotionSelection = create<EmotionSelectionState>((set) => ({
  selectedEmotionIds: ['wonder'], // Default pre-selected for instant beauty
  activeStep: 'INTRO',
  hoveredEmotionId: null,
  focusedMovieId: null,
  multiEmotionMode: true,

  toggleEmotion: (id) =>
    set((state) => {
      const exists = state.selectedEmotionIds.includes(id);
      let updated: string[];
      if (exists) {
        // Keep at least 1 emotion or allow empty
        updated = state.selectedEmotionIds.filter((eId) => eId !== id);
      } else {
        // In multi-mode allow up to 4, or single mode replace
        if (!state.multiEmotionMode) {
          updated = [id];
        } else {
          updated = state.selectedEmotionIds.length >= 4 
            ? [...state.selectedEmotionIds.slice(1), id] 
            : [...state.selectedEmotionIds, id];
        }
      }
      return { selectedEmotionIds: updated };
    }),

  selectSingleEmotion: (id) =>
    set({
      selectedEmotionIds: [id],
    }),

  clearEmotions: () => set({ selectedEmotionIds: [] }),

  setHoveredEmotion: (id) =>
    set((state) => (state.hoveredEmotionId === id ? state : { hoveredEmotionId: id })),

  setActiveStep: (step) =>
    set((state) => (state.activeStep === step ? state : { activeStep: step })),

  setFocusedMovieId: (id) =>
    set((state) => (state.focusedMovieId === id ? state : { focusedMovieId: id })),

  setMultiEmotionMode: (enabled) =>
    set((state) => (state.multiEmotionMode === enabled ? state : { multiEmotionMode: enabled })),

  resetEngine: () =>
    set({
      selectedEmotionIds: ['wonder'],
      activeStep: 'SELECTING',
      hoveredEmotionId: null,
      focusedMovieId: null,
    }),
}));
