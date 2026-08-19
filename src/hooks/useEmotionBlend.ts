import { useMemo } from 'react';
import { useEmotionSelection } from './useEmotionSelection';
import { computeBlendedEmotionProperties, BlendedEmotionProperties } from '../lib/emotionBlending';

export function useEmotionBlend(): BlendedEmotionProperties {
  const selectedEmotionIds = useEmotionSelection((s) => s.selectedEmotionIds);

  return useMemo(() => {
    return computeBlendedEmotionProperties(selectedEmotionIds);
  }, [selectedEmotionIds]);
}
