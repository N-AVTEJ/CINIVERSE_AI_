import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GenreData } from "../../lib/genreData";
import { PlanetConfig } from "../../lib/planetConfigs";
import { OrbitMovie } from "./OrbitMovie";

interface PlanetOrbitProps {
  genre: GenreData;
  config: PlanetConfig;
  hovered: boolean;
}

export const PlanetOrbit = ({ genre, config, hovered }: PlanetOrbitProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  
  const speedMultiplier = hovered ? 1.5 : 1;

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001 * speedMultiplier;
      groupRef.current.rotation.x += 0.0005 * speedMultiplier;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= 0.0005 * speedMultiplier;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Optional Rings */}
      {config.ringCount && (
        <mesh ref={ringRef} rotation={[Math.PI / 2.2, 0, 0]}>
          <ringGeometry args={[config.scale * 1.5, config.scale * 2.2, 64]} />
          <meshBasicMaterial 
            color={config.emissiveColor} 
            transparent 
            opacity={0.2} 
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Orbiting Movies */}
      {genre.orbitMovies.map((movie, index) => {
        // Distribute movies around the planet
        const angle = (index / genre.orbitMovies.length) * Math.PI * 2;
        const radius = config.scale * 2.5 + Math.random() * config.scale;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * config.scale * 1.5;

        return (
          <OrbitMovie 
            key={movie.id} 
            movie={movie} 
            position={[x, y, z]} 
            planetScale={config.scale}
            index={index}
          />
        );
      })}
    </group>
  );
};
