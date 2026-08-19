import { useShallow } from 'zustand/react/shallow';
import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { graphNodes } from "../../lib/graphData";
import { MovieNode } from "./MovieNode";
import { ConnectionLines } from "./ConnectionLines";
import { useRecommendationGraph } from "../../hooks/useRecommendationGraph";

interface NeuralSphereProps {
  scrollCameraTarget: React.MutableRefObject<{ orbit: number, zoom: number }>;
}

export const NeuralSphere = ({ scrollCameraTarget }: NeuralSphereProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { activeNode, recommendedNodes, isThinking } = useRecommendationGraph(
    useShallow(s => ({ activeNode: s.activeNode, recommendedNodes: s.recommendedNodes, isThinking: s.isThinking }))
  );
  const { camera } = useThree();

  // Rotate entire sphere very slowly and handle camera orbit based on scroll
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005;
      groupRef.current.rotation.z += 0.0002;
    }

    // Camera orbit
    const target = scrollCameraTarget.current;
    const orbitRadius = target.zoom;
    
    // Smooth camera interpolation
    const currentX = camera.position.x;
    const currentZ = camera.position.z;
    
    const targetX = Math.sin(target.orbit) * orbitRadius;
    const targetZ = Math.cos(target.orbit) * orbitRadius;
    
    camera.position.x = THREE.MathUtils.lerp(currentX, targetX, 0.05);
    camera.position.z = THREE.MathUtils.lerp(currentZ, targetZ, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, Math.sin(target.orbit * 2) * 5, 0.05);
    
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef}>
      {/* Inner glowing core */}
      <mesh>
        <sphereGeometry args={[12, 64, 64]} />
        <meshBasicMaterial 
          color={isThinking ? "#d4af37" : "#1a1a2e"} 
          transparent 
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Connection Lines */}
      <ConnectionLines nodes={graphNodes} activeNode={activeNode} recommendedNodes={recommendedNodes} isThinking={isThinking} />

      {/* Nodes */}
      {graphNodes.map((node) => (
        <MovieNode 
          key={node.id} 
          node={node} 
          isActive={activeNode?.id === node.id}
          isRecommended={recommendedNodes.some(n => n.id === node.id)}
        />
      ))}
    </group>
  );
};
