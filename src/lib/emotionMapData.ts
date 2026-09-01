import { EMOTION_REGIONS, EmotionRegionData } from './emotionRegions';

export interface EmotionScore {
  emotionId: string;
  strength: number; // 0 to 1
  confidence: number; // 0 to 1
}

export interface EmotionMovieItem {
  id: string;
  title: string;
  poster: string;
  director: string;
  year: number;
  rating: number;
  runtime: string;
  genres: string[];
  themes: string[];
  moods: string[];
  recommendationScore: number; // 0 to 100
  description: string;
  emotionalScores: EmotionScore[];
  primaryEmotionId: string;
  coordinates: [number, number, number]; // 3D position in emotion landscape
  connections: Array<{
    targetMovieId: string;
    strength: number; // 0 to 1
    sharedEmotions: string[];
  }>;
}

// Compute 3D coordinate based on weighted sum of emotion region centers
export function computeMoviePosition(
  scores: EmotionScore[],
  offsetSeed: number = 0
): [number, number, number] {
  let x = 0;
  let y = 0;
  let z = 0;
  let totalWeight = 0;

  scores.forEach((s) => {
    const region = EMOTION_REGIONS.find((r) => r.id === s.emotionId);
    if (region) {
      const w = Math.pow(s.strength, 2);
      x += region.position[0] * w;
      y += region.position[1] * w;
      z += region.position[2] * w;
      totalWeight += w;
    }
  });

  if (totalWeight > 0) {
    x /= totalWeight;
    y /= totalWeight;
    z /= totalWeight;
  }

  // Add subtle spatial dispersion so nodes don't stack directly on top of each other
  const angle = (offsetSeed * 137.5 * Math.PI) / 180;
  const radius = 2.5 + (offsetSeed % 3) * 1.2;
  x += Math.cos(angle) * radius;
  y += Math.sin(angle) * (radius * 0.6);
  z += ((offsetSeed % 5) - 2) * 1.5;

  return [x, y, z];
}

