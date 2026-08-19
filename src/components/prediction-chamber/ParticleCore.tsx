import { useShallow } from 'zustand/react/shallow';
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePredictionEngine } from "../../hooks/usePredictionEngine";

export const ParticleCore = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const { phase, progress } = usePredictionEngine(
    useShallow(s => ({ phase: s.phase, progress: s.progress }))
  );
  
  const particleCount = 2000;
  
  const { positions, randomFactors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const rand = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      // Sphere distribution
      const radius = 5 + Math.random() * 15;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
      
      rand[i] = Math.random();
    }
    return { positions: pos, randomFactors: rand };
  }, []);

  const materialRef = useRef<THREE.PointsMaterial>(null);

  useFrame((state, delta) => {
    if (!particlesRef.current || !materialRef.current) return;
    
    // Base rotation
    particlesRef.current.rotation.y += delta * 0.05;
    
    // Scale and opacity based on phase
    let targetScale = 1;
    let targetOpacity = 0.2;
    
    if (phase === 'converging') {
      const convergeProgress = Math.max(0, Math.min(1, (progress - 0.5) / 0.2));
      // Particles get sucked into the core
      targetScale = 1 - convergeProgress * 0.8; 
      targetOpacity = 0.2 + convergeProgress * 0.8;
      particlesRef.current.rotation.y += delta * convergeProgress * 2; // spin faster
    } else if (phase === 'revealing' || phase === 'complete') {
      targetScale = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.05; // pulsing core
      targetOpacity = 0.8;
      particlesRef.current.rotation.y += delta * 0.5;
    }
    
    const currentScale = particlesRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, delta * 3);
    particlesRef.current.scale.set(newScale, newScale, newScale);
    
    materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, targetOpacity, delta * 3);
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
        ref={materialRef}
        size={0.05}
        color="#00d2ff"
        transparent
        opacity={0.2}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
