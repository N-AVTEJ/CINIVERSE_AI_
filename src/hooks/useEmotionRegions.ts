import { useEmotionMap } from './useEmotionMap';
import { EMOTION_REGIONS, EmotionRegionData } from '../lib/emotionRegions';
import { EMOTION_MAP_MOVIES, EmotionMovieItem } from '../lib/emotionMapData';

export function useEmotionRegions() {
  const { selectedRegionId, hoveredRegionId, setSelectedRegion, setHoveredRegion } =
    useEmotionMap();

  const activeRegion =
    EMOTION_REGIONS.find((r) => r.id === (selectedRegionId || hoveredRegionId)) || null;

  const moviesForActiveRegion: EmotionMovieItem[] = activeRegion
    ? EMOTION_MAP_MOVIES.filter((m) =>
        m.emotionalScores.some((s) => s.emotionId === activeRegion.id && s.strength > 0.6)
      )
    : [];

  return {
    regions: EMOTION_REGIONS,
    selectedRegionId,
    hoveredRegionId,
    activeRegion,
    moviesForActiveRegion,
    selectRegion: setSelectedRegion,
    hoverRegion: setHoveredRegion,
  };
}
