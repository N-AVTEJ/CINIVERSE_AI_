import { useState, useCallback } from 'react';
import { useEmotionSelection } from './useEmotionSelection';
import { EMOTIONS, EmotionData } from '../lib/emotionData';

export function useEmotionIntensity() {
  const hoveredEmotionId = useEmotionSelection((s) => s.hoveredEmotionId);
  const selectedEmotionIds = useEmotionSelection((s) => s.selectedEmotionIds);

  const getIntensityForEmotion = useCallback(
    (emotionId: string): number => {
      const isSelected = selectedEmotionIds.includes(emotionId);
      const isHovered = hoveredEmotionId === emotionId;

      if (isHovered) return 1.5;
      if (isSelected) return 1.2;
      return 0.6;
    },
    [hoveredEmotionId, selectedEmotionIds]
  );

  return { getIntensityForEmotion };
}
