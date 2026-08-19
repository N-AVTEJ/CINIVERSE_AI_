import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";
import { CinemaEra } from "../../lib/cinemaHistory";
import { FloatingArtifact } from "./FloatingArtifact";
import { EraLighting } from "./EraLighting";
import { useTimelineProgress } from "../../hooks/useTimelineProgress";

export const EraScene = ({ era }: { era: CinemaEra }) => {
  const groupRef = useRef<THREE.Group>(null);
  const activeEraId = useTimelineProgress(s => s.activeEraId);
  
  const isActive = activeEraId === era.id;

  // We want to fade the era in/out or animate based on activity
  // For performance, we could skip updates if far away, but react-three-fiber handles frustum culling.
  // We will animate the scale/opacity of elements.
  const targetScale = useRef(0.8);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    targetScale.current = THREE.MathUtils.lerp(
      targetScale.current, 
      isActive ? 1 : 0.8, 
      delta * 2
    );
    groupRef.current.scale.setScalar(targetScale.current);
  });

  return (
    <group ref={groupRef} position={era.position}>
      <EraLighting era={era} isActive={isActive} />
      
      <Float
        speed={isActive ? 2 : 0.5}
        rotationIntensity={isActive ? 1.5 : 0.2}
        floatIntensity={isActive ? 2 : 0.5}
      >
        <FloatingArtifact era={era} isActive={isActive} />
      </Float>
      
      {/* Background cinematic elements per era */}
      {isActive && <BackgroundElements era={era} />}
    </group>
  );
};

const BackgroundElements = ({ era }: { era: CinemaEra }) => {
  // Simple abstract geometry floating behind the artifact to add depth
  const particles = useMemo(() => {
    const pos = new Float32Array(300);
    for(let i=0; i<100; i++) {
      pos[i*3] = (Math.random() - 0.5) * 40;
      pos[i*3+1] = (Math.random() - 0.5) * 40;
      pos[i*3+2] = (Math.random() - 0.5) * 40 - 10;
    }
    return pos;
  }, []);

  const color = useMemo(() => {
    switch (era.lightingPreset) {
      case 'sepia': return "#d4a373";
      case 'amber': return "#ffb703";
      case 'orange': return "#fb8500";
      case 'blue-warm': return "#023e8a";
      case 'white': return "#ffffff";
      case 'white-gold': return "#ffd60a";
      default: return "#ffffff";
    }
  }, [era.lightingPreset]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={100} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.5} color={color} transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
};
