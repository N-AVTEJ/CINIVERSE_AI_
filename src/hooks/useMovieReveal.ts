import { useState, useEffect, useCallback } from 'react';
import { useSceneProgress } from './useSceneProgress';

export interface ParallaxOffsets {
  bgX: number;
  bgY: number;
  artworkX: number;
  artworkY: number;
  foregroundX: number;
  foregroundY: number;
  typographyX: number;
  typographyY: number;
}

export function useMovieReveal() {
  const sceneProgress = useSceneProgress('movie-showcase');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement> | MouseEvent) => {
      if (reducedMotion) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const normX = (clientX / innerWidth - 0.5) * 2; // -1 to 1
      const normY = (clientY / innerHeight - 0.5) * 2; // -1 to 1

      setMousePos({ x: normX, y: normY });
    },
    [reducedMotion]
  );

  const parallax: ParallaxOffsets = {
    bgX: reducedMotion ? 0 : mousePos.x * 6,
    bgY: reducedMotion ? 0 : mousePos.y * 6,
    artworkX: reducedMotion ? 0 : mousePos.x * 16,
    artworkY: reducedMotion ? 0 : mousePos.y * 16,
    foregroundX: reducedMotion ? 0 : mousePos.x * 28,
    foregroundY: reducedMotion ? 0 : mousePos.y * 28,
    typographyX: reducedMotion ? 0 : mousePos.x * 5,
    typographyY: reducedMotion ? 0 : mousePos.y * 5,
  };

  return {
    sceneProgress,
    reducedMotion,
    handleMouseMove,
    parallax,
  };
}
