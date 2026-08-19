import { MovieNode, movieUniverseData } from './movieUniverse';
import { getAtmosphereForMovie, AtmospherePreset } from './movieAtmospheres';

export interface MovieShowcaseTrailer {
  url: string;
  videoId?: string;
  type?: 'youtube' | 'mp4';
}

export interface MovieShowcaseItem {
  id: string;
  title: string;
  tagline: string;
  poster: string;
  backdrop: string;
  genre: string;
  year: number;
  runtime: string;
  rating: number;
  director: string;
  cast: string[];
  trailer: MovieShowcaseTrailer;
  matchScore: number;
  recommendationReason: string;
  mood: string;
  atmospherePreset: AtmospherePreset;
  description: string;
  themes: string[];
}

export const SHOWCASE_PRESENTATION_DATA: Record<string, Partial<MovieShowcaseItem>> = {
  m1: {
    id: 'm1',
    title: 'Interstellar',
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800',
    backdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920',
    genre: 'Sci-Fi / Drama',
    year: 2014,
    runtime: '2h 49m',
    rating: 8.7,
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    trailer: {
      url: 'https://www.youtube.com/embed/zSWdZVtXT7E?autoplay=1&rel=0',
      videoId: 'zSWdZVtXT7E',
      type: 'youtube',
    },
    matchScore: 98,
    recommendationReason: 'Chosen because its monumental scale, emotional depth, relativistic pacing, and cosmic visuals align perfectly with your wonder intent.',
    mood: 'Wonder & Awe',
    themes: ['Time Relativity', 'Love Across Dimensions', 'Human Survival', 'Cosmic Scale'],
  },
  m2: {
    id: 'm2',
    title: 'Arrival',
    tagline: 'Language is the first weapon drawn in conflict.',
    poster: 'https://images.unsplash.com/photo-1518331647614-7a1f04cd34cb?auto=format&fit=crop&q=80&w=800',
    backdrop: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=1920',
    genre: 'Sci-Fi / Mystery',
    year: 2016,
    runtime: '1h 56m',
    rating: 7.9,
    director: 'Denis Villeneuve',
    cast: ['Amy Adams', 'Jeremy Renner', 'Forest Whitaker'],
    trailer: {
      url: 'https://www.youtube.com/embed/tFMo3UJ4B4g?autoplay=1&rel=0',
      videoId: 'tFMo3UJ4B4g',
      type: 'youtube',
    },
    matchScore: 94,
    recommendationReason: 'Selected for its contemplative silence, atmospheric depth, intellectual intrigue, and circular narrative structure.',
    mood: 'Melancholy & Mystery',
    themes: ['Linguistics', 'Non-linear Time', 'Empathy', 'First Contact'],
  },
  m8: {
    id: 'm8',
    title: 'Spirited Away',
    tagline: 'Nothing that happens is ever forgotten, even if you can’t remember it.',
    poster: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=800',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1920',
    genre: 'Animation / Fantasy',
    year: 2001,
    runtime: '2h 5m',
    rating: 8.6,
    director: 'Hayao Miyazaki',
    cast: ['Rumi Hiiragi', 'Miyu Irino', 'Mari Natsuki'],
    trailer: {
      url: 'https://www.youtube.com/embed/ByXuk9QqQkk?autoplay=1&rel=0',
      videoId: 'ByXuk9QqQkk',
      type: 'youtube',
    },
    matchScore: 97,
    recommendationReason: 'Selected for its boundless imaginative wonder, painterly atmosphere, and nostalgic emotional warmth.',
    mood: 'Escapism & Wonder',
    themes: ['Spiritual Realm', 'Coming of Age', 'Memory', 'Nostalgia'],
  },
  m9: {
    id: 'm9',
    title: 'Dune: Part Two',
    tagline: 'Long live the fighters.',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800',
    backdrop: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=1920',
    genre: 'Sci-Fi / Adventure',
    year: 2024,
    runtime: '2h 46m',
    rating: 8.5,
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Javier Bardem'],
    trailer: {
      url: 'https://www.youtube.com/embed/Way9Dexny3w?autoplay=1&rel=0',
      videoId: 'Way9Dexny3w',
      type: 'youtube',
    },
    matchScore: 96,
    recommendationReason: 'Driven by visceral kinetic pacing, monumental desert scale, and edge-of-seat acoustic tension.',
    mood: 'Adrenaline & Tension',
    themes: ['Messianic Destiny', 'Desert Power', 'Rebellion', 'High Stakes'],
  },
  m10: {
    id: 'm10',
    title: 'La La Land',
    tagline: 'Here’s to the fools who dream.',
    poster: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    backdrop: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1920',
    genre: 'Romance / Drama',
    year: 2016,
    runtime: '2h 8m',
    rating: 8.0,
    director: 'Damien Chazelle',
    cast: ['Ryan Gosling', 'Emma Stone', 'John Legend'],
    trailer: {
      url: 'https://www.youtube.com/embed/0pdqF4P9MB8?autoplay=1&rel=0',
      videoId: '0pdqF4P9MB8',
      type: 'youtube',
    },
    matchScore: 92,
    recommendationReason: 'Selected for its vibrant romantic glow, poetic bittersweet melancholy, and sweeping musical beauty.',
    mood: 'Romance & Nostalgia',
    themes: ['Artistic Ambition', 'Unspoken Love', 'Bittersweet Memories', 'Dreams'],
  },
  m11: {
    id: 'm11',
    title: 'Parasite',
    tagline: 'Act like you own the place.',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800',
    backdrop: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920',
    genre: 'Thriller / Drama',
    year: 2019,
    runtime: '2h 12m',
    rating: 8.5,
    director: 'Bong Joon-ho',
    cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong', 'Choi Woo-shik'],
    trailer: {
      url: 'https://www.youtube.com/embed/5xH0HfJHsaY?autoplay=1&rel=0',
      videoId: '5xH0HfJHsaY',
      type: 'youtube',
    },
    matchScore: 95,
    recommendationReason: 'Crafted with masterclass precision, razor-sharp narrative tension, dark humor, and sudden thematic turns.',
    mood: 'Tension & Surprise',
    themes: ['Class Warfare', 'Hidden Spaces', 'Symbiosis', 'Family Bonds'],
  },
};

