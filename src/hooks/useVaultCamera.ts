import { useRef, useCallback } from 'react';
import * as THREE from 'three';

export const useVaultCamera = () => {
  const mousePos = useRef({ x: 0, y: 0 });

  const updateMousePosition = useCallback((x: number, y: number) => {
    mousePos.current = { x, y };
  }, []);

  const getCameraTarget = useCallback(
    (
      scrollProgress: number,
      focusedPosition?: [number, number, number] | null,
      isReducedMotion: boolean = false
    ) => {
      let targetPosition = new THREE.Vector3(0, 0, 25);
      let targetLookAt = new THREE.Vector3(0, 0, -20);

      if (focusedPosition) {
        // Zoom camera in near the selected memory object
        targetPosition.set(
          focusedPosition[0] * 0.8,
          focusedPosition[1] + 1.2,
          focusedPosition[2] + 6
        );
        targetLookAt.set(...focusedPosition);
      } else {
        // Scroll dolly through the architectural vault hallway (z: 25 to -60)
        const zPos = THREE.MathUtils.lerp(25, -60, scrollProgress);
        const yPos = THREE.MathUtils.lerp(1.5, -2, scrollProgress);

        targetPosition.set(0, yPos, zPos);
        targetLookAt.set(0, yPos * 0.5, zPos - 30);
      }

      // Apply subtle mouse parallax if reduced motion is disabled
      if (!isReducedMotion) {
        targetPosition.x += mousePos.current.x * 2.5;
        targetPosition.y += mousePos.current.y * 1.8;
      }

      return { targetPosition, targetLookAt };
    },
    []
  );

  return {
    updateMousePosition,
    getCameraTarget,
  };
};
