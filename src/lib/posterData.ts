export interface Movie {
  id: string;
  title: string;
  genre: string;
  director: string;
  year: number;
  rating: number;
  runtime: string;
  poster: string;
  synopsis: string;
}

export const generatePlaceholderMovies = (count: number): Movie[] => {
  const genres = ["Sci-Fi", "Drama", "Thriller", "Action", "Mystery", "Romance", "Adventure", "Fantasy", "Crime"];
  const directors = ["Christopher Nolan", "Denis Villeneuve", "David Fincher", "Ridley Scott", "Steven Spielberg", "Quentin Tarantino", "Martin Scorsese", "Wes Anderson"];
  const titles = ["Nebula", "The Silent Echo", "Neon Dreams", "Abyss", "Quantum", "The Last Horizon", "Echoes of Time", "Mirage", "Solaris", "Vortex", "Cipher", "The Drifter", "Oblivion", "Starlight", "Chronos", "Paradox", "Nova", "Aether", "Labyrinth", "Eclipse"];
  
  const movies: Movie[] = [];
  
  for (let i = 0; i < count; i++) {
    // Generate deterministic but pseudo-random values based on index
    const titleIdx = (i * 3 + 7) % titles.length;
    const genreIdx = (i * 5 + 11) % genres.length;
    const directorIdx = (i * 7 + 13) % directors.length;
    
    // Unsplash placeholders with varying IDs to get different abstract images
    const imageId = 100 + i * 2;
    
    movies.push({
      id: `movie-${i}`,
      title: `${titles[titleIdx]} ${i > titles.length ? 'Part ' + (Math.floor(i / titles.length) + 1) : ''}`.trim(),
      genre: genres[genreIdx],
      director: directors[directorIdx],
      year: 2010 + (i % 15),
      rating: +(7.0 + (i % 25) * 0.1).toFixed(1),
      runtime: `${90 + (i % 60)} min`,
      poster: `https://picsum.photos/id/${imageId}/400/600`, // Using Picsum for abstract/random images with poster ratio
      synopsis: "In a world where artificial intelligence meets cinematic storytelling, every recommendation begins with emotion. Discover a journey beyond the ordinary, where visual landscapes and compelling narratives converge."
    });
  }
  
  return movies;
};

export const moviesData = generatePlaceholderMovies(40);
