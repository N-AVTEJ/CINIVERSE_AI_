import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { EmotionMovieItem } from '../../lib/emotionMapData';
import { useEmotionMap } from '../../hooks/useEmotionMap';
import { EMOTION_REGIONS } from '../../lib/emotionRegions';

interface EmotionMovieNodeProps {
  movie: EmotionMovieItem;
  targetPos: [number, number, number];
  isHighlighted: boolean;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
}

export const EmotionMovieNode = ({
  movie,
  targetPos,
  isHighlighted,
  onClick,
  onHover,
}: EmotionMovieNodeProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const glowMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

  const {
    selectedMovieId,
    hoveredMovieId,
    isTransforming,
    transformStep,
    focalMovieId,
  } = useEmotionMap();

  const isSelected = selectedMovieId === movie.id;
  const isHovered = hoveredMovieId === movie.id;
  const isFocalPoint = isTransforming && transformStep === 7 && focalMovieId === movie.id;

  const primaryRegion = useMemo(
    () => EMOTION_REGIONS.find((r) => r.id === movie.primaryEmotionId),
    [movie.primaryEmotionId]
  );

  const glowColor = primaryRegion?.color || '#38bdf8';

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smoothly interpolate position towards dynamic target coordinates
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        targetPos[0],
        delta * 4
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetPos[1],
        delta * 4
      );
      groupRef.current.position.z = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        targetPos[2],
        delta * 4
      );

      // Gentle floating oscillation
      const time = state.clock.getElapsedTime();
      groupRef.current.position.y += Math.sin(time * 1.5 + targetPos[0]) * 0.005;

      // Scale effect on hover / selection / focal
      const targetScale = isFocalPoint
        ? 1.8
        : isSelected
        ? 1.5
        : isHovered || isHighlighted
        ? 1.25
        : 1.0;

      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        delta * 6
      );
    }

    if (glowMaterialRef.current) {
      const targetOpacity = isFocalPoint
        ? 0.95
        : isSelected || isHovered || isHighlighted
        ? 0.85
        : 0.35;
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
      position={movie.coordinates}
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
      {/* Outer atmospheric glowing aura disc */}
      <mesh position={[0, 0, -0.05]}>
        <ringGeometry args={[0.9, 1.3, 32]} />
        <meshBasicMaterial
          ref={glowMaterialRef}
          color={glowColor}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Elegant circular movie node with small poster artwork */}
      <mesh>
        <circleGeometry args={[0.85, 32]} />
        <meshBasicMaterial color="#020617" />
      </mesh>

      {/* Floating thin metallic border ring */}
      <mesh position={[0, 0, 0.02]}>
        <ringGeometry args={[0.82, 0.88, 32]} />
        <meshBasicMaterial
          color={isHovered || isSelected || isHighlighted ? '#ffffff' : glowColor}
        />
      </mesh>

      {/* Floating label overlay */}
      {(isHovered || isSelected || isHighlighted || isFocalPoint) && (
        <Html
          position={[0, -1.2, 0]}
          center
          distanceFactor={15}
          zIndexRange={[100, 0]}
        >
          <div className="px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-sky-500/30 text-center shadow-xl pointer-events-none whitespace-nowrap">
            <p className="text-xs font-semibold text-white tracking-wide">{movie.title}</p>
            <p className="text-[10px] text-sky-400/80 font-mono">
              {movie.year} • {movie.genres.slice(0, 2).join(' / ')}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
};
