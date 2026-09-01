import { EmotionScore, EmotionMovieItem } from './emotionMapData';
import { EMOTION_REGIONS, EmotionRegionData } from './emotionRegions';

export interface EmotionCoordinateMap {
  [movieId: string]: [number, number, number];
}

// Calculate target coordinates when an emotion or mood filter is selected
export function calculateMoodTargetPositions(
  movies: EmotionMovieItem[],
  activeEmotionId: string | null,
  selectedEmotions: string[] = []
): EmotionCoordinateMap {
  const result: EmotionCoordinateMap = {};

  const effectiveEmotions = activeEmotionId
    ? [activeEmotionId]
    : selectedEmotions.length > 0
    ? selectedEmotions
    : [];

  movies.forEach((movie) => {
    // Default base coordinates
    let [x, y, z] = movie.coordinates;

    if (effectiveEmotions.length > 0) {
      // Find highest score matching effective emotions
      let maxMatchScore = 0;
      effectiveEmotions.forEach((eId) => {
        const scoreObj = movie.emotionalScores.find((s) => s.emotionId === eId);
        if (scoreObj && scoreObj.strength > maxMatchScore) {
          maxMatchScore = scoreObj.strength;
        }
      });

      if (maxMatchScore > 0.6) {
        // Strong match: pull inward towards target emotion region center
        const primaryRegion = EMOTION_REGIONS.find((r) =>
          effectiveEmotions.includes(r.id)
        );
        if (primaryRegion) {
          const lerpFactor = 0.5 + maxMatchScore * 0.35;
          x = x * (1 - lerpFactor) + primaryRegion.position[0] * lerpFactor;
          y = y * (1 - lerpFactor) + primaryRegion.position[1] * lerpFactor;
          z = z * (1 - lerpFactor) + primaryRegion.position[2] * lerpFactor;
        }
      } else {
        // Weak match: drift slightly outward
        const distanceMultiplier = 1.35;
        x *= distanceMultiplier;
        y *= distanceMultiplier;
        z *= distanceMultiplier;
      }
    }

    result[movie.id] = [x, y, z];
  });

  return result;
}

// Compute Euclidean distance between two 3D vectors
export function getDistance3D(
  v1: [number, number, number],
  v2: [number, number, number]
): number {
  const dx = v1[0] - v2[0];
  const dy = v1[1] - v2[1];
  const dz = v1[2] - v2[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
