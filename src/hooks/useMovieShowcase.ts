import { useState, useMemo, useEffect } from 'react';
import { useEmotionSelection } from './useEmotionSelection';
import { useEmotionalRecommendations } from './useEmotionalRecommendations';
import { getShowcaseMovieFromRecommendation, MovieShowcaseItem, SHOWCASE_PRESENTATION_DATA } from '../lib/moviePresentation';

export function useMovieShowcase() {
  const focusedMovieId = useEmotionSelection((s) => s.focusedMovieId);
  const { recommendations, primaryRecommendation } = useEmotionalRecommendations();

  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cineverse_watchlist');
      return saved ? JSON.parse(saved) : ['m1'];
    } catch {
      return ['m1'];
    }
  });

  const toggleWatchlist = (id: string) => {
    setWatchlist((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('cineverse_watchlist', JSON.stringify(updated));
      } catch (e) {
        // ignore storage errors
      }
      return updated;
    });
  };

  const activeMovie: MovieShowcaseItem = useMemo(() => {
    // 1. If focusedMovieId is set explicitly (e.g. from Emotion Engine or Constellation)
    if (focusedMovieId) {
      const foundInRecs = recommendations.find((r) => r.movie.id === focusedMovieId);
      if (foundInRecs) {
        return getShowcaseMovieFromRecommendation(
          foundInRecs.movie,
          foundInRecs.matchScore,
          foundInRecs.explanation
        );
      }
      // Check preset dictionary
      const preset = SHOWCASE_PRESENTATION_DATA[focusedMovieId];
      if (preset) {
        return getShowcaseMovieFromRecommendation(preset, preset.matchScore, preset.recommendationReason);
      }
    }

    // 2. If primary recommendation exists from Emotion Engine
    if (primaryRecommendation) {
      return getShowcaseMovieFromRecommendation(
        primaryRecommendation.movie,
        primaryRecommendation.matchScore,
        primaryRecommendation.explanation
      );
    }

    // 3. Default fallback to Interstellar (m1)
    return getShowcaseMovieFromRecommendation(SHOWCASE_PRESENTATION_DATA.m1);
  }, [focusedMovieId, primaryRecommendation, recommendations]);

  const isSavedInWatchlist = watchlist.includes(activeMovie.id);

  return {
    activeMovie,
    watchlist,
    isSavedInWatchlist,
    toggleWatchlist,
  };
}
