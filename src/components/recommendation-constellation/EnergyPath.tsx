import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useConstellationGraph } from "../../hooks/useConstellationGraph";
import { useShallow } from 'zustand/react/shallow';

interface EnergyPathProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
  strength: number;
  sourceId: string;
  targetId: string;
}

export const EnergyPath = ({ start, end, strength, sourceId, targetId }: EnergyPathProps) => {
  const lineRef = useRef<THREE.Line>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  const { selectedMovieId, hoveredMovieId } = useConstellationGraph(
    useShallow(s => ({ selectedMovieId: s.selectedMovieId, hoveredMovieId: s.hoveredMovieId }))
  );

  // Create a curved path
  const curve = useMemo(() => {
    const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    // Add some random arc to the midpoint to make it curved
    const distance = start.distanceTo(end);
    
    // Use the IDs to generate a deterministic pseudo-random offset
    const seed = sourceId.charCodeAt(0) + targetId.charCodeAt(0);
    const offsetX = (Math.sin(seed) * distance * 0.2);
    const offsetY = (Math.cos(seed) * distance * 0.2);
    
    midPoint.x += offsetX;
    midPoint.y += offsetY;
    
    return new THREE.QuadraticBezierCurve3(start, midPoint, end);
  }, [start, end, sourceId, targetId]);

  const points = useMemo(() => curve.getPoints(50), [curve]);
  
  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  // Particles that travel along the path
  const particleCount = Math.floor(strength * 20); // More particles for stronger connections
  const particleData = useMemo(() => {
    const data = [];
    for (let i = 0; i < particleCount; i++) {
      data.push({
        t: Math.random(), // position along curve (0-1)
        speed: 0.2 + Math.random() * 0.3, // travel speed
      });
    }
    return data;
  }, [particleCount]);

  const particlePositions = useMemo(() => new Float32Array(particleCount * 3), [particleCount]);

  useFrame((state, delta) => {
    const isSourceActive = selectedMovieId === sourceId || hoveredMovieId === sourceId;
    const isTargetActive = selectedMovieId === targetId || hoveredMovieId === targetId;
    const isActive = isSourceActive || isTargetActive;
    
    // Update line opacity based on selection
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      const targetOpacity = isActive ? 0.6 : (selectedMovieId ? 0.05 : 0.2);
      material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, delta * 3);
      material.color.setHex(isActive ? 0x00d2ff : 0x444466);
    }

    // Update travelling particles
    if (particlesRef.current) {
      const material = particlesRef.current.material as THREE.PointsMaterial;
      material.opacity = isActive ? 0.8 : (selectedMovieId ? 0.1 : 0.3);
      material.size = isActive ? 0.15 : 0.05;

      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const pData = particleData[i];
        pData.t += delta * pData.speed * (isActive ? 2 : 1);
        if (pData.t > 1) pData.t = 0;
        
        // Travel direction depends on which node is active, or random if none
        const actualT = isTargetActive && !isSourceActive ? 1 - pData.t : pData.t;
        
        const pos = curve.getPoint(actualT);
        positions[i * 3] = pos.x;
        positions[i * 3 + 1] = pos.y;
        positions[i * 3 + 2] = pos.z;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* @ts-ignore - R3F line primitive type collision with SVG line */}
      <line ref={lineRef as any} geometry={lineGeometry}>
        <lineBasicMaterial color="#444466" transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
      </line>
      
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={particlePositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  );
};
