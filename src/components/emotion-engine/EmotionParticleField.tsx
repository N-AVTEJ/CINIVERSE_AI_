import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEmotionBlend } from '../../hooks/useEmotionBlend';

interface ParticleFieldProps {
  reducedMotion?: boolean;
}

export const EmotionParticleField = ({ reducedMotion = false }: ParticleFieldProps) => {
  const blend = useEmotionBlend();
  const pointsRef = useRef<THREE.Points>(null);

  const count = Math.min(1800, blend.particleCount);

  // Buffer geometries and initial positions
  const { positions, velocities, originalPos } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 60 - 10;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;

      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    return { positions: pos, velocities: vel, originalPos: orig };
  }, [count]);

  const pColor = useMemo(() => new THREE.Color(blend.particleColor), [blend.particleColor]);

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return;

    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    const speed = blend.particleSpeed * (delta * 60);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      switch (blend.motionType) {
        case 'rain':
          array[idx + 1] -= speed * 1.8;
          if (array[idx + 1] < -25) array[idx + 1] = 25;
          array[idx] += Math.sin(state.clock.elapsedTime + i) * 0.005;
          break;

        case 'streak':
          array[idx + 2] += speed * 2.5;
          if (array[idx + 2] > 20) array[idx + 2] = -40;
          array[idx] += (Math.random() - 0.5) * 0.01;
          break;

        case 'ascend':
          array[idx + 1] += speed * 1.5;
          if (array[idx + 1] > 30) array[idx + 1] = -25;
          array[idx] += Math.cos(state.clock.elapsedTime * 0.5 + i) * 0.008;
          break;

        case 'orbit':
          const radius = Math.sqrt(
            originalPos[idx] * originalPos[idx] + originalPos[idx + 2] * originalPos[idx + 2]
          );
          const angle = state.clock.elapsedTime * speed * 0.1 + i * 0.01;
          array[idx] = Math.cos(angle) * radius;
          array[idx + 2] = Math.sin(angle) * radius - 10;
          array[idx + 1] += Math.sin(state.clock.elapsedTime + i) * 0.003;
          break;

        case 'pulse':
          const pulseFactor = 1 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.1;
          array[idx] = originalPos[idx] * pulseFactor;
          array[idx + 1] = originalPos[idx + 1] * pulseFactor;
          array[idx + 2] = originalPos[idx + 2] * pulseFactor;
          break;

        case 'drift':
        case 'float':
        default:
          array[idx] += Math.sin(state.clock.elapsedTime * 0.8 + i) * 0.008 * speed;
          array[idx + 1] += Math.cos(state.clock.elapsedTime * 0.8 + i) * 0.008 * speed;
          array[idx + 2] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.005 * speed;
          break;
      }
    }

    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={blend.particleSize}
        color={pColor}
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