export function getShowcaseMovieFromRecommendation(
  movieNode?: Partial<MovieNode> | null,
  scoreOverride?: number,
  reasonOverride?: string
): MovieShowcaseItem {
  const fallback = SHOWCASE_PRESENTATION_DATA.m1 as MovieShowcaseItem;

  if (!movieNode || !movieNode.id) {
    return {
      ...fallback,
      atmospherePreset: getAtmosphereForMovie(fallback.genre, fallback.mood),
    };
  }

  const existingPreset = SHOWCASE_PRESENTATION_DATA[movieNode.id] || {};

  const genre = movieNode.genre || existingPreset.genre || fallback.genre;
  const mood = existingPreset.mood || 'Cinematic Resonance';
  const atmospherePreset = getAtmosphereForMovie(genre, mood);

  return {
    id: movieNode.id,
    title: movieNode.title || existingPreset.title || fallback.title,
    tagline:
      existingPreset.tagline ||
      `Experience the masterwork of ${movieNode.director || fallback.director}.`,
    poster: movieNode.poster || existingPreset.poster || fallback.poster,
    backdrop:
      existingPreset.backdrop ||
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920',
    genre,
    year: movieNode.year || existingPreset.year || fallback.year,
    runtime: movieNode.runtime || existingPreset.runtime || fallback.runtime,
    rating: movieNode.rating || existingPreset.rating || fallback.rating,
    director: movieNode.director || existingPreset.director || fallback.director,
    cast: existingPreset.cast || ['Lead Performer', 'Co-Star', 'Ensemble Cast'],
    trailer: existingPreset.trailer || {
      url: 'https://www.youtube.com/embed/zSWdZVtXT7E?autoplay=1&rel=0',
      videoId: 'zSWdZVtXT7E',
      type: 'youtube',
    },
    matchScore: scoreOverride || movieNode.recommendationScore || existingPreset.matchScore || 95,
    recommendationReason:
      reasonOverride ||
      existingPreset.recommendationReason ||
      'Chosen because its atmosphere, emotional depth, pacing, and visual style strongly match your current intent.',
    mood,
    atmospherePreset,
    description: movieNode.description || existingPreset.description || fallback.description,
    themes: movieNode.themes || existingPreset.themes || fallback.themes,
  };
}
