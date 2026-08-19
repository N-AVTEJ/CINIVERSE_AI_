export interface ShowcaseMilestones {
  opening: { start: number; end: number };
  titleReveal: { start: number; end: number };
  aiExplanation: { start: number; end: number };
  primaryActions: { start: number; end: number };
}

export const SHOWCASE_TIMELINE: ShowcaseMilestones = {
  opening: { start: 0.0, end: 0.25 },
  titleReveal: { start: 0.25, end: 0.55 },
  aiExplanation: { start: 0.55, end: 0.8 },
  primaryActions: { start: 0.8, end: 1.0 },
};

export function calculateShowcaseStageProgress(
  scrollProgress: number,
  stage: keyof ShowcaseMilestones
) {
  const { start, end } = SHOWCASE_TIMELINE[stage];
  if (scrollProgress <= start) return 0;
  if (scrollProgress >= end) return 1;
  return (scrollProgress - start) / (end - start);
}
