import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { MovieMemory } from '../../lib/memoryModel';
import { MemoryObjectType } from '../../lib/memoryTimeline';

interface MemoryObjectProps {
  memory: MovieMemory;
  position: [number, number, number];
  rotation: [number, number, number];
  objectType: MemoryObjectType;
  scale: number;
  isSelected: boolean;
  onSelect: () => void;
}

export const MemoryObject = ({
  memory,
  position,
  rotation,
  objectType,
  scale,
  isSelected,
  onSelect,
}: MemoryObjectProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const glowMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle floating animation
      const time = state.clock.getElapsedTime();
      groupRef.current.position.y = position[1] + Math.sin(time * 1.5 + position[0]) * 0.15;

      const targetScale = isSelected ? scale * 1.4 : isHovered ? scale * 1.2 : scale;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 6);

      // Slow rotational drift when unselected
      if (!isSelected) {
        groupRef.current.rotation.y += delta * 0.1;
      }
    }

    if (glowMaterialRef.current) {
      const targetOpacity = isSelected ? 0.9 : isHovered ? 0.7 : 0.25;
      glowMaterialRef.current.opacity = THREE.MathUtils.lerp(
        glowMaterialRef.current.opacity,
        targetOpacity,
        delta * 4
      );
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
    >
      {/* Outer Atmospheric Aura Ring */}
      <mesh position={[0, 0, -0.05]}>
        <ringGeometry args={[1.2, 1.6, 32]} />
        <meshBasicMaterial
          ref={glowMaterialRef}
          color={isSelected || isHovered ? '#38bdf8' : '#1e293b'}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Dynamic 3D Physical Geometry based on Object Type */}
      {objectType === 'film-reel' && (
        <group>
          <mesh>
            <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.06]}>
            <circleGeometry args={[1.0, 32]} />
            <meshBasicMaterial color="#020617" />
          </mesh>
        </group>
      )}

      {objectType === 'glass-photo' && (
        <mesh>
          <boxGeometry args={[2.0, 2.8, 0.08]} />
          <meshPhysicalMaterial
            color="#0f172a"
            transparent
            opacity={0.85}
            roughness={0.1}
            transmission={0.6}
            thickness={0.5}
          />
        </mesh>
      )}

      {objectType === 'film-frame' && (
        <group>
          <mesh>
            <boxGeometry args={[2.2, 3.0, 0.05]} />
            <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[1.9, 2.7]} />
            <meshBasicMaterial color="#090d16" />
          </mesh>
        </group>
      )}

      {(objectType === 'poster-fragment' || objectType === 'prism') && (
        <mesh>
          <cylinderGeometry args={[1.1, 1.1, 0.12, 6]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
        </mesh>
      )}

      {/* Floating Memory Information Badge */}
      <Html
        position={[0, -1.8, 0]}
        center
        distanceFactor={18}
        zIndexRange={[100, 0]}
      >
        <div
          className={`px-3.5 py-2 rounded-xl backdrop-blur-md transition-all duration-300 text-center pointer-events-none whitespace-nowrap border ${
            isSelected || isHovered
              ? 'bg-slate-950/90 border-sky-400/80 shadow-[0_0_20px_rgba(56,189,248,0.3)] scale-105'
              : 'bg-slate-950/70 border-slate-800/60'
          }`}
        >
          <div className="flex items-center gap-1.5 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <p className="text-xs font-semibold text-white tracking-wide">{memory.title}</p>
          </div>
          <div className="flex items-center gap-2 justify-center text-[10px] text-sky-300/80 font-mono mt-0.5">
            <span>{memory.interactionType}</span>
            <span>•</span>
            <span>{memory.source}</span>
          </div>
        </div>
      </Html>
    </group>
  );
};
