import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEmotionCamera } from '../../hooks/useEmotionCamera';

export const EmotionMapCamera = () => {
  const { camera } = useThree();
  const { updateMousePosition, getCameraTarget } = useEmotionCamera();
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
    const { targetPosition, targetLookAt } = getCameraTarget(camera.position, delta);

    // Fast, responsive camera lerp (delta * 6) to keep scroll speed prompt and snappy
    camera.position.lerp(targetPosition, delta * 6);
    lookAtRef.current.lerp(targetLookAt, delta * 6);
    camera.lookAt(lookAtRef.current);
  });

  return null;
};
