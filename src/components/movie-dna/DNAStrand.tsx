import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDNAAnimation } from "../../hooks/useDNAAnimation";

export const DNAStrand = () => {
  const groupRef = useRef<THREE.Group>(null);
  const progress = useDNAAnimation(s => s.progress);
  
  const particleCount = 2000;
  const helixRadius = 3;
  const helixLength = 150; // Long enough to scroll through
  
  // Strand 1
  const positions1 = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      const y = -t * helixLength + 10; // start a bit above 0
      const angle = t * Math.PI * 20; // 10 turns
      
      pos[i * 3] = Math.cos(angle) * helixRadius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * helixRadius;
    }
    return pos;
  }, []);

  // Strand 2
  const positions2 = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      const y = -t * helixLength + 10;
      const angle = t * Math.PI * 20 + Math.PI; // Offset by PI
      
      pos[i * 3] = Math.cos(angle) * helixRadius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * helixRadius;
    }
    return pos;
  }, []);

  // Connecting rungs (base pairs)
  const rungCount = 200;
  const rungPositions = useMemo(() => {
    const pos = new Float32Array(rungCount * 3 * 2); // 2 points per line
    for (let i = 0; i < rungCount; i++) {
      const t = i / rungCount;
      const y = -t * helixLength + 10;
      const angle = t * Math.PI * 20;
      
      // Point 1
      pos[i * 6] = Math.cos(angle) * helixRadius;
      pos[i * 6 + 1] = y;
      pos[i * 6 + 2] = Math.sin(angle) * helixRadius;
      
      // Point 2
      pos[i * 6 + 3] = Math.cos(angle + Math.PI) * helixRadius;
      pos[i * 6 + 4] = y;
      pos[i * 6 + 5] = Math.sin(angle + Math.PI) * helixRadius;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Very slow continuous rotation
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Strand 1 */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions1.length / 3} array={positions1} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.15} color="#00d2ff" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      
      {/* Strand 2 */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions2.length / 3} array={positions2} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.15} color="#d4af37" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      {/* Rungs */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={rungPositions.length / 3} array={rungPositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
      </lineSegments>
      
      {/* Core glow */}
      <mesh>
        <cylinderGeometry args={[helixRadius - 0.5, helixRadius - 0.5, helixLength, 16, 1, true]} />
        <meshBasicMaterial color="#00d2ff" transparent opacity={0.02} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};
