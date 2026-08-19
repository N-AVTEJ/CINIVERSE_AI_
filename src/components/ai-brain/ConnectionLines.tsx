import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GraphNode } from "../../lib/graphData";

interface ConnectionLinesProps {
  nodes: GraphNode[];
  activeNode: GraphNode | null;
  recommendedNodes: GraphNode[];
  isThinking: boolean;
}

export const ConnectionLines = ({ nodes, activeNode, recommendedNodes, isThinking }: ConnectionLinesProps) => {
  const lineRef = useRef<THREE.LineSegments>(null);

  // Generate line geometry once
  const { positions, colors } = useMemo(() => {
    const posArray: number[] = [];
    const colorArray: number[] = [];
    const baseColor = new THREE.Color("#1a1a2e"); // Dim dark blue

    nodes.forEach(node => {
      node.connections.forEach(targetId => {
        const target = nodes.find(n => n.id === targetId);
        if (target) {
          posArray.push(...node.position);
          posArray.push(...target.position);
          
          colorArray.push(baseColor.r, baseColor.g, baseColor.b);
          colorArray.push(baseColor.r, baseColor.g, baseColor.b);
        }
      });
    });

    return { 
      positions: new Float32Array(posArray),
      colors: new Float32Array(colorArray)
    };
  }, [nodes]);

  // Update colors based on active/recommended state
  useFrame((state, delta) => {
    if (!lineRef.current) return;
    
    const geometry = lineRef.current.geometry;
    const colorAttr = geometry.attributes.color as THREE.BufferAttribute;
    
    const time = state.clock.getElapsedTime();
    const pulsePhase = (Math.sin(time * 5) + 1) / 2; // 0 to 1

    let idx = 0;
    nodes.forEach(node => {
      node.connections.forEach(targetId => {
        const target = nodes.find(n => n.id === targetId);
        if (target) {
          let c1 = new THREE.Color("#1a1a2e");
          let c2 = new THREE.Color("#1a1a2e");

          const isNodeActive = activeNode?.id === node.id || activeNode?.id === target.id;
          const isTargetRecommended = recommendedNodes.some(n => n.id === node.id || n.id === target.id);
          const isDirectConnection = activeNode && (
            (activeNode.id === node.id && recommendedNodes.some(n => n.id === target.id)) ||
            (activeNode.id === target.id && recommendedNodes.some(n => n.id === node.id))
          );

          if (isThinking && isNodeActive) {
            c1 = new THREE.Color("#d4af37"); // Gold pulse
            c1.multiplyScalar(0.5 + pulsePhase * 0.5);
            c2 = c1;
          } else if (isDirectConnection) {
            c1 = new THREE.Color("#ffffff");
            c2 = new THREE.Color("#d4af37");
          }

          colorAttr.setXYZ(idx, c1.r, c1.g, c1.b);
          colorAttr.setXYZ(idx + 1, c2.r, c2.g, c2.b);
          idx += 2;
        }
      });
    });

    colorAttr.needsUpdate = true;
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={positions.length / 3} 
          array={positions} 
          itemSize={3} 
        />
        <bufferAttribute 
          attach="attributes-color" 
          count={colors.length / 3} 
          array={colors} 
          itemSize={3} 
        />
      </bufferGeometry>
      <lineBasicMaterial 
        vertexColors 
        transparent 
        opacity={0.3} 
        blending={THREE.AdditiveBlending} 
        depthWrite={false}
      />
    </lineSegments>
  );
};
