import { useEmotionMap } from './useEmotionMap';
import { EMOTION_MAP_MOVIES, EmotionMovieItem } from '../lib/emotionMapData';
import { EMOTION_REGIONS } from '../lib/emotionRegions';

export function useEmotionNavigation() {
  const {
    selectedMovieId,
    selectedRegionId,
    setSelectedMovie,
    setSelectedRegion,
    resetSelection,
  } = useEmotionMap();

  const handleMovieClick = (movieId: string) => {
    if (selectedMovieId === movieId) {
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movieId);
      setSelectedRegion(null); // focus on movie
    }
  };

  const handleRegionClick = (regionId: string) => {
    if (selectedRegionId === regionId) {
      setSelectedRegion(null);
    } else {
      setSelectedRegion(regionId);
      setSelectedMovie(null); // focus on region
    }
  };

  const getTargetCameraPosition = (): [number, number, number] | null => {
    if (selectedMovieId) {
      const movie = EMOTION_MAP_MOVIES.find((m) => m.id === selectedMovieId);
      if (movie) {
        return [movie.coordinates[0], movie.coordinates[1], movie.coordinates[2] + 12];
      }
    }
    if (selectedRegionId) {
      const region = EMOTION_REGIONS.find((r) => r.id === selectedRegionId);
      if (region) {
        return [region.position[0], region.position[1], region.position[2] + 16];
      }
    }
    return null;
  };

  return {
    selectedMovieId,
    selectedRegionId,
    handleMovieClick,
    handleRegionClick,
    resetSelection,
    getTargetCameraPosition,
  };
}
