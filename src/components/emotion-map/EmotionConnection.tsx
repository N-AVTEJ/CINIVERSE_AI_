import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEmotionMap } from '../../hooks/useEmotionMap';
import { EMOTION_REGIONS } from '../../lib/emotionRegions';

interface EmotionConnectionProps {
  startPos: [number, number, number];
  endPos: [number, number, number];
  strength: number; // 0 to 1
  sharedEmotions: string[];
  isHighlighted: boolean;
}

export const EmotionConnection = ({
  startPos,
  endPos,
  strength,
  sharedEmotions,
  isHighlighted,
}: EmotionConnectionProps) => {
  const materialRef = useRef<THREE.LineDashedMaterial>(null);
  const { isTransforming, transformStep } = useEmotionMap();

  const colorHex = useMemo(() => {
    if (sharedEmotions.length > 0) {
      const primaryRegion = EMOTION_REGIONS.find((r) => r.id === sharedEmotions[0]);
      if (primaryRegion) return primaryRegion.color;
    }
    return '#38bdf8';
  }, [sharedEmotions]);

  // Curved 3D Quadratic Bezier path
  const lineObject = useMemo(() => {
    const vStart = new THREE.Vector3(...startPos);
    const vEnd = new THREE.Vector3(...endPos);

    const mid = new THREE.Vector3()
      .addVectors(vStart, vEnd)
      .multiplyScalar(0.5);

    // Curve slightly upward/outward
    mid.y += Math.sin(vStart.x + vEnd.z) * 2;
    mid.z += Math.cos(vStart.y + vEnd.x) * 2;

    const curve = new THREE.QuadraticBezierCurve3(vStart, mid, vEnd);
    const points = curve.getPoints(24);

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineDashedMaterial({
      color: colorHex,
      dashSize: 1.2,
      gapSize: 0.6,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const line = new THREE.Line(geometry, material);
    line.computeLineDistances();
    return { line, material };
  }, [startPos, endPos, colorHex]);

  useFrame((state, delta) => {
    if (lineObject.material) {
      const time = state.clock.getElapsedTime();
      const baseOpacity = isHighlighted ? 0.95 : strength * 0.45;
      const targetOpacity = isTransforming && transformStep >= 5 ? 0.9 : baseOpacity;

      lineObject.material.opacity = THREE.MathUtils.lerp(
        lineObject.material.opacity,
        targetOpacity,
        delta * 3
      );
    }
  });

  return <primitive object={lineObject.line} />;
};
