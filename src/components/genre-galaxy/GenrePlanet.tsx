import { useShallow } from 'zustand/react/shallow';
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { GenreData } from "../../lib/genreData";
import { PlanetConfig } from "../../lib/planetConfigs";
import { usePlanetFocus } from "../../hooks/usePlanetFocus";
import { PlanetAtmosphere } from "./PlanetAtmosphere";
import { PlanetOrbit } from "./PlanetOrbit";
import { PlanetParticles } from "./PlanetParticles";

interface GenrePlanetProps {
  genre: GenreData;
  config: PlanetConfig;
}

export const GenrePlanet = ({ genre, config }: GenrePlanetProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { focusedPlanetId, setFocusedPlanetId, setHoveredPlanetId } = usePlanetFocus(
    useShallow(s => ({ focusedPlanetId: s.focusedPlanetId, setFocusedPlanetId: s.setFocusedPlanetId, setHoveredPlanetId: s.setHoveredPlanetId }))
  );

  const isFocused = focusedPlanetId === genre.id;

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += (hovered || isFocused ? 0.005 : 0.002);
    }
  });

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    setHoveredPlanetId(genre.id);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    setHoveredPlanetId(null);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    setFocusedPlanetId(genre.id);
  };

  // Determine material based on config
  const materialProps = {
    color: config.baseColor,
    emissive: config.emissiveColor,
    emissiveIntensity: hovered || isFocused ? config.emissiveIntensity * 1.5 : config.emissiveIntensity,
    roughness: config.textureType === 'glass' || config.textureType === 'metallic' ? 0.2 : 0.8,
    metalness: config.textureType === 'metallic' ? 0.8 : 0.2,
  };

  return (
    <group 
      ref={groupRef} 
      position={config.position} 
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* The Planet Core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[config.scale, 64, 64]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Atmosphere / Glow */}
      <PlanetAtmosphere config={config} hovered={hovered} isFocused={isFocused} />
      
      {/* Orbital Debris / Movies */}
      <PlanetOrbit genre={genre} config={config} hovered={hovered} />
      
      {/* Particles matching planet personality */}
      <PlanetParticles config={config} />

      {/* Local Light */}
      <pointLight 
        color={config.emissiveColor} 
        intensity={hovered || isFocused ? 2 : 1} 
        distance={config.scale * 10} 
      />

      {/* Hover Label */}
      <Text
        position={[0, config.scale + 3, 0]}
        fontSize={2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/PlusJakartaSans-Bold.ttf"
        fillOpacity={hovered && !isFocused ? 1 : 0}
      >
        {genre.name}
      </Text>
    </group>
  );
};
