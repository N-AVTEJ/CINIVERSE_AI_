export type InteractionType = 'Viewed' | 'Explored' | 'Recommended' | 'Selected' | 'Saved';

export interface MovieMemory {
  id: string;
  movieId: string;
  title: string;
  poster: string;
  director: string;
  genre: string;
  year: number;
  interactionType: InteractionType;
  timestamp: number;
  emotionContext?: string;
  source: string;
  importance: number; // 1 to 5 based on repeat interactions / recency
  repeatCount: number;
  metadata?: {
    themes?: string[];
    visualStyle?: string;
    pacing?: string;
    description?: string;
  };
  coordinates?: [number, number, number];
}

export interface TasteScoreItem {
  id: string;
  name: string;
  score: number; // 0 to 1
  count: number;
}

export interface TasteProfile {
  emotions: TasteScoreItem[];
  genres: TasteScoreItem[];
  directors: TasteScoreItem[];
  themes: TasteScoreItem[];
  visualStyles: TasteScoreItem[];
  pacingPreference: string;
  confidence: number; // 0 to 1
  isForming: boolean;
  totalInteractions: number;
}

export interface TasteEvent {
  timestamp: number;
  type: 'genre' | 'emotion' | 'director' | 'theme';
  value: string;
  strength: number;
  label: string;
}

export interface VaultLayer {
  level: number;
  title: string;
  description: string;
  zDepth: number;
}

export const VAULT_LAYERS: VaultLayer[] = [
  { level: 1, title: 'Recently Explored', description: 'Movies recently engaged with in CINEVERSE', zDepth: 0 },
  { level: 2, title: 'Cinematic Connections', description: 'Films structurally linked to your choices', zDepth: -15 },
  { level: 3, title: 'Emotional Territories', description: 'Feelings and moods you lean toward', zDepth: -30 },
  { level: 4, title: 'Genre Tendencies', description: 'Primary story dimensions explored', zDepth: -45 },
  { level: 5, title: 'Director Affinities', description: 'Visionary creators whose styles resonate', zDepth: -60 },
  { level: 6, title: 'Thematic Threads', description: 'Underlying narrative motifs', zDepth: -75 },
  { level: 7, title: 'Visual Aesthetics', description: 'Atmospheric and photographic signatures', zDepth: -90 },
];
