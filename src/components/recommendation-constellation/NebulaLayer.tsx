import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const NebulaLayer = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    // Slow rotation for the nebula
    meshRef.current.rotation.y += delta * 0.01;
    meshRef.current.rotation.x += delta * 0.005;
  });

  return (
    <mesh ref={meshRef} scale={150}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial 
        color="#08081a" 
        transparent 
        opacity={0.3} 
        side={THREE.BackSide} 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
};