export const EMOTION_MAP_MOVIES: EmotionMovieItem[] = [
  {
    id: 'em-1',
    title: 'Interstellar',
    director: 'Christopher Nolan',
    year: 2014,
    rating: 8.7,
    runtime: '2h 49m',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800',
    genres: ['Sci-Fi', 'Drama', 'Adventure'],
    themes: ['Space Exploration', 'Time & Relativity', 'Fatherhood', 'Human Survival'],
    moods: ['Awe', 'Melancholic', 'Hopeful'],
    recommendationScore: 98,
    description: 'A team of explorers travels through a wormhole in space in an attempt to ensure humanity\'s survival.',
    primaryEmotionId: 'wonder',
    emotionalScores: [
      { emotionId: 'wonder', strength: 0.98, confidence: 0.96 },
      { emotionId: 'melancholy', strength: 0.85, confidence: 0.92 },
      { emotionId: 'hope', strength: 0.90, confidence: 0.94 },
      { emotionId: 'tension', strength: 0.72, confidence: 0.88 },
    ],
    coordinates: [0, 0, 0], // calculated dynamically
    connections: [
      { targetMovieId: 'em-2', strength: 0.92, sharedEmotions: ['wonder', 'mystery'] },
      { targetMovieId: 'em-3', strength: 0.85, sharedEmotions: ['wonder', 'hope'] },
      { targetMovieId: 'em-4', strength: 0.88, sharedEmotions: ['wonder', 'tension'] },
      { targetMovieId: 'em-7', strength: 0.82, sharedEmotions: ['wonder', 'melancholy'] },
    ],
  },
  {
    id: 'em-2',
    title: 'Arrival',
    director: 'Denis Villeneuve',
    year: 2016,
    rating: 7.9,
    runtime: '1h 56m',
    poster: 'https://images.unsplash.com/photo-1518331647614-7a1f04cd34cb?auto=format&fit=crop&q=80&w=800',
    genres: ['Sci-Fi', 'Mystery', 'Drama'],
    themes: ['Language', 'Non-linear Time', 'Communication', 'Grief'],
    moods: ['Enigmatic', 'Poetic', 'Quiet'],
    recommendationScore: 95,
    description: 'A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear.',
    primaryEmotionId: 'mystery',
    emotionalScores: [
      { emotionId: 'mystery', strength: 0.96, confidence: 0.95 },
      { emotionId: 'wonder', strength: 0.90, confidence: 0.93 },
      { emotionId: 'melancholy', strength: 0.88, confidence: 0.90 },
      { emotionId: 'reflection', strength: 0.82, confidence: 0.86 },
    ],
    coordinates: [0, 0, 0],
    connections: [
      { targetMovieId: 'em-1', strength: 0.92, sharedEmotions: ['mystery', 'wonder'] },
      { targetMovieId: 'em-5', strength: 0.90, sharedEmotions: ['mystery', 'tension'] },
      { targetMovieId: 'em-10', strength: 0.80, sharedEmotions: ['melancholy', 'reflection'] },
    ],
  },
  {
    id: 'em-3',
    title: 'Spirited Away',
    director: 'Hayao Miyazaki',
    year: 2001,
    rating: 8.6,
    runtime: '2h 5m',
    poster: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=800',
    genres: ['Animation', 'Fantasy', 'Adventure'],
    themes: ['Coming of Age', 'Spirits & Gods', 'Courage', 'Identity'],
    moods: ['Enchanted', 'Nostalgic', 'Warm'],
    recommendationScore: 97,
    description: 'A young girl strays into a world ruled by gods, witches, and spirits where humans are changed into beasts.',
    primaryEmotionId: 'wonder',
    emotionalScores: [
      { emotionId: 'wonder', strength: 0.97, confidence: 0.98 },
      { emotionId: 'nostalgia', strength: 0.92, confidence: 0.94 },
      { emotionId: 'comfort', strength: 0.86, confidence: 0.90 },
      { emotionId: 'joy', strength: 0.80, confidence: 0.88 },
    ],
    coordinates: [0, 0, 0],
    connections: [
      { targetMovieId: 'em-1', strength: 0.85, sharedEmotions: ['wonder'] },
      { targetMovieId: 'em-10', strength: 0.82, sharedEmotions: ['nostalgia', 'melancholy'] },
    ],
  },
  {
    id: 'em-4',
    title: 'Inception',
    director: 'Christopher Nolan',
    year: 2010,
    rating: 8.8,
    runtime: '2h 28m',
    poster: 'https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?auto=format&fit=crop&q=80&w=800',
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    themes: ['Dreams & Reality', 'Subconscious', 'Guilt', 'Architecture'],
    moods: ['Mind-bending', 'Kinetic', 'Tense'],
    recommendationScore: 96,
    description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.',
    primaryEmotionId: 'adrenaline',
    emotionalScores: [
      { emotionId: 'adrenaline', strength: 0.94, confidence: 0.96 },
      { emotionId: 'tension', strength: 0.92, confidence: 0.95 },
      { emotionId: 'wonder', strength: 0.88, confidence: 0.90 },
      { emotionId: 'mystery', strength: 0.84, confidence: 0.88 },
    ],
    coordinates: [0, 0, 0],
    connections: [
      { targetMovieId: 'em-1', strength: 0.88, sharedEmotions: ['wonder', 'tension'] },
      { targetMovieId: 'em-6', strength: 0.94, sharedEmotions: ['adrenaline', 'tension'] },
      { targetMovieId: 'em-5', strength: 0.86, sharedEmotions: ['tension', 'mystery'] },
    ],
  },
  {
    id: 'em-5',
    title: 'Blade Runner 2049',
    director: 'Denis Villeneuve',
    year: 2017,
    rating: 8.0,
    runtime: '2h 44m',
    poster: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=800',
    genres: ['Sci-Fi', 'Mystery', 'Drama'],
    themes: ['Artificial Intelligence', 'Identity', 'Humanity', 'Memory'],
    moods: ['Atmospheric', 'Melancholic', 'Sublime'],
    recommendationScore: 96,
    description: 'Young Blade Runner K discovers a long-buried secret that leads him to track down former Blade Runner Rick Deckard.',
    primaryEmotionId: 'melancholy',
    emotionalScores: [
      { emotionId: 'melancholy', strength: 0.94, confidence: 0.95 },
      { emotionId: 'wonder', strength: 0.92, confidence: 0.92 },
      { emotionId: 'mystery', strength: 0.90, confidence: 0.94 },
      { emotionId: 'reflection', strength: 0.86, confidence: 0.89 },
    ],
    coordinates: [0, 0, 0],
    connections: [
      { targetMovieId: 'em-2', strength: 0.90, sharedEmotions: ['mystery', 'melancholy'] },
      { targetMovieId: 'em-6', strength: 0.88, sharedEmotions: ['mystery', 'adrenaline'] },
      { targetMovieId: 'em-7', strength: 0.84, sharedEmotions: ['melancholy', 'reflection'] },
    ],
  },
  {
    id: 'em-6',
    title: 'The Matrix',
    director: 'The Wachowskis',
    year: 1999,
    rating: 8.7,
    runtime: '2h 16m',
    poster: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    genres: ['Action', 'Sci-Fi'],
    themes: ['Simulated Reality', 'Free Will', 'Awakening', 'Cyberpunk'],
    moods: ['Electrifying', 'Rebellious', 'Iconic'],
    recommendationScore: 94,
    description: 'A computer hacker discovers the shocking truth about his reality and joins a rebellion against cyber-intelligence.',
    primaryEmotionId: 'adrenaline',
    emotionalScores: [
      { emotionId: 'adrenaline', strength: 0.98, confidence: 0.98 },
      { emotionId: 'tension', strength: 0.88, confidence: 0.92 },
      { emotionId: 'wonder', strength: 0.85, confidence: 0.88 },
      { emotionId: 'hope', strength: 0.80, confidence: 0.84 },
    ],
    coordinates: [0, 0, 0],
    connections: [
      { targetMovieId: 'em-4', strength: 0.94, sharedEmotions: ['adrenaline', 'tension'] },
      { targetMovieId: 'em-9', strength: 0.90, sharedEmotions: ['adrenaline', 'hope'] },
    ],
  },
  {
    id: 'em-7',
    title: 'Her',
    director: 'Spike Jonze',
    year: 2013,
    rating: 8.0,
    runtime: '2h 6m',
    poster: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    genres: ['Romance', 'Sci-Fi', 'Drama'],
    themes: ['Connection', 'Intimacy & AI', 'Loneliness', 'Vulnerability'],
    moods: ['Poetic', 'Tender', 'Bittersweet'],
    recommendationScore: 93,
    description: 'In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.',
    primaryEmotionId: 'romance',
    emotionalScores: [
      { emotionId: 'romance', strength: 0.95, confidence: 0.96 },
      { emotionId: 'melancholy', strength: 0.92, confidence: 0.94 },
      { emotionId: 'reflection', strength: 0.88, confidence: 0.90 },
      { emotionId: 'nostalgia', strength: 0.82, confidence: 0.85 },
    ],
    coordinates: [0, 0, 0],
    connections: [
      { targetMovieId: 'em-8', strength: 0.92, sharedEmotions: ['romance', 'melancholy'] },
      { targetMovieId: 'em-2', strength: 0.80, sharedEmotions: ['melancholy', 'reflection'] },
      { targetMovieId: 'em-5', strength: 0.84, sharedEmotions: ['melancholy', 'reflection'] },
    ],
  },
  {
    id: 'em-8',
    title: 'La La Land',
    director: 'Damien Chazelle',
    year: 2016,
    rating: 8.0,
    runtime: '2h 8m',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800',
    genres: ['Romance', 'Drama', 'Music'],
    themes: ['Passion & Dreams', 'Sacrifice', 'Artistic Calling', 'Memory'],
    moods: ['Radiant', 'Bittersweet', 'Euphorically Melancholic'],
    recommendationScore: 92,
    description: 'While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations.',
    primaryEmotionId: 'romance',
    emotionalScores: [
      { emotionId: 'romance', strength: 0.96, confidence: 0.97 },
      { emotionId: 'joy', strength: 0.90, confidence: 0.92 },
      { emotionId: 'nostalgia', strength: 0.88, confidence: 0.90 },
      { emotionId: 'melancholy', strength: 0.84, confidence: 0.88 },
    ],
    coordinates: [0, 0, 0],
    connections: [
      { targetMovieId: 'em-7', strength: 0.92, sharedEmotions: ['romance', 'melancholy'] },
      { targetMovieId: 'em-3', strength: 0.82, sharedEmotions: ['joy', 'nostalgia'] },
    ],
  },
  {
    id: 'em-9',
    title: 'Dune: Part Two',
    director: 'Denis Villeneuve',
    year: 2024,
    rating: 8.5,
    runtime: '2h 46m',
    poster: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=800',
    genres: ['Sci-Fi', 'Adventure', 'Action'],
    themes: ['Destiny & Prophecy', 'Desert Power', 'Revenge', 'Monumental Scale'],
    moods: ['Monumental', 'Epic', 'Tense'],
    recommendationScore: 97,
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    primaryEmotionId: 'wonder',
    emotionalScores: [
      { emotionId: 'wonder', strength: 0.96, confidence: 0.97 },
      { emotionId: 'adrenaline', strength: 0.94, confidence: 0.95 },
      { emotionId: 'tension', strength: 0.90, confidence: 0.92 },
      { emotionId: 'hope', strength: 0.82, confidence: 0.85 },
    ],
    coordinates: [0, 0, 0],
    connections: [
      { targetMovieId: 'em-1', strength: 0.90, sharedEmotions: ['wonder', 'adrenaline'] },
      { targetMovieId: 'em-4', strength: 0.88, sharedEmotions: ['adrenaline', 'tension'] },
      { targetMovieId: 'em-6', strength: 0.90, sharedEmotions: ['adrenaline'] },
    ],
  },
  {
    id: 'em-10',
    title: 'Eternal Sunshine of the Spotless Mind',
    director: 'Michel Gondry',
    year: 2004,
    rating: 8.3,
    runtime: '1h 48m',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800',
    genres: ['Romance', 'Sci-Fi', 'Drama'],
    themes: ['Memory & Eradication', 'Heartbreak', 'Fate', 'Subconscious'],
    moods: ['Bittersweet', 'Surreal', 'Intimate'],
    recommendationScore: 95,
    description: 'When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.',
    primaryEmotionId: 'nostalgia',
    emotionalScores: [
      { emotionId: 'nostalgia', strength: 0.96, confidence: 0.98 },
      { emotionId: 'melancholy', strength: 0.94, confidence: 0.95 },
      { emotionId: 'romance', strength: 0.90, confidence: 0.92 },
      { emotionId: 'wonder', strength: 0.82, confidence: 0.85 },
    ],
    coordinates: [0, 0, 0],
    connections: [
      { targetMovieId: 'em-7', strength: 0.90, sharedEmotions: ['romance', 'melancholy', 'nostalgia'] },
      { targetMovieId: 'em-3', strength: 0.82, sharedEmotions: ['nostalgia'] },
      { targetMovieId: 'em-2', strength: 0.80, sharedEmotions: ['melancholy'] },
    ],
  },
  {
    id: 'em-11',
    title: 'Parasite',
    director: 'Bong Joon-ho',
    year: 2019,
    rating: 8.5,
    runtime: '2h 12m',
    poster: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800',
    genres: ['Thriller', 'Drama', 'Comedy'],
    themes: ['Class Divide', 'Infiltration', 'Family Dynamics', 'Surprise'],
    moods: ['Electric', 'Claustrophobic', 'Subversive'],
    recommendationScore: 96,
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between a wealthy family and a destitute clan.',
    primaryEmotionId: 'tension',
    emotionalScores: [
      { emotionId: 'tension', strength: 0.98, confidence: 0.98 },
      { emotionId: 'fear', strength: 0.82, confidence: 0.85 },
      { emotionId: 'adrenaline', strength: 0.86, confidence: 0.88 },
      { emotionId: 'reflection', strength: 0.80, confidence: 0.82 },
    ],
    coordinates: [0, 0, 0],
    connections: [
      { targetMovieId: 'em-4', strength: 0.85, sharedEmotions: ['tension'] },
      { targetMovieId: 'em-12', strength: 0.88, sharedEmotions: ['tension', 'fear'] },
    ],
  },
  {
    id: 'em-12',
    title: 'Whiplash',
    director: 'Damien Chazelle',
    year: 2014,
    rating: 8.5,
    runtime: '1h 47m',
    poster: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    genres: ['Drama', 'Music'],
    themes: ['Obsession', 'Perfectionism', 'Mentorship', 'Limits of Endurance'],
    moods: ['Relentless', 'Visceral', 'Electrifying'],
    recommendationScore: 94,
    description: 'A promising young drummer enrolls at a cut-throat music conservatory where his instructor will stop at nothing to realize his potential.',
    primaryEmotionId: 'adrenaline',
    emotionalScores: [
      { emotionId: 'adrenaline', strength: 0.96, confidence: 0.97 },
      { emotionId: 'tension', strength: 0.95, confidence: 0.96 },
      { emotionId: 'reflection', strength: 0.78, confidence: 0.80 },
    ],
    coordinates: [0, 0, 0],
    connections: [
      { targetMovieId: 'em-11', strength: 0.88, sharedEmotions: ['tension', 'adrenaline'] },
      { targetMovieId: 'em-4', strength: 0.82, sharedEmotions: ['adrenaline'] },
    ],
  },
];

// Initialize movie coordinates on startup
EMOTION_MAP_MOVIES.forEach((movie, index) => {
  movie.coordinates = computeMoviePosition(movie.emotionalScores, index);
});
