import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AtmospherePreset } from '../../lib/movieAtmospheres';

interface MovieParticlesProps {
  atmosphere: AtmospherePreset;
  reducedMotion?: boolean;
}

export const MovieParticles = ({ atmosphere, reducedMotion = false }: MovieParticlesProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1200;

  const { positions, originalPos } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 40 - 5;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;
    }

    return { positions: pos, originalPos: orig };
  }, [count]);

  const pColor = useMemo(() => new THREE.Color(atmosphere.particleColor), [atmosphere.particleColor]);

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return;

    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    const speed = atmosphere.particleSpeed * (delta * 60);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      switch (atmosphere.particleMotion) {
        case 'streak':
          array[idx + 2] += speed * 2.2;
          if (array[idx + 2] > 15) array[idx + 2] = -35;
          break;

        case 'ascend':
          array[idx + 1] += speed * 1.4;
          if (array[idx + 1] > 20) array[idx + 1] = -20;
          array[idx] += Math.sin(state.clock.elapsedTime + i) * 0.005;
          break;

        case 'rain':
          array[idx + 1] -= speed * 1.6;
          if (array[idx + 1] < -20) array[idx + 1] = 20;
          break;

        case 'orbit':
          const radius = Math.sqrt(originalPos[idx] ** 2 + originalPos[idx + 2] ** 2);
          const angle = state.clock.elapsedTime * speed * 0.2 + i * 0.02;
          array[idx] = Math.cos(angle) * radius;
          array[idx + 2] = Math.sin(angle) * radius - 5;
          break;

        case 'drift':
        case 'float':
        default:
          array[idx] += Math.sin(state.clock.elapsedTime * 0.6 + i) * 0.006 * speed;
          array[idx + 1] += Math.cos(state.clock.elapsedTime * 0.6 + i) * 0.006 * speed;
          break;
      }
    }

    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.22}
        color={pColor}
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
