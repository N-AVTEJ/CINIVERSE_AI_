import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { EmotionRegionData } from '../../lib/emotionRegions';
import { useEmotionMap } from '../../hooks/useEmotionMap';

interface EmotionRegionProps {
  region: EmotionRegionData;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
}

export const EmotionRegion = ({
  region,
  isSelected,
  isHovered,
  onClick,
  onHover,
}: EmotionRegionProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const { selectedRegionId } = useEmotionMap();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.15;
    }

    if (meshRef.current) {
      const targetScale = isSelected ? 1.6 : isHovered ? 1.3 : 1.0;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        delta * 4
      );
    }
  });

  const isActive = isSelected || isHovered;

  return (
    <group
      position={region.position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHover(false);
      }}
    >
      {/* Central atmospheric environmental orb */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial
          color={region.color}
          transparent
          opacity={isActive ? 0.45 : 0.2}
          wireframe
        />
      </mesh>

      {/* Rotating orbital light ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[2.2, 2.35, 64]} />
        <meshBasicMaterial
          color={region.accentColor}
          transparent
          opacity={isActive ? 0.8 : 0.35}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Floating 3D Label & Cinematic Typography for Region */}
      <Html
        position={[0, 2.5, 0]}
        center
        distanceFactor={22}
        zIndexRange={[100, 0]}
      >
        <button
          onClick={onClick}
          className={`px-4 py-2 rounded-xl backdrop-blur-md transition-all duration-300 text-left cursor-pointer border ${
            isActive
              ? 'bg-slate-900/90 border-sky-400/60 shadow-[0_0_25px_rgba(56,189,248,0.3)] scale-105'
              : 'bg-slate-950/60 border-slate-800/60 hover:border-slate-600/60'
          }`}
          aria-label={`Select ${region.name} emotional region`}
        >
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ backgroundColor: region.color }}
            />
            <span className="font-heading text-sm md:text-base font-medium tracking-wider text-white uppercase">
              {region.name}
            </span>
          </div>
          <p className="text-[11px] text-slate-300/80 font-sans mt-0.5 max-w-[200px] line-clamp-1">
            {region.tagline}
          </p>
        </button>
      </Html>
    </group>
  );
};
