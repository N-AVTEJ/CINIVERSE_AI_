import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PlanetConfig } from "../../lib/planetConfigs";

interface PlanetAtmosphereProps {
  config: PlanetConfig;
  hovered: boolean;
  isFocused: boolean;
}

export const PlanetAtmosphere = ({ config, hovered, isFocused }: PlanetAtmosphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle pulsing of atmosphere
      const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.02;
      const targetScale = hovered || isFocused ? 1.08 * pulse : 1.05 * pulse;
      
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 2);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[config.scale, 64, 64]} />
      <meshBasicMaterial 
        color={config.atmosphereColor} 
        transparent 
        opacity={hovered || isFocused ? 0.4 : 0.2}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.BackSide}
      />
    </mesh>
  );
};
