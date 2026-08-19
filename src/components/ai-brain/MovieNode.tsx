import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GraphNode } from "../../lib/graphData";

interface MovieNodeProps {
  node: GraphNode;
  isActive: boolean;
  isRecommended: boolean;
}

export const MovieNode = ({ node, isActive, isRecommended }: MovieNodeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Base color logic
  let targetColor = new THREE.Color("#444444");
  let targetScale = 1;
  let targetOpacity = 0.5;

  if (isActive) {
    targetColor = new THREE.Color("#d4af37"); // Gold for active
    targetScale = 2.5;
    targetOpacity = 1;
  } else if (isRecommended) {
    targetColor = new THREE.Color("#ffffff"); // White for recommended
    targetScale = 1.8;
    targetOpacity = 0.9;
  }

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Smoothly animate scale and color
    const material = meshRef.current.material as THREE.MeshBasicMaterial;
    
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 4);
    material.color.lerp(targetColor, delta * 3);
    material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, delta * 3);
  });

  return (
    <mesh ref={meshRef} position={node.position as [number, number, number]}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshBasicMaterial 
        color="#444444" 
        transparent 
        opacity={0.5} 
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};
