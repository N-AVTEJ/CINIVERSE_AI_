import { MovieMemory } from './memoryModel';

export interface EvolutionStage {
  step: number;
  label: string;
  primaryGenre: string;
  associatedEmotions: string[];
  timestamp: number;
  description: string;
}

export function calculateTasteEvolution(memories: MovieMemory[]): {
  stages: EvolutionStage[];
  isDataSufficient: boolean;
} {
  if (!memories || memories.length < 2) {
    return {
      stages: [],
      isDataSufficient: false,
    };
  }

  // Sort memories chronologically
  const sorted = [...memories].sort((a, b) => a.timestamp - b.timestamp);

  const stages: EvolutionStage[] = [];
  const seenGenres = new Set<string>();

  sorted.forEach((mem, idx) => {
    const mainGenre = mem.genre.split('/')[0].trim();
    if (!seenGenres.has(mainGenre) || idx === 0 || idx === sorted.length - 1) {
      seenGenres.add(mainGenre);
      stages.push({
        step: stages.length + 1,
        label: `${mainGenre} Focus`,
        primaryGenre: mainGenre,
        associatedEmotions: mem.emotionContext ? [mem.emotionContext] : ['Wonder'],
        timestamp: mem.timestamp,
        description: `Explored ${mem.title} (${mem.director})`,
      });
    }
  });

  return {
    stages: stages.slice(0, 4),
    isDataSufficient: stages.length >= 2,
  };
}
