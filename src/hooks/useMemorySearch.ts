import { useState, useMemo } from 'react';
import { useMemoryHistory } from './useMemoryHistory';

export const useMemorySearch = () => {
  const { memories } = useMemoryHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredMemories = useMemo(() => {
    if (!searchQuery.trim()) return memories;

    const q = searchQuery.toLowerCase().trim();

    return memories.filter((mem) => {
      const matchTitle = mem.title.toLowerCase().includes(q);
      const matchDirector = mem.director.toLowerCase().includes(q);
      const matchGenre = mem.genre.toLowerCase().includes(q);
      const matchEmotion = mem.emotionContext?.toLowerCase().includes(q);
      const matchTheme = mem.metadata?.themes?.some((t) => t.toLowerCase().includes(q));

      return matchTitle || matchDirector || matchGenre || matchEmotion || matchTheme;
    });
  }, [memories, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    isOpen,
    setIsOpen,
    filteredMemories,
    hasResults: filteredMemories.length > 0,
    totalMemories: memories.length,
  };
};
