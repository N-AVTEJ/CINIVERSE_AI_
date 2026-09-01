import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEmotionMap } from '../../hooks/useEmotionMap';
import { getLightingPresetForEmotion } from '../../lib/emotionMapLighting';

export const EmotionFog = () => {
  const fogRef = useRef<THREE.FogExp2>(null);
  const { selectedRegionId, hoveredRegionId } = useEmotionMap();

  const activeEmotionId = selectedRegionId || hoveredRegionId;
  const targetPreset = getLightingPresetForEmotion(activeEmotionId);

  useFrame((_, delta) => {
    if (fogRef.current) {
      const targetColor = new THREE.Color(targetPreset.fogColor);
      fogRef.current.color.lerp(targetColor, delta * 3);
      fogRef.current.density = THREE.MathUtils.lerp(
        fogRef.current.density,
        targetPreset.fogDensity,
        delta * 3
      );
    }
  });

  return <fogExp2 ref={fogRef} attach="fog" args={['#030712', 0.015]} />;
};
