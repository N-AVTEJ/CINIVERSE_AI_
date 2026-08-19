export interface CinemaEra {
  id: string;
  title: string;
  years: string;
  visualTheme: string;
  atmosphere: string;
  iconicObject: string;
  lightingPreset: string;
  famousMovies: string[];
  famousDirectors: string[];
  innovations: string[];
  transitionStyle: string;
  position: [number, number, number]; // Position on the ribbon
}

export const cinemaEras: CinemaEra[] = [
  {
    id: "silent",
    title: "Silent Era",
    years: "1895–1929",
    visualTheme: "monochrome",
    atmosphere: "film-grain",
    iconicObject: "projector",
    lightingPreset: "sepia",
    famousMovies: ["Metropolis", "A Trip to the Moon", "The General"],
    famousDirectors: ["Fritz Lang", "Georges Méliès", "Buster Keaton"],
    innovations: ["Montage", "Special Effects", "Feature Length"],
    transitionStyle: "film-burn",
    position: [0, 0, 0]
  },
  {
    id: "golden",
    title: "Golden Age of Hollywood",
    years: "1930–1959",
    visualTheme: "art-deco",
    atmosphere: "classic",
    iconicObject: "spotlight",
    lightingPreset: "amber",
    famousMovies: ["Citizen Kane", "Casablanca", "Singin' in the Rain"],
    famousDirectors: ["Orson Welles", "Alfred Hitchcock", "John Ford"],
    innovations: ["Technicolor", "Synchronized Sound", "Studio System"],
    transitionStyle: "dissolve",
    position: [0, -10, -50]
  },
  {
    id: "new-hollywood",
    title: "New Hollywood",
    years: "1960–1979",
    visualTheme: "experimental",
    atmosphere: "rich",
    iconicObject: "director-chair",
    lightingPreset: "orange",
    famousMovies: ["The Godfather", "2001: A Space Odyssey", "Taxi Driver"],
    famousDirectors: ["Francis Ford Coppola", "Stanley Kubrick", "Martin Scorsese"],
    innovations: ["Location Shooting", "Anti-heroes", "Auteur Theory"],
    transitionStyle: "projector-flash",
    position: [10, 0, -100]
  },
  {
    id: "blockbuster",
    title: "Blockbuster Era",
    years: "1980–1999",
    visualTheme: "neon",
    atmosphere: "dynamic",
    iconicObject: "film-reel",
    lightingPreset: "blue-warm",
    famousMovies: ["Star Wars", "Jurassic Park", "The Matrix"],
    famousDirectors: ["Steven Spielberg", "George Lucas", "James Cameron"],
    innovations: ["CGI", "Franchises", "Dolby Digital"],
    transitionStyle: "light-bloom",
    position: [-10, 10, -150]
  },
  {
    id: "digital",
    title: "Digital Revolution",
    years: "2000–2015",
    visualTheme: "digital",
    atmosphere: "clean",
    iconicObject: "camera-lens",
    lightingPreset: "white",
    famousMovies: ["Avatar", "The Lord of the Rings", "Inception"],
    famousDirectors: ["Peter Jackson", "Christopher Nolan", "David Fincher"],
    innovations: ["Motion Capture", "Digital Projection", "3D Revival"],
    transitionStyle: "dust",
    position: [0, -10, -200]
  },
  {
    id: "ai",
    title: "AI Cinema",
    years: "2016–Future",
    visualTheme: "futuristic",
    atmosphere: "living",
    iconicObject: "crystal-core",
    lightingPreset: "white-gold",
    famousMovies: ["Dune", "Spider-Man: Into the Spider-Verse", "Everything Everywhere All at Once"],
    famousDirectors: ["Denis Villeneuve", "Phil Lord", "Daniel Kwan"],
    innovations: ["Virtual Production", "AI Generation", "Immersive Audio"],
    transitionStyle: "ribbon",
    position: [0, 0, -250]
  }
];
