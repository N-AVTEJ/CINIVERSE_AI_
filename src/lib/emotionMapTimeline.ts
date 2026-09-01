export interface EmotionMapPhaseProgress {
  openingOpacity: number;
  openingTextPhase: 1 | 2; // 1: "Cinema isn't organized by genre." 2: "It's organized by feeling."
  landscapeOpacity: number;
  regionFormProgress: number; // 0 to 1
  moviesPopulateProgress: number; // 0 to 1
  connectionsActiveProgress: number; // 0 to 1
  aiFocusProgress: number; // 0 to 1
  phase17TransitionProgress: number; // 0 to 1
}

export function calculateTimelinePhase(scrollProgress: number): EmotionMapPhaseProgress {
  // scrollProgress is 0.0 to 1.0 within the EmotionMap section

  // 0 - 0.20: Opening text & initial landscape reveal
  const openingOpacity = Math.max(0, 1 - Math.max(0, (scrollProgress - 0.15) / 0.1));
  const openingTextPhase = scrollProgress < 0.08 ? 1 : 2;
  const landscapeOpacity = Math.min(1, Math.max(0, scrollProgress / 0.12));

  // 0.20 - 0.40: Emotional regions form
  const regionFormProgress = Math.min(1, Math.max(0, (scrollProgress - 0.18) / 0.22));

  // 0.40 - 0.60: Movies populate
  const moviesPopulateProgress = Math.min(1, Math.max(0, (scrollProgress - 0.38) / 0.22));

  // 0.60 - 0.80: Connections activate & pulse
  const connectionsActiveProgress = Math.min(1, Math.max(0, (scrollProgress - 0.58) / 0.22));

  // 0.80 - 1.00: AI mood focus & Phase 17 transition
  const aiFocusProgress = Math.min(1, Math.max(0, (scrollProgress - 0.78) / 0.15));
  const phase17TransitionProgress = Math.min(1, Math.max(0, (scrollProgress - 0.88) / 0.12));

  return {
    openingOpacity,
    openingTextPhase,
    landscapeOpacity,
    regionFormProgress,
    moviesPopulateProgress,
    connectionsActiveProgress,
    aiFocusProgress,
    phase17TransitionProgress,
  };
}
