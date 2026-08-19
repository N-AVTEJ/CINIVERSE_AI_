import { useMemo } from 'react';
import { useEmotionBlend } from './useEmotionBlend';
import { useEmotionSelection } from './useEmotionSelection';
import { EMOTIONS } from '../lib/emotionData';

export function useEmotionEnvironment() {
  const blend = useEmotionBlend();
  const activeStep = useEmotionSelection((s) => s.activeStep);
  const selectedEmotionIds = useEmotionSelection((s) => s.selectedEmotionIds);
  const hoveredEmotionId = useEmotionSelection((s) => s.hoveredEmotionId);

  const targetCameraPosition = useMemo(() => {
    if (hoveredEmotionId) {
      const hoveredEmotion = EMOTIONS.find((e) => e.id === hoveredEmotionId);
      if (hoveredEmotion) {
        // Shift camera gently towards hovered node
        return [
          hoveredEmotion.position[0] * 0.3,
          hoveredEmotion.position[1] * 0.3,
          blend.cameraDistance,
        ] as [number, number, number];
      }
    }

    if (activeStep === 'COLLAPSING') {
      return [0, 0, 8] as [number, number, number];
    }

    if (activeStep === 'REVEALED') {
      return [0, 2, 18] as [number, number, number];
    }

    return [0, 0, blend.cameraDistance] as [number, number, number];
  }, [hoveredEmotionId, activeStep, blend.cameraDistance]);

  return {
    blend,
    targetCameraPosition,
  };
}
