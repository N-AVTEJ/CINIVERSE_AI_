import { EMOTIONS, EmotionData } from './emotionData';

export interface EmotionProfileBreakdown {
  emotion: EmotionData;
  percentage: number;
  weight: number;
}

export function getEmotionProfile(selectedIds: string[]): EmotionProfileBreakdown[] {
  if (selectedIds.length === 0) {
    return [];
  }

  const selectedEmotions = selectedIds
    .map((id) => EMOTIONS.find((e) => e.id === id))
    .filter((e): e is EmotionData => e !== undefined);

  if (selectedEmotions.length === 0) {
    return [];
  }

  // Weight by intensity
  const totalWeight = selectedEmotions.reduce((acc, curr) => acc + curr.intensity, 0);

  const breakdown: EmotionProfileBreakdown[] = selectedEmotions.map((emotion, idx) => {
    // Distribute percentages smoothly, primary emotion gets a slight boost if multiple
    let rawPercentage = Math.round((emotion.intensity / totalWeight) * 100);
    
    // Fine tune sum to 100
    if (idx === selectedEmotions.length - 1) {
      const sum = selectedEmotions
        .slice(0, idx)
        .reduce((acc, curr) => acc + Math.round((curr.intensity / totalWeight) * 100), 0);
      rawPercentage = Math.max(5, 100 - sum);
    }

    return {
      emotion,
      percentage: rawPercentage,
      weight: emotion.intensity / totalWeight,
    };
  });

  return breakdown.sort((a, b) => b.percentage - a.percentage);
}
