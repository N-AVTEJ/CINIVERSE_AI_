import { movieUniverseData, MovieNode } from './movieUniverse';
import { EMOTIONS, EmotionData } from './emotionData';

export interface EmotionalRecommendationItem {
  movie: MovieNode;
  matchScore: number; // 0 - 100
  explanation: string;
  emotionalDimensions: {
    wonder: number;
    tension: number;
    joy: number;
    sadness: number;
    mystery: number;
    romance: number;
    nostalgia: number;
    hope: number;
  };
}

// Expanded movie pool with rich emotional profiles matching movieUniverseData
const EXTENDED_EMOTIONAL_MOVIES: MovieNode[] = [
  ...movieUniverseData,
  {
    id: 'm8',
    title: 'Spirited Away',
    genre: 'Animation / Fantasy',
    director: 'Hayao Miyazaki',
    year: 2001,
    rating: 8.6,
    runtime: '2h 5m',
    poster: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=800',
    themes: ['Wonder', 'Coming of Age', 'Spirits', 'Nostalgia'],
    streamingPlatforms: ['Max'],
    coordinates: [30, 10, -15],
    connectedMovies: [{ id: 'm1', strength: 0.8, reason: 'Immersive world building and emotional depth' }],
    recommendationScore: 97,
    description: 'A young girl strays into a world ruled by gods, witches, and spirits where humans are changed into beasts.'
  },
  {
    id: 'm9',
    title: 'Dune: Part Two',
    genre: 'Sci-Fi / Adventure',
    director: 'Denis Villeneuve',
    year: 2024,
    rating: 8.5,
    runtime: '2h 46m',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800',
    themes: ['Destiny', 'Power', 'Desert', 'Adrenaline', 'Tension'],
    streamingPlatforms: ['Max'],
    coordinates: [-20, 18, -35],
    connectedMovies: [{ id: 'm2', strength: 0.9, reason: 'Directed by Denis Villeneuve with monumental scale' }],
    recommendationScore: 95,
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.'
  },
  {
    id: 'm10',
    title: 'La La Land',
    genre: 'Romance / Drama',
    director: 'Damien Chazelle',
    year: 2016,
    rating: 8.0,
    runtime: '2h 8m',
    poster: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    themes: ['Dreams', 'Romance', 'Nostalgia', 'Melancholy'],
    streamingPlatforms: ['Hulu', 'Prime'],
    coordinates: [18, -15, -20],
    connectedMovies: [],
    recommendationScore: 92,
    description: 'While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.'
  },
  {
    id: 'm11',
    title: 'Parasite',
    genre: 'Thriller / Drama',
    director: 'Bong Joon-ho',
    year: 2019,
    rating: 8.5,
    runtime: '2h 12m',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800',
    themes: ['Class Tension', 'Family', 'Subversion', 'Surprise'],
    streamingPlatforms: ['Max', 'Hulu'],
    coordinates: [-10, -20, -30],
    connectedMovies: [],
    recommendationScore: 96,
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.'
  }
];

export function calculateEmotionalRecommendations(
  selectedEmotionIds: string[]
): EmotionalRecommendationItem[] {
  if (selectedEmotionIds.length === 0) {
    // Return top 4 general default recommendations
    return EXTENDED_EMOTIONAL_MOVIES.slice(0, 4).map((m) => ({
      movie: m,
      matchScore: 90,
      explanation: 'Balanced cinematic masterpiece matching a rich spectrum of moods.',
      emotionalDimensions: generateDimensionsForMovie(m, []),
    }));
  }

  const selectedEmotions = selectedEmotionIds
    .map((id) => EMOTIONS.find((e) => e.id === id))
    .filter((e): e is EmotionData => e !== undefined);

  // Score each movie based on theme & genre alignment with selected emotions
  const scored = EXTENDED_EMOTIONAL_MOVIES.map((movie) => {
    let score = 70; // baseline

    selectedEmotions.forEach((e) => {
      // Check genre compatibility
      const hasGenre = e.compatibleGenres.some((g) =>
        movie.genre.toLowerCase().includes(g.toLowerCase())
      );
      if (hasGenre) score += 10;

      // Check theme compatibility
      const themeMatches = movie.themes.filter((t) =>
        e.compatibleThemes.some((ct) => ct.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(ct.toLowerCase()))
      ).length;

      score += themeMatches * 8;

      // Special director signature bonus
      if (e.id === 'wonder' && (movie.director === 'Christopher Nolan' || movie.director === 'Hayao Miyazaki')) score += 6;
      if (e.id === 'tension' && (movie.director === 'Denis Villeneuve' || movie.director === 'Bong Joon-ho')) score += 6;
      if (e.id === 'melancholy' && (movie.title === 'Arrival' || movie.title === 'La La Land')) score += 8;
      if (e.id === 'adrenaline' && (movie.title === 'The Matrix' || movie.title === 'Dune: Part Two')) score += 8;
    });

    // Normalize to 88 - 99 range
    const finalScore = Math.min(99, Math.max(88, Math.round(score)));

    // Generate custom natural explanation based on selected emotions
    const emotionNames = selectedEmotions.map((e) => e.name.toLowerCase());
    let explanation = `Matches your preference for ${emotionNames.join(' and ')}`;
    
    if (selectedEmotions.some((e) => e.id === 'wonder' || e.id === 'mystery')) {
      explanation += ', featuring atmospheric depth, intricate storytelling, and cosmic scale.';
    } else if (selectedEmotions.some((e) => e.id === 'adrenaline' || e.id === 'tension')) {
      explanation += ', driven by relentless kinetic pacing, high stakes, and visceral intensity.';
    } else if (selectedEmotions.some((e) => e.id === 'melancholy' || e.id === 'nostalgia')) {
      explanation += ', imbued with delicate emotional resonance, poetic stillness, and reflective warmth.';
    } else {
      explanation += ', perfectly crafted with sublime visual atmosphere and deep character connections.';
    }

    return {
      movie,
      matchScore: finalScore,
      explanation,
      emotionalDimensions: generateDimensionsForMovie(movie, selectedEmotions),
    };
  });

  // Sort highest match first
  return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 4);
}

function generateDimensionsForMovie(movie: MovieNode, selected: EmotionData[]) {
  // Generate orbital dimension scores (0-100) for visual radar spectrum
  const isSciFi = movie.genre.includes('Sci-Fi');
  const isAction = movie.genre.includes('Action');
  const isDrama = movie.genre.includes('Drama');
  const isMystery = movie.genre.includes('Mystery');

  return {
    wonder: isSciFi ? 95 : 65,
    tension: isAction || isMystery ? 90 : 50,
    joy: movie.genre.includes('Animation') || movie.genre.includes('Comedy') ? 88 : 45,
    sadness: isDrama ? 85 : 40,
    mystery: isMystery || isSciFi ? 92 : 55,
    romance: movie.genre.includes('Romance') ? 95 : 35,
    nostalgia: movie.year < 2015 ? 88 : 60,
    hope: isSciFi || isDrama ? 82 : 62,
  };
}
