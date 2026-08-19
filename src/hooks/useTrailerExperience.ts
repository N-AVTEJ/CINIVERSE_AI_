import { useState, useEffect, useCallback } from 'react';

export function useTrailerExperience() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const openTrailer = useCallback(() => {
    setIsOpen(true);
    setHasError(false);
  }, []);

  const closeTrailer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // Keyboard shortcut ESC to close trailer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeTrailer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeTrailer]);

  return {
    isOpen,
    isMuted,
    hasError,
    setHasError,
    openTrailer,
    closeTrailer,
    toggleMute,
  };
}
