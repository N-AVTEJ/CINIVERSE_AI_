import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PlanetConfig } from "../../lib/planetConfigs";

interface PlanetParticlesProps {
  config: PlanetConfig;
}

export const PlanetParticles = ({ config }: PlanetParticlesProps) => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = useMemo(() => {
    switch (config.particlesMode) {
      case 'debris': return 300;
      case 'ash': return 500;
      case 'crystal': return 200;
      case 'sparkle': return 400;
      case 'petals': return 250;
      default: return 300;
    }
  }, [config.particlesMode]);

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = config.scale * 1.5 + Math.random() * config.scale * 1.5;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, [particleCount, config.scale]);

  const color = useMemo(() => {
    switch (config.particlesMode) {
      case 'debris': return "#aaaaaa";
      case 'ash': return "#555555";
      case 'crystal': return config.emissiveColor;
      case 'sparkle': return "#ffffff";
      case 'petals': return "#ffb3d9";
      default: return config.emissiveColor;
    }
  }, [config.particlesMode, config.emissiveColor]);

  const size = useMemo(() => {
    switch (config.particlesMode) {
      case 'debris': return 0.2;
      case 'ash': return 0.1;
      case 'crystal': return 0.3;
      case 'sparkle': return 0.15;
      case 'petals': return 0.25;
      default: return 0.1;
    }
  }, [config.particlesMode]);

  useFrame((state, delta) => {
    if (particlesRef.current) {
      // Different motion based on type
      if (config.particlesMode === 'debris') {
        particlesRef.current.rotation.y += delta * 0.2;
        particlesRef.current.rotation.z += delta * 0.1;
      } else if (config.particlesMode === 'ash') {
        particlesRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
        particlesRef.current.rotation.y += delta * 0.05;
      } else {
        particlesRef.current.rotation.y += delta * 0.05;
      }
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        blending={config.particlesMode === 'ash' || config.particlesMode === 'debris' ? THREE.NormalBlending : THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
