import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { EmotionAtmosphere } from './EmotionAtmosphere';
import { EmotionParticleField } from './EmotionParticleField';
import { EmotionEnvironment } from './EmotionEnvironment';
import { EmotionSelector } from './EmotionSelector';
import { useEmotionEnvironment } from '../../hooks/useEmotionEnvironment';
import { useEmotionSelection } from '../../hooks/useEmotionSelection';

interface EmotionWorldProps {
  reducedMotion?: boolean;
}

export const EmotionWorld = ({ reducedMotion = false }: EmotionWorldProps) => {
  const { camera } = useThree();
  const { targetCameraPosition } = useEmotionEnvironment();
  const activeStep = useEmotionSelection((s) => s.activeStep);

  useFrame((state, delta) => {
    if (reducedMotion) return;

    // Smooth lerp camera towards target position
    const lerpSpeed = activeStep === 'COLLAPSING' ? delta * 3 : delta * 1.5;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCameraPosition[0], lerpSpeed);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCameraPosition[1], lerpSpeed);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCameraPosition[2], lerpSpeed);

    // Subtle mouse parallax camera tilt
    const mouseX = (state.pointer.x * 1.5);
    const mouseY = (state.pointer.y * 1.5);

    camera.lookAt(mouseX, mouseY, 0);
  });

  return (
    <group>
      <EmotionAtmosphere />
      <EmotionParticleField reducedMotion={reducedMotion} />
      <EmotionEnvironment />
      <EmotionSelector reducedMotion={reducedMotion} />
    </group>
  );
};
