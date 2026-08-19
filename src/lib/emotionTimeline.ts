export type EmotionEngineStep =
  | 'INTRO'        // Silent light expansion & minimal statement
  | 'SELECTING'    // Interactive 3D emotional worlds
  | 'PROFILING'    // Selected profile composition & expanding rings
  | 'ANALYZING'    // AI analysis flow (Emotion -> Mood -> Themes -> Movie candidates)
  | 'SEARCHING'    // Energy paths searching universe
  | 'REVEALED'     // Individually discovered movie reveals
  | 'COLLAPSING';   // Collapse into target recommendation (Bridge to Phase 14)

export const EMOTION_STEPS: { step: EmotionEngineStep; label: string }[] = [
  { step: 'INTRO', label: 'Atmosphere' },
  { step: 'SELECTING', label: 'Select Intent' },
  { step: 'PROFILING', label: 'Emotion Profile' },
  { step: 'ANALYZING', label: 'AI Synthesis' },
  { step: 'SEARCHING', label: 'Neural Scan' },
  { step: 'REVEALED', label: 'Discoveries' },
  { step: 'COLLAPSING', label: 'Focus Reel' },
];
