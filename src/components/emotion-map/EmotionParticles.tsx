import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEmotionMap } from '../../hooks/useEmotionMap';
import { EMOTION_REGIONS } from '../../lib/emotionRegions';

export const EmotionParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { selectedRegionId, hoveredRegionId, isReducedMotion } = useEmotionMap();

  const count = 1200;

  // Generate initial particle buffers
  const [positions, colors, speeds, initialY] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const initY = new Float32Array(count);

    const baseColor = new THREE.Color('#38bdf8');

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 60 - 10;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      initY[i] = y;

      spd[i] = 0.02 + Math.random() * 0.04;

      // Subtle ambient color variation
      col[i * 3] = baseColor.r + (Math.random() - 0.5) * 0.2;
      col[i * 3 + 1] = baseColor.g + (Math.random() - 0.5) * 0.2;
      col[i * 3 + 2] = baseColor.b + (Math.random() - 0.5) * 0.2;
    }

    return [pos, col, spd, initY];
  }, [count]);

  const activeRegion = EMOTION_REGIONS.find(
    (r) => r.id === (selectedRegionId || hoveredRegionId)
  );

  useFrame((state, delta) => {
    if (!pointsRef.current || isReducedMotion) return;

    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const colorAttr = geo.attributes.color as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;
    const colorArray = colorAttr.array as Float32Array;

    const time = state.clock.getElapsedTime();
    const targetColor = activeRegion
      ? new THREE.Color(activeRegion.color)
      : new THREE.Color('#38bdf8');

    for (let i = 0; i < count; i++) {
      let y = posArray[i * 3 + 1];
      const speed = speeds[i];

      // Update position based on motion type
      if (activeRegion?.environmentPreset.particleType === 'rain') {
        y -= speed * 1.5;
        if (y < -30) y = 30;
      } else if (activeRegion?.environmentPreset.particleType === 'ascend') {
        y += speed * 1.2;
        if (y > 30) y = -30;
      } else {
        // float / drift
        y = initialY[i] + Math.sin(time * speed * 2 + i) * 1.2;
      }

      posArray[i * 3 + 1] = y;

      // Lerp particle colors smoothly to active emotion region color
      colorArray[i * 3] = THREE.MathUtils.lerp(colorArray[i * 3], targetColor.r, delta * 2);
      colorArray[i * 3 + 1] = THREE.MathUtils.lerp(colorArray[i * 3 + 1], targetColor.g, delta * 2);
      colorArray[i * 3 + 2] = THREE.MathUtils.lerp(colorArray[i * 3 + 2], targetColor.b, delta * 2);
    }

    posAttr.needsUpdate = true;
    colorAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.25}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
