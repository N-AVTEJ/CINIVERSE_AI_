import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const DNAParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 3000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Cylinder distribution along Y axis
      const radius = 5 + Math.random() * 20;
      const theta = Math.random() * 2 * Math.PI;
      const y = 20 - Math.random() * 200; // Match the length of the DNA
      
      pos[i * 3] = radius * Math.cos(theta);
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = radius * Math.sin(theta);
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;
    
    // Slow drift upward
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 1] += delta * (0.5 + Math.random() * 0.5);
      // Reset if they go too high
      if (positions[i * 3 + 1] > 20) {
        positions[i * 3 + 1] = -180;
      }
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Global rotation
    particlesRef.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
};
