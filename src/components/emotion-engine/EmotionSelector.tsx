import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import { EMOTIONS, EmotionData } from '../../lib/emotionData';
import { useEmotionSelection } from '../../hooks/useEmotionSelection';
import { useEmotionIntensity } from '../../hooks/useEmotionIntensity';

interface EmotionSelectorProps {
  reducedMotion?: boolean;
}

export const EmotionSelector = ({ reducedMotion = false }: EmotionSelectorProps) => {
  const { selectedEmotionIds, toggleEmotion, setHoveredEmotion, activeStep } = useEmotionSelection();
  const { getIntensityForEmotion } = useEmotionIntensity();

  if (activeStep === 'COLLAPSING') return null;

  return (
    <group>
      {EMOTIONS.map((emotion) => (
        <SingleEmotionNode
          key={emotion.id}
          emotion={emotion}
          isSelected={selectedEmotionIds.includes(emotion.id)}
          intensity={getIntensityForEmotion(emotion.id)}
          onSelect={() => toggleEmotion(emotion.id)}
          onHover={(hovered) => setHoveredEmotion(hovered ? emotion.id : null)}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  );
};

interface SingleNodeProps {
  emotion: EmotionData;
  isSelected: boolean;
  intensity: number;
  onSelect: () => void;
  onHover: (hovered: boolean) => void;
  reducedMotion?: boolean;
}

const SingleEmotionNode = ({
  emotion,
  isSelected,
  intensity,
  onSelect,
  onHover,
  reducedMotion = false,
}: SingleNodeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const eColor = new THREE.Color(emotion.color);
  const accentColor = new THREE.Color(emotion.accentColor);

  useFrame((state, delta) => {
    if (!meshRef.current || reducedMotion) return;

    // Smooth lerp scale based on selection/hover intensity
    const targetScale = isSelected ? 1.4 : hovered ? 1.25 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 6);

    // Subtle gentle rotation
    meshRef.current.rotation.y += delta * 0.4;
    meshRef.current.rotation.x += delta * 0.2;

    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.8;
      const ringScale = isSelected ? 1.8 : hovered ? 1.5 : 1.2;
      ringRef.current.scale.lerp(new THREE.Vector3(ringScale, ringScale, ringScale), delta * 6);
    }
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.8}
      rotationIntensity={reducedMotion ? 0 : 0.3}
      floatIntensity={reducedMotion ? 0 : 0.6}
      position={emotion.position}
    >
      <group
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(true);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(false);
        }}
      >
        {/* Core 3D Glowing Orb Mesh */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[0.85, 2]} />
          <meshPhysicalMaterial
            color={eColor}
            emissive={isSelected || hovered ? eColor : new THREE.Color('#050505')}
            emissiveIntensity={isSelected ? 1.8 : hovered ? 1.2 : 0.3}
            roughness={0.2}
            metalness={0.8}
            transmission={0.4}
            thickness={0.5}
          />
        </mesh>

        {/* Outer Orbital Pulse Ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[0.95, 0.03, 16, 64]} />
          <meshBasicMaterial
            color={isSelected ? accentColor : eColor}
            transparent
            opacity={isSelected ? 0.9 : hovered ? 0.7 : 0.3}
          />
        </mesh>

        {/* Point light attached to active/hovered node */}
        {(isSelected || hovered) && (
          <pointLight
            color={eColor}
            intensity={isSelected ? 3.5 : 2.0}
            distance={12}
          />
        )}

        {/* Text Label */}
        <Text
          position={[0, -1.6, 0]}
          fontSize={0.42}
          color={isSelected ? '#ffffff' : hovered ? '#bfdbfe' : '#94a3b8'}
          anchorX="center"
          anchorY="top"
          letterSpacing={0.15}
        >
          {emotion.name.toUpperCase()}
        </Text>

        {/* Selection Marker Halo */}
        {isSelected && (
          <Html position={[0, 1.4, 0]} center transform className="pointer-events-none">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white tracking-widest uppercase shadow-lg animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-cine-gold"></span>
              Selected
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
};
