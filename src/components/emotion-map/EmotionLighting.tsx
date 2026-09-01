import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEmotionMap } from '../../hooks/useEmotionMap';
import { getLightingPresetForEmotion } from '../../lib/emotionMapLighting';

export const EmotionLighting = () => {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const dirRef = useRef<THREE.DirectionalLight>(null);
  const pointRef = useRef<THREE.PointLight>(null);

  const { selectedRegionId, hoveredRegionId } = useEmotionMap();
  const activeEmotionId = selectedRegionId || hoveredRegionId;
  const preset = getLightingPresetForEmotion(activeEmotionId);

  useFrame((_, delta) => {
    if (ambientRef.current) {
      ambientRef.current.color.lerp(new THREE.Color(preset.ambientColor), delta * 2);
      ambientRef.current.intensity = THREE.MathUtils.lerp(
        ambientRef.current.intensity,
        preset.ambientIntensity,
        delta * 2
      );
    }
    if (dirRef.current) {
      dirRef.current.color.lerp(new THREE.Color(preset.directionalColor), delta * 2);
      dirRef.current.intensity = THREE.MathUtils.lerp(
        dirRef.current.intensity,
        preset.directionalIntensity,
        delta * 2
      );
    }
    if (pointRef.current) {
      pointRef.current.color.lerp(new THREE.Color(preset.pointLightColor), delta * 2);
      pointRef.current.intensity = THREE.MathUtils.lerp(
        pointRef.current.intensity,
        preset.pointLightIntensity,
        delta * 2
      );
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} args={['#0a0f1d', 0.8]} />
      <directionalLight
        ref={dirRef}
        position={[20, 30, 20]}
        args={['#60a5fa', 1.5]}
      />
      <pointLight
        ref={pointRef}
        position={[0, 0, 5]}
        args={['#38bdf8', 2.0, 50]}
      />
    </>
  );
};
