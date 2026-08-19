export interface MovieNode {
  id: string;
  title: string;
  genre: string;
  director: string;
  year: number;
  rating: number;
  runtime: string;
  poster: string;
  themes: string[];
  streamingPlatforms: string[];
  coordinates: [number, number, number];
  connectedMovies: Array<{ id: string; strength: number; reason: string }>;
  recommendationScore: number;
  description: string;
}

// A curated graph for the constellation
export const movieUniverseData: MovieNode[] = [
  {
    id: 'm1',
    title: 'Interstellar',
    genre: 'Sci-Fi / Drama',
    director: 'Christopher Nolan',
    year: 2014,
    rating: 8.7,
    runtime: '2h 49m',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800',
    themes: ['Time', 'Love', 'Survival', 'Space Exploration'],
    streamingPlatforms: ['Max', 'Prime'],
    coordinates: [0, 0, 0], // Center of our initial cluster
    connectedMovies: [
      { id: 'm2', strength: 0.95, reason: 'Similar complex sci-fi themes and visual scale' },
      { id: 'm3', strength: 0.88, reason: 'Shared themes of isolation and survival in space' },
      { id: 'm4', strength: 0.82, reason: 'Directed by Christopher Nolan' }
    ],
    recommendationScore: 98,
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
  },
  {
    id: 'm2',
    title: 'Arrival',
    genre: 'Sci-Fi / Mystery',
    director: 'Denis Villeneuve',
    year: 2016,
    rating: 7.9,
    runtime: '1h 56m',
    poster: 'https://images.unsplash.com/photo-1518331647614-7a1f04cd34cb?auto=format&fit=crop&q=80&w=800',
    themes: ['Language', 'Time', 'Communication'],
    streamingPlatforms: ['Paramount+', 'Hulu'],
    coordinates: [15, 8, -10],
    connectedMovies: [
      { id: 'm1', strength: 0.95, reason: 'High-concept sci-fi dealing with time' },
      { id: 'm5', strength: 0.9, reason: 'Directed by Denis Villeneuve' }
    ],
    recommendationScore: 94,
    description: 'A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.'
  },
  {
    id: 'm3',
    title: 'The Martian',
    genre: 'Sci-Fi / Adventure',
    director: 'Ridley Scott',
    year: 2015,
    rating: 8.0,
    runtime: '2h 24m',
    poster: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=800',
    themes: ['Survival', 'Science', 'Isolation'],
    streamingPlatforms: ['Max'],
    coordinates: [-12, -5, -15],
    connectedMovies: [
      { id: 'm1', strength: 0.88, reason: 'Space exploration and survival' }
    ],
    recommendationScore: 89,
    description: 'An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.'
  },
  {
    id: 'm4',
    title: 'Inception',
    genre: 'Action / Sci-Fi',
    director: 'Christopher Nolan',
    year: 2010,
    rating: 8.8,
    runtime: '2h 28m',
    poster: 'https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?auto=format&fit=crop&q=80&w=800',
    themes: ['Dreams', 'Reality', 'Subconscious'],
    streamingPlatforms: ['Max', 'Hulu'],
    coordinates: [5, 15, -25],
    connectedMovies: [
      { id: 'm1', strength: 0.82, reason: 'Directed by Christopher Nolan' }
    ],
    recommendationScore: 91,
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.'
  },
  {
    id: 'm5',
    title: 'Blade Runner 2049',
    genre: 'Sci-Fi / Thriller',
    director: 'Denis Villeneuve',
    year: 2017,
    rating: 8.0,
    runtime: '2h 44m',
    poster: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=800',
    themes: ['Identity', 'Humanity', 'Artificial Intelligence'],
    streamingPlatforms: ['Max'],
    coordinates: [25, -10, -30],
    connectedMovies: [
      { id: 'm2', strength: 0.9, reason: 'Directed by Denis Villeneuve' },
      { id: 'm6', strength: 0.85, reason: 'Cyberpunk dystopian setting' }
    ],
    recommendationScore: 96,
    description: 'Young Blade Runner K\'s discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who\'s been missing for thirty years.'
  },
  {
    id: 'm6',
    title: 'The Matrix',
    genre: 'Action / Sci-Fi',
    director: 'The Wachowskis',
    year: 1999,
    rating: 8.7,
    runtime: '2h 16m',
    poster: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    themes: ['Simulation', 'Free Will', 'Control'],
    streamingPlatforms: ['Max'],
    coordinates: [15, 20, -45],
    connectedMovies: [
      { id: 'm5', strength: 0.85, reason: 'Cyberpunk themes and reality-bending concepts' },
      { id: 'm4', strength: 0.9, reason: 'Questioning the nature of reality' }
    ],
    recommendationScore: 93,
    description: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.'
  },
  {
    id: 'm7',
    title: 'Gravity',
    genre: 'Sci-Fi / Thriller',
    director: 'Alfonso Cuarón',
    year: 2013,
    rating: 7.7,
    runtime: '1h 31m',
    poster: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800',
    themes: ['Survival', 'Isolation', 'Space'],
    streamingPlatforms: ['Max'],
    coordinates: [-25, 12, -20],
    connectedMovies: [
      { id: 'm1', strength: 0.86, reason: 'Visually stunning space survival' },
      { id: 'm3', strength: 0.89, reason: 'Astronauts stranded in space' }
    ],
    recommendationScore: 88,
    description: 'Two astronauts work together to survive after an accident leaves them stranded in space.'
  }
];
