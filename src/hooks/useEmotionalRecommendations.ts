import { useMemo } from 'react';
import { useEmotionSelection } from './useEmotionSelection';
import { calculateEmotionalRecommendations, EmotionalRecommendationItem } from '../lib/emotionalScoring';

export function useEmotionalRecommendations(): {
  recommendations: EmotionalRecommendationItem[];
  primaryRecommendation: EmotionalRecommendationItem | null;
} {
  const selectedEmotionIds = useEmotionSelection((s) => s.selectedEmotionIds);

  const recommendations = useMemo(() => {
    return calculateEmotionalRecommendations(selectedEmotionIds);
  }, [selectedEmotionIds]);

  const primaryRecommendation = recommendations.length > 0 ? recommendations[0] : null;

  return {
    recommendations,
    primaryRecommendation,
  };
}
