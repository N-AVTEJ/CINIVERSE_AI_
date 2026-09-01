import { useRef } from 'react';
import * as THREE from 'three';
import { useEmotionMap } from './useEmotionMap';
import { EMOTION_MAP_MOVIES } from '../lib/emotionMapData';
import { EMOTION_REGIONS } from '../lib/emotionRegions';

export function useEmotionCamera() {
  const {
    selectedMovieId,
    selectedRegionId,
    scrollProgress,
    isTransforming,
    transformStep,
    focalMovieId,
    isReducedMotion,
  } = useEmotionMap();

  const mouseRef = useRef({ x: 0, y: 0 });

  const updateMousePosition = (x: number, y: number) => {
    mouseRef.current.x = x;
    mouseRef.current.y = y;
  };

  const getCameraTarget = (
    currentPos: THREE.Vector3,
    delta: number
  ): { targetPosition: THREE.Vector3; targetLookAt: THREE.Vector3 } => {
    const targetPos = new THREE.Vector3(0, 0, 35);
    const targetLookAt = new THREE.Vector3(0, 0, -20);

    // 1. Focal movie selected during AI Mood Transformation (Step 7)
    if (isTransforming && transformStep === 7 && focalMovieId) {
      const focalMovie = EMOTION_MAP_MOVIES.find((m) => m.id === focalMovieId);
      if (focalMovie) {
        targetPos.set(
          focalMovie.coordinates[0],
          focalMovie.coordinates[1],
          focalMovie.coordinates[2] + 10
        );
        targetLookAt.set(
          focalMovie.coordinates[0],
          focalMovie.coordinates[1],
          focalMovie.coordinates[2]
        );
        return { targetPosition: targetPos, targetLookAt };
      }
    }

    // 2. Selected movie by user click
    if (selectedMovieId) {
      const movie = EMOTION_MAP_MOVIES.find((m) => m.id === selectedMovieId);
      if (movie) {
        targetPos.set(
          movie.coordinates[0],
          movie.coordinates[1],
          movie.coordinates[2] + 12
        );
        targetLookAt.set(
          movie.coordinates[0],
          movie.coordinates[1],
          movie.coordinates[2]
        );
        return { targetPosition: targetPos, targetLookAt };
      }
    }

    // 3. Selected emotion region by user click
    if (selectedRegionId) {
      const region = EMOTION_REGIONS.find((r) => r.id === selectedRegionId);
      if (region) {
        targetPos.set(
          region.position[0],
          region.position[1],
          region.position[2] + 16
        );
        targetLookAt.set(region.position[0], region.position[1], region.position[2]);
        return { targetPosition: targetPos, targetLookAt };
      }
    }

    // 4. Default Scroll Progression (0 to 1) & Panoramic Drift
    // Target scroll height is concise (120vh-180vh), camera responds promptly to prevent slow-scroll.
    const scrollZ = 42 - scrollProgress * 22; // pulls backward / forward dynamically
    const scrollY = (scrollProgress - 0.5) * 6;
    const scrollX = Math.sin(scrollProgress * Math.PI) * 5;

    // Mouse parallax contribution
    const parallaxX = isReducedMotion ? 0 : mouseRef.current.x * 2.5;
    const parallaxY = isReducedMotion ? 0 : mouseRef.current.y * 2.5;

    targetPos.set(scrollX + parallaxX, scrollY + parallaxY, scrollZ);
    targetLookAt.set(0, 0, -20);

    return { targetPosition: targetPos, targetLookAt };
  };

  return {
    updateMousePosition,
    getCameraTarget,
  };
}
