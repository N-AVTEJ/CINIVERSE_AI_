import { useState, useCallback } from 'react';
import { useEmotionMap } from './useEmotionMap';
import { useEmotionSelection } from './useEmotionSelection';
import { calculateEmotionalRecommendations } from '../lib/emotionalScoring';
import { EMOTION_MAP_MOVIES } from '../lib/emotionMapData';

export function useMoodFinder() {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedEmotionIds, toggleEmotion, clearEmotions } = useEmotionSelection();
  const { setTransformState, setSelectedMovie, setSelectedRegion } = useEmotionMap();

  const handleApplyMood = useCallback(() => {
    if (selectedEmotionIds.length === 0) return;

    // Step 1: Camera slows / init transform
    setTransformState(true, 1, null);

    // Get recommendations from existing Emotion Engine calculation
    const recs = calculateEmotionalRecommendations(selectedEmotionIds);
    const topRecMovieNode = recs.length > 0 ? recs[0].movie : null;
    
    // Match with Emotion Map movie item
    const focalMapMovie = topRecMovieNode
      ? EMOTION_MAP_MOVIES.find((m) => m.title.toLowerCase() === topRecMovieNode.title.toLowerCase()) || EMOTION_MAP_MOVIES[0]
      : EMOTION_MAP_MOVIES[0];

    // Sequence through the 7-step map transformation
    setTimeout(() => setTransformState(true, 2, focalMapMovie.id), 300); // 2: Background dims
    setTimeout(() => setTransformState(true, 3, focalMapMovie.id), 600); // 3: Selected emotion expands
    setTimeout(() => setTransformState(true, 4, focalMapMovie.id), 900); // 4: Related movies move inward
    setTimeout(() => setTransformState(true, 5, focalMapMovie.id), 1200); // 5: Recommendation paths activate
    setTimeout(() => setTransformState(true, 6, focalMapMovie.id), 1500); // 6: Best matches visible
    setTimeout(() => {
      setTransformState(true, 7, focalMapMovie.id); // 7: Focal point movie selected
      setSelectedMovie(focalMapMovie.id);
      setSelectedRegion(null);
    }, 1800);
  }, [selectedEmotionIds, setTransformState, setSelectedMovie, setSelectedRegion]);

  const handleResetMood = useCallback(() => {
    clearEmotions();
    setTransformState(false, 0, null);
    setSelectedMovie(null);
    setSelectedRegion(null);
  }, [clearEmotions, setTransformState, setSelectedMovie, setSelectedRegion]);

  return {
    isOpen,
    setIsOpen,
    selectedEmotionIds,
    toggleEmotion,
    clearEmotions,
    applyMood: handleApplyMood,
    resetMood: handleResetMood,
  };
}
