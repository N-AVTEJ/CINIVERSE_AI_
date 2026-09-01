import { useCallback } from 'react';
import { useMemoryHistory } from './useMemoryHistory';

export const useMemoryRecall = () => {
  const { memories } = useMemoryHistory();

  const recallFeeling = useCallback(
    (emotionContext?: string) => {
      const targetEmotion = emotionContext || memories[0]?.emotionContext || 'Wonder';

      // Smooth scroll to the existing Emotion Engine section
      const emotionEngineEl = document.getElementById('emotion-engine');
      if (emotionEngineEl) {
        emotionEngineEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        const emotionMapEl = document.getElementById('emotion-map');
        if (emotionMapEl) {
          emotionMapEl.scrollIntoView({ behavior: 'smooth' });
        }
      }

      return targetEmotion;
    },
    [memories]
  );

  return {
    recallFeeling,
    hasMemories: memories.length > 0,
    primaryEmotion: memories[0]?.emotionContext || 'Wonder',
  };
};
