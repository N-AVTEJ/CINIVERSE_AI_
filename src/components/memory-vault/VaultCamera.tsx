import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useVaultCamera } from '../../hooks/useVaultCamera';

interface VaultCameraProps {
  scrollProgress: number;
  focusedPosition?: [number, number, number] | null;
  isReducedMotion?: boolean;
}

export const VaultCamera = ({
  scrollProgress,
  focusedPosition,
  isReducedMotion = false,
}: VaultCameraProps) => {
  const { camera } = useThree();
  const { updateMousePosition, getCameraTarget } = useVaultCamera();
  const lookAtRef = useRef(new THREE.Vector3(0, 0, -20));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      updateMousePosition(x, y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [updateMousePosition]);

  useFrame((_, delta) => {
    const { targetPosition, targetLookAt } = getCameraTarget(
      scrollProgress,
      focusedPosition,
      isReducedMotion
    );

    // Responsive camera interpolation
    camera.position.lerp(targetPosition, delta * 5);
    lookAtRef.current.lerp(targetLookAt, delta * 5);
    camera.lookAt(lookAtRef.current);
  });

  return null;
};
