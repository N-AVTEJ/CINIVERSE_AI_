export interface Director {
  id: string;
  name: string;
  filmmakingStyle: string;
  signatureThemes: string[];
  visualLanguage: string;
  famousMovies: Array<{title: string; year: string; rating: string}>;
  awards: string[];
  collaborators: string[];
  environmentTheme: string;
  lightingPreset: string;
  soundtrackMood: string;
}

export const directorData: Director[] = [
  {
    id: "nolan",
    name: "Christopher Nolan",
    filmmakingStyle: "Practical effects, non-linear storytelling, massive scale.",
    signatureThemes: ["Time Manipulation", "Memory", "Obsession", "Subjective Reality"],
    visualLanguage: "Precision symmetry, rotating architectural geometry, elegant monochrome.",
    famousMovies: [
      {title: "Inception", year: "2010", rating: "8.8"},
      {title: "Interstellar", year: "2014", rating: "8.7"},
      {title: "The Dark Knight", year: "2008", rating: "9.0"}
    ],
    awards: ["Best Director (Oppenheimer)", "Best Picture"],
    collaborators: ["Hans Zimmer", "Hoyte van Hoytema", "Cillian Murphy"],
    environmentTheme: "nolan",
    lightingPreset: "monochrome",
    soundtrackMood: "Hans Zimmer ticking clocks"
  },
  {
    id: "spielberg",
    name: "Steven Spielberg",
    filmmakingStyle: "Emotional storytelling, Spielberg face, flowing camera.",
    signatureThemes: ["Childhood Wonder", "Extraordinary Circumstances", "Family"],
    visualLanguage: "Warm cinematic sunlight, golden horizon, soft lens flares.",
    famousMovies: [
      {title: "Jurassic Park", year: "1993", rating: "8.2"},
      {title: "Schindler's List", year: "1993", rating: "9.0"},
      {title: "E.T.", year: "1982", rating: "7.9"}
    ],
    awards: ["3x Academy Awards", "AFI Life Achievement"],
    collaborators: ["John Williams", "Janusz Kamiński", "Tom Hanks"],
    environmentTheme: "spielberg",
    lightingPreset: "golden",
    soundtrackMood: "John Williams orchestral sweep"
  },
  {
    id: "villeneuve",
    name: "Denis Villeneuve",
    filmmakingStyle: "Brutalist scale, deliberate pacing, existential atmosphere.",
    signatureThemes: ["Humanity vs Nature", "Identity", "Scale of the Universe"],
    visualLanguage: "Monumental architecture, volumetric fog, minimal elegance.",
    famousMovies: [
      {title: "Dune", year: "2021", rating: "8.0"},
      {title: "Blade Runner 2049", year: "2017", rating: "8.0"},
      {title: "Arrival", year: "2016", rating: "7.9"}
    ],
    awards: ["Academy Award Nominee", "Hugo Award"],
    collaborators: ["Roger Deakins", "Hans Zimmer", "Joe Walker"],
    environmentTheme: "villeneuve",
    lightingPreset: "desert",
    soundtrackMood: "Deep synth pads"
  },
  {
    id: "miyazaki",
    name: "Hayao Miyazaki",
    filmmakingStyle: "Hand-drawn animation, environmentalism, magical realism.",
    signatureThemes: ["Flight", "Nature", "Pacifism", "Coming of Age"],
    visualLanguage: "Organic wind movement, watercolor lighting, floating particles.",
    famousMovies: [
      {title: "Spirited Away", year: "2001", rating: "8.6"},
      {title: "Princess Mononoke", year: "1997", rating: "8.3"},
      {title: "My Neighbor Totoro", year: "1988", rating: "8.1"}
    ],
    awards: ["2x Academy Awards for Animated Feature", "Honorary Academy Award"],
    collaborators: ["Joe Hisaishi", "Studio Ghibli", "Toshio Suzuki"],
    environmentTheme: "miyazaki",
    lightingPreset: "watercolor",
    soundtrackMood: "Joe Hisaishi piano"
  },
  {
    id: "hitchcock",
    name: "Alfred Hitchcock",
    filmmakingStyle: "Master of suspense, voyeurism, subjective camera.",
    signatureThemes: ["The Wrong Man", "Blonde heroines", "MacGuffins"],
    visualLanguage: "Suspenseful shadows, dramatic lighting, geometric compositions.",
    famousMovies: [
      {title: "Psycho", year: "1960", rating: "8.5"},
      {title: "Vertigo", year: "1958", rating: "8.3"},
      {title: "Rear Window", year: "1954", rating: "8.5"}
    ],
    awards: ["AFI Life Achievement", "Irving G. Thalberg Memorial"],
    collaborators: ["Bernard Herrmann", "Cary Grant", "James Stewart"],
    environmentTheme: "hitchcock",
    lightingPreset: "noir",
    soundtrackMood: "Bernard Herrmann strings"
  },
  {
    id: "scorsese",
    name: "Martin Scorsese",
    filmmakingStyle: "Kinetic editing, freeze frames, voiceover, rolling stones.",
    signatureThemes: ["Guilt", "Redemption", "Crime", "Faith"],
    visualLanguage: "Dynamic camera movement, red-hued lighting, gritty realism.",
    famousMovies: [
      {title: "Goodfellas", year: "1990", rating: "8.7"},
      {title: "Taxi Driver", year: "1976", rating: "8.2"},
      {title: "The Departed", year: "2006", rating: "8.5"}
    ],
    awards: ["Academy Award for Best Director", "Palme d'Or"],
    collaborators: ["Robert De Niro", "Leonardo DiCaprio", "Thelma Schoonmaker"],
    environmentTheme: "scorsese",
    lightingPreset: "neon-grit",
    soundtrackMood: "Classic Rock & Roll"
  },
  {
    id: "tarantino",
    name: "Quentin Tarantino",
    filmmakingStyle: "Non-linear, stylized violence, pop culture dialogue.",
    signatureThemes: ["Revenge", "Heists", "Alternate History"],
    visualLanguage: "Trunk shots, hyper-saturated retro colors, blood splatters.",
    famousMovies: [
      {title: "Pulp Fiction", year: "1994", rating: "8.9"},
      {title: "Kill Bill: Vol. 1", year: "2003", rating: "8.2"},
      {title: "Django Unchained", year: "2012", rating: "8.4"}
    ],
    awards: ["2x Academy Awards for Best Original Screenplay", "Palme d'Or"],
    collaborators: ["Samuel L. Jackson", "Uma Thurman", "Sally Menke"],
    environmentTheme: "tarantino",
    lightingPreset: "retro-pop",
    soundtrackMood: "Surf Rock"
  },
  {
    id: "kubrick",
    name: "Stanley Kubrick",
    filmmakingStyle: "Perfectionism, one-point perspective, tracking shots.",
    signatureThemes: ["Dehumanization", "Technology", "War", "Madness"],
    visualLanguage: "Stark symmetry, clinical lighting, imposing geometry.",
    famousMovies: [
      {title: "2001: A Space Odyssey", year: "1968", rating: "8.3"},
      {title: "The Shining", year: "1980", rating: "8.4"},
      {title: "A Clockwork Orange", year: "1971", rating: "8.3"}
    ],
    awards: ["Academy Award for Best Visual Effects", "BAFTA Fellowship"],
    collaborators: ["John Alcott", "Leon Vitali", "Arthur C. Clarke"],
    environmentTheme: "kubrick",
    lightingPreset: "clinical",
    soundtrackMood: "Classical orchestration"
  },
  {
    id: "gerwig",
    name: "Greta Gerwig",
    filmmakingStyle: "Fast-paced dialogue, emotional warmth, theatricality.",
    signatureThemes: ["Female Friendship", "Coming of Age", "Identity"],
    visualLanguage: "Pastel colors, soft diffusion, painterly compositions.",
    famousMovies: [
      {title: "Little Women", year: "2019", rating: "7.8"},
      {title: "Lady Bird", year: "2017", rating: "7.4"},
      {title: "Barbie", year: "2023", rating: "6.9"}
    ],
    awards: ["Academy Award Nominee", "Golden Globe Nominee"],
    collaborators: ["Noah Baumbach", "Saoirse Ronan", "Jacqueline Durran"],
    environmentTheme: "gerwig",
    lightingPreset: "pastel",
    soundtrackMood: "Indie Pop & Orchestral"
  },
  {
    id: "bong",
    name: "Bong Joon-ho",
    filmmakingStyle: "Genre-blending, sudden tonal shifts, visual metaphors.",
    signatureThemes: ["Class Struggle", "Family Dynamics", "Capitalism"],
    visualLanguage: "Vertical spatial metaphors, rain/water motifs, sharp contrast.",
    famousMovies: [
      {title: "Parasite", year: "2019", rating: "8.5"},
      {title: "Memories of Murder", year: "2003", rating: "8.1"},
      {title: "Snowpiercer", year: "2013", rating: "7.1"}
    ],
    awards: ["4x Academy Awards", "Palme d'Or"],
    collaborators: ["Song Kang-ho", "Hong Kyung-pyo", "Jung Jae-il"],
    environmentTheme: "bong",
    lightingPreset: "contrast-rain",
    soundtrackMood: "Tense strings"
  },
  {
    id: "cameron",
    name: "James Cameron",
    filmmakingStyle: "Technological innovation, epic scale, strong female leads.",
    signatureThemes: ["Man vs Machine", "Corporate Greed", "Environmentalism"],
    visualLanguage: "Blue steel lighting, deep water motifs, hyper-detailed tech.",
    famousMovies: [
      {title: "Terminator 2", year: "1991", rating: "8.6"},
      {title: "Titanic", year: "1997", rating: "7.9"},
      {title: "Avatar", year: "2009", rating: "7.9"}
    ],
    awards: ["3x Academy Awards"],
    collaborators: ["James Horner", "Arnold Schwarzenegger", "Sigourney Weaver"],
    environmentTheme: "cameron",
    lightingPreset: "blue-steel",
    soundtrackMood: "Epic synthesis"
  },
  {
    id: "scott",
    name: "Ridley Scott",
    filmmakingStyle: "World-building, atmospheric smoke, multiple cameras.",
    signatureThemes: ["Artificial Intelligence", "Corporate Dystopia", "Survival"],
    visualLanguage: "Silhouettes, shafts of light through smoke, intense detail.",
    famousMovies: [
      {title: "Blade Runner", year: "1982", rating: "8.1"},
      {title: "Alien", year: "1979", rating: "8.5"},
      {title: "Gladiator", year: "2000", rating: "8.5"}
    ],
    awards: ["BAFTA Fellowship", "Academy Award Nominee"],
    collaborators: ["Hans Zimmer", "Russell Crowe", "Arthur Max"],
    environmentTheme: "scott",
    lightingPreset: "shafts-of-light",
    soundtrackMood: "Atmospheric ambient"
  }
];
