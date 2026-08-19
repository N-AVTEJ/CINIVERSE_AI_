export interface RecommendationData {
  id: string;
  title: string;
  poster: string;
  genre: string;
  director: string;
  cast: string[];
  runtime: string;
  rating: string;
  matchScore: number;
  recommendationReason: string;
  mood: string;
  visualStyle: string;
}

export const finalRecommendation: RecommendationData = {
  id: 'rec1',
  title: 'Interstellar',
  poster: 'https://picsum.photos/id/28/400/600',
  genre: 'Sci-Fi / Drama',
  director: 'Christopher Nolan',
  cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
  runtime: '2h 49m',
  rating: '8.6',
  matchScore: 98,
  recommendationReason: 'Based on your desire for a mind-bending, emotional sci-fi with an epic soundtrack directed by Christopher Nolan.',
  mood: 'Epic, Emotional, Mind-bending',
  visualStyle: 'High Contrast, Vast Space Scapes, Practical Effects'
};
