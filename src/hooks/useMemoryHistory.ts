import { create } from 'zustand';
import { MovieMemory, InteractionType } from '../lib/memoryModel';
import { EMOTION_MAP_MOVIES } from '../lib/emotionMapData';

interface MemoryHistoryStore {
  memories: MovieMemory[];
  selectedMemoryId: string | null;
  activeFilter: string | null;
  recordInteraction: (
    movieId: string,
    interactionType: InteractionType,
    source: string,
    emotionContext?: string
  ) => void;
  setSelectedMemoryId: (id: string | null) => void;
  setActiveFilter: (filter: string | null) => void;
  clearHistory: () => void;
}

const STORAGE_KEY = 'cineverse_memory_vault_v1';

// Initial default seed memories so first-time visitors see real movie memories from CINEVERSE
const DEFAULT_SEED_MEMORIES: MovieMemory[] = [
  {
    id: 'seed-1',
    movieId: 'm1',
    title: 'Interstellar',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800',
    director: 'Christopher Nolan',
    genre: 'Sci-Fi / Drama',
    year: 2014,
    interactionType: 'Explored',
    timestamp: Date.now() - 3600000 * 2,
    emotionContext: 'Wonder',
    source: 'Emotion Map',
    importance: 4,
    repeatCount: 2,
    metadata: {
      themes: ['Time', 'Love', 'Survival'],
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    },
  },
  {
    id: 'seed-2',
    movieId: 'm2',
    title: 'Arrival',
    poster: 'https://images.unsplash.com/photo-1518331647614-7a1f04cd34cb?auto=format&fit=crop&q=80&w=800',
    director: 'Denis Villeneuve',
    genre: 'Sci-Fi / Mystery',
    year: 2016,
    interactionType: 'Selected',
    timestamp: Date.now() - 3600000 * 1,
    emotionContext: 'Melancholy',
    source: 'Recommendation Universe',
    importance: 5,
    repeatCount: 1,
    metadata: {
      themes: ['Language', 'Time', 'Communication'],
      description: 'A linguist works with the military to communicate with alien lifeforms.',
    },
  },
];

function loadSavedMemories(): MovieMemory[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Failed to load memory vault state:', e);
  }
  return DEFAULT_SEED_MEMORIES;
}

function saveMemoriesToStorage(memories: MovieMemory[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
  } catch (e) {
    console.warn('Failed to save memory vault state:', e);
  }
}

export const useMemoryHistory = create<MemoryHistoryStore>((set, get) => ({
  memories: loadSavedMemories(),
  selectedMemoryId: null,
  activeFilter: null,

  recordInteraction: (movieId, interactionType, source, emotionContext) => {
    const movieData = EMOTION_MAP_MOVIES.find((m) => m.id === movieId);
    const existingIndex = get().memories.findIndex((m) => m.movieId === movieId);

    let updatedMemories: MovieMemory[];

    if (existingIndex >= 0) {
      const existing = get().memories[existingIndex];
      const updatedItem: MovieMemory = {
        ...existing,
        interactionType,
        timestamp: Date.now(),
        repeatCount: existing.repeatCount + 1,
        importance: Math.min(5, existing.importance + 1),
        emotionContext: emotionContext || existing.emotionContext,
        source: source || existing.source,
      };

      updatedMemories = [
        updatedItem,
        ...get().memories.filter((_, idx) => idx !== existingIndex),
      ];
    } else {
      const newItem: MovieMemory = {
        id: `mem-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        movieId,
        title: movieData?.title || 'Cinematic Memory',
        poster: movieData?.poster || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800',
        director: movieData?.director || 'Visionary Director',
        genre: movieData?.genres?.join(' / ') || 'Cinema',
        year: movieData?.year || 2024,
        interactionType,
        timestamp: Date.now(),
        emotionContext,
        source,
        importance: 3,
        repeatCount: 1,
        metadata: {
          themes: movieData?.themes,
          description: movieData?.description,
        },
      };

      updatedMemories = [newItem, ...get().memories];
    }

    saveMemoriesToStorage(updatedMemories);
    set({ memories: updatedMemories });
  },

  setSelectedMemoryId: (id) => set({ selectedMemoryId: id }),
  setActiveFilter: (filter) => set({ activeFilter: filter }),

  clearHistory: () => {
    saveMemoriesToStorage([]);
    set({ memories: [], selectedMemoryId: null });
  },
}));
