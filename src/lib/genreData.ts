export interface OrbitMovieData {
  id: string;
  title: string;
  poster: string;
}

export interface GenreData {
  id: string;
  name: string;
  themeColor: string;
  ambientColor: string;
  popularity: string;
  movieCount: string;
  averageRating: string;
  mood: string;
  topDirectors: string[];
  topActors: string[];
  trendingMovies: string[];
  orbitMovies: OrbitMovieData[];
}

export const genreData: GenreData[] = [
  {
    id: "action",
    name: "Action",
    themeColor: "#ff4d00",
    ambientColor: "#2a0d00",
    popularity: "98%",
    movieCount: "12,405",
    averageRating: "7.2",
    mood: "Adrenaline, Explosive, Fast-paced",
    topDirectors: ["Michael Bay", "John McTiernan", "George Miller"],
    topActors: ["Tom Cruise", "Keanu Reeves", "Charlize Theron"],
    trendingMovies: ["Mad Max: Fury Road", "John Wick 4", "Mission: Impossible"],
    orbitMovies: [
      { id: "a1", title: "Action 1", poster: "https://picsum.photos/id/10/200/300" },
      { id: "a2", title: "Action 2", poster: "https://picsum.photos/id/11/200/300" },
      { id: "a3", title: "Action 3", poster: "https://picsum.photos/id/12/200/300" },
    ]
  },
  {
    id: "scifi",
    name: "Science Fiction",
    themeColor: "#00d2ff",
    ambientColor: "#001f3f",
    popularity: "95%",
    movieCount: "8,320",
    averageRating: "7.8",
    mood: "Thought-provoking, Futuristic, Unknown",
    topDirectors: ["Denis Villeneuve", "Christopher Nolan", "Ridley Scott"],
    topActors: ["Harrison Ford", "Sigourney Weaver", "Ryan Gosling"],
    trendingMovies: ["Dune: Part Two", "Blade Runner 2049", "Interstellar"],
    orbitMovies: [
      { id: "s1", title: "Sci-Fi 1", poster: "https://picsum.photos/id/20/200/300" },
      { id: "s2", title: "Sci-Fi 2", poster: "https://picsum.photos/id/21/200/300" },
      { id: "s3", title: "Sci-Fi 3", poster: "https://picsum.photos/id/22/200/300" },
    ]
  },
  {
    id: "horror",
    name: "Horror",
    themeColor: "#cc0000",
    ambientColor: "#1a0000",
    popularity: "92%",
    movieCount: "15,800",
    averageRating: "6.8",
    mood: "Terrifying, Tense, Atmospheric",
    topDirectors: ["Ari Aster", "Jordan Peele", "John Carpenter"],
    topActors: ["Toni Collette", "Jamie Lee Curtis", "Daniel Kaluuya"],
    trendingMovies: ["Hereditary", "Get Out", "The Shining"],
    orbitMovies: [
      { id: "h1", title: "Horror 1", poster: "https://picsum.photos/id/30/200/300" },
      { id: "h2", title: "Horror 2", poster: "https://picsum.photos/id/31/200/300" },
      { id: "h3", title: "Horror 3", poster: "https://picsum.photos/id/32/200/300" },
    ]
  },
  {
    id: "fantasy",
    name: "Fantasy",
    themeColor: "#d4af37",
    ambientColor: "#2b2200",
    popularity: "94%",
    movieCount: "6,450",
    averageRating: "7.6",
    mood: "Magical, Epic, Wondrous",
    topDirectors: ["Peter Jackson", "Guillermo del Toro", "Tim Burton"],
    topActors: ["Ian McKellen", "Elijah Wood", "Cate Blanchett"],
    trendingMovies: ["The Lord of the Rings", "Pan's Labyrinth", "Harry Potter"],
    orbitMovies: [
      { id: "f1", title: "Fantasy 1", poster: "https://picsum.photos/id/40/200/300" },
      { id: "f2", title: "Fantasy 2", poster: "https://picsum.photos/id/41/200/300" },
      { id: "f3", title: "Fantasy 3", poster: "https://picsum.photos/id/42/200/300" },
    ]
  },
  {
    id: "romance",
    name: "Romance",
    themeColor: "#ff4d94",
    ambientColor: "#33001a",
    popularity: "88%",
    movieCount: "18,200",
    averageRating: "6.5",
    mood: "Emotional, Heartwarming, Passionate",
    topDirectors: ["Richard Linklater", "Nora Ephron", "Wong Kar-wai"],
    topActors: ["Rachel McAdams", "Ryan Gosling", "Julia Roberts"],
    trendingMovies: ["Before Sunrise", "The Notebook", "La La Land"],
    orbitMovies: [
      { id: "r1", title: "Romance 1", poster: "https://picsum.photos/id/50/200/300" },
      { id: "r2", title: "Romance 2", poster: "https://picsum.photos/id/51/200/300" },
      { id: "r3", title: "Romance 3", poster: "https://picsum.photos/id/52/200/300" },
    ]
  },
  {
    id: "comedy",
    name: "Comedy",
    themeColor: "#ffff00",
    ambientColor: "#333300",
    popularity: "96%",
    movieCount: "25,400",
    averageRating: "6.2",
    mood: "Hilarious, Lighthearted, Fun",
    topDirectors: ["Edgar Wright", "Taika Waititi", "Judd Apatow"],
    topActors: ["Jim Carrey", "Steve Carell", "Melissa McCarthy"],
    trendingMovies: ["Superbad", "Hot Fuzz", "Step Brothers"],
    orbitMovies: [
      { id: "c1", title: "Comedy 1", poster: "https://picsum.photos/id/60/200/300" },
      { id: "c2", title: "Comedy 2", poster: "https://picsum.photos/id/61/200/300" },
      { id: "c3", title: "Comedy 3", poster: "https://picsum.photos/id/62/200/300" },
    ]
  },
  {
    id: "drama",
    name: "Drama",
    themeColor: "#4a4ae6",
    ambientColor: "#1a1a2e",
    popularity: "91%",
    movieCount: "35,200",
    averageRating: "7.1",
    mood: "Intense, Emotional, Character-driven",
    topDirectors: ["Martin Scorsese", "Paul Thomas Anderson", "David Fincher"],
    topActors: ["Leonardo DiCaprio", "Meryl Streep", "Tom Hanks"],
    trendingMovies: ["The Godfather", "Schindler's List", "Forrest Gump"],
    orbitMovies: [
      { id: "d1", title: "Drama 1", poster: "https://picsum.photos/id/70/200/300" },
      { id: "d2", title: "Drama 2", poster: "https://picsum.photos/id/71/200/300" },
      { id: "d3", title: "Drama 3", poster: "https://picsum.photos/id/72/200/300" },
    ]
  },
  {
    id: "thriller",
    name: "Thriller",
    themeColor: "#0ea5e9",
    ambientColor: "#0f172a",
    popularity: "89%",
    movieCount: "14,800",
    averageRating: "6.9",
    mood: "Suspenseful, Gripping, Dark",
    topDirectors: ["Alfred Hitchcock", "David Fincher", "Bong Joon Ho"],
    topActors: ["Anthony Hopkins", "Jake Gyllenhaal", "Jodie Foster"],
    trendingMovies: ["Se7en", "The Silence of the Lambs", "Parasite"],
    orbitMovies: [
      { id: "t1", title: "Thriller 1", poster: "https://picsum.photos/id/80/200/300" },
      { id: "t2", title: "Thriller 2", poster: "https://picsum.photos/id/81/200/300" },
      { id: "t3", title: "Thriller 3", poster: "https://picsum.photos/id/82/200/300" },
    ]
  },
  {
    id: "adventure",
    name: "Adventure",
    themeColor: "#22c55e",
    ambientColor: "#14532d",
    popularity: "93%",
    movieCount: "11,200",
    averageRating: "7.0",
    mood: "Exciting, Exploring, Epic",
    topDirectors: ["Steven Spielberg", "James Cameron", "Peter Jackson"],
    topActors: ["Harrison Ford", "Chris Pratt", "Johnny Depp"],
    trendingMovies: ["Raiders of the Lost Ark", "Jurassic Park", "Pirates of the Caribbean"],
    orbitMovies: [
      { id: "v1", title: "Adventure 1", poster: "https://picsum.photos/id/90/200/300" },
      { id: "v2", title: "Adventure 2", poster: "https://picsum.photos/id/91/200/300" },
      { id: "v3", title: "Adventure 3", poster: "https://picsum.photos/id/92/200/300" },
    ]
  }
];
