import { MovieMemory, TasteProfile, TasteScoreItem } from './memoryModel';
import { EMOTION_MAP_MOVIES } from './emotionMapData';

export function analyzeTasteProfile(memories: MovieMemory[]): TasteProfile {
  if (!memories || memories.length === 0) {
    return {
      emotions: [],
      genres: [],
      directors: [],
      themes: [],
      visualStyles: [],
      pacingPreference: 'Undetermined',
      confidence: 0,
      isForming: true,
      totalInteractions: 0,
    };
  }

  const emotionCounts: Record<string, { name: string; score: number; count: number }> = {};
  const genreCounts: Record<string, { name: string; score: number; count: number }> = {};
  const directorCounts: Record<string, { name: string; score: number; count: number }> = {};
  const themeCounts: Record<string, { name: string; score: number; count: number }> = {};
  const styleCounts: Record<string, { name: string; score: number; count: number }> = {};

  const now = Date.now();

  memories.forEach((mem) => {
    // Recency weight: recent interactions carry slightly higher weight (0.6 to 1.0)
    const ageInHours = (now - mem.timestamp) / (1000 * 60 * 60);
    const recencyWeight = Math.max(0.6, 1 / (1 + ageInHours * 0.05));
    const interactionWeight = mem.interactionType === 'Selected' || mem.interactionType === 'Saved' ? 1.5 : 1.0;
    const weight = mem.importance * recencyWeight * interactionWeight;

    // Director
    if (mem.director) {
      if (!directorCounts[mem.director]) {
        directorCounts[mem.director] = { name: mem.director, score: 0, count: 0 };
      }
      directorCounts[mem.director].score += weight;
      directorCounts[mem.director].count += 1;
    }

    // Genre
    if (mem.genre) {
      const parts = mem.genre.split('/').map((g) => g.trim());
      parts.forEach((g) => {
        if (!genreCounts[g]) {
          genreCounts[g] = { name: g, score: 0, count: 0 };
        }
        genreCounts[g].score += weight;
        genreCounts[g].count += 1;
      });
    }

    // Emotion context
    if (mem.emotionContext) {
      const emoKey = mem.emotionContext.toLowerCase();
      if (!emotionCounts[emoKey]) {
        emotionCounts[emoKey] = { name: mem.emotionContext, score: 0, count: 0 };
      }
      emotionCounts[emoKey].score += weight * 1.2;
      emotionCounts[emoKey].count += 1;
    }

    // Match with rich movie data for themes & visual styles
    const fullMovie = EMOTION_MAP_MOVIES.find((m) => m.id === mem.movieId);
    if (fullMovie) {
      fullMovie.themes.forEach((t) => {
        if (!themeCounts[t]) {
          themeCounts[t] = { name: t, score: 0, count: 0 };
        }
        themeCounts[t].score += weight;
        themeCounts[t].count += 1;
      });

      fullMovie.emotionalScores.forEach((es) => {
        if (!emotionCounts[es.emotionId]) {
          emotionCounts[es.emotionId] = { name: es.emotionId, score: 0, count: 0 };
        }
        emotionCounts[es.emotionId].score += es.strength * weight;
        emotionCounts[es.emotionId].count += 1;
      });
    }
  });

  const formatScores = (record: Record<string, { name: string; score: number; count: number }>): TasteScoreItem[] => {
    const list = Object.entries(record).map(([id, val]) => ({
      id,
      name: val.name,
      score: val.score,
      count: val.count,
    }));
    list.sort((a, b) => b.score - a.score);
    const maxScore = list[0]?.score || 1;
    return list.slice(0, 5).map((item) => ({
      ...item,
      score: Math.min(1, item.score / maxScore),
    }));
  };

  const emotions = formatScores(emotionCounts);
  const genres = formatScores(genreCounts);
  const directors = formatScores(directorCounts);
  const themes = formatScores(themeCounts);
  const visualStyles = formatScores(styleCounts);

  const totalInteractions = memories.length;
  // Needs at least 3 distinct interactions for a high-confidence signature
  const isForming = totalInteractions < 3;
  const confidence = Math.min(1.0, totalInteractions / 5.0);

  let pacingPreference = 'Deliberate & Atmospheric';
  if (genres.some((g) => g.name.toLowerCase().includes('action'))) {
    pacingPreference = 'High-Kinetic & Dynamic';
  } else if (genres.some((g) => g.name.toLowerCase().includes('sci-fi'))) {
    pacingPreference = 'Cereal & Contemplative';
  }

  return {
    emotions,
    genres,
    directors,
    themes,
    visualStyles,
    pacingPreference,
    confidence,
    isForming,
    totalInteractions,
  };
}
