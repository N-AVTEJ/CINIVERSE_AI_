import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const AuroraLayer = () => {
  const groupRef = useRef<THREE.Group>(null);

  // We can simulate an aurora using a large tube or a series of planes with a wave shader
  // For simplicity and performance, we'll use a few large curved planes
  
  const auroras = useMemo(() => {
    return [
      { position: [0, 50, -400] as [number, number, number], color: "#00ff88", rotation: [Math.PI/2, 0, Math.PI/4] as [number, number, number] },
      { position: [0, -50, -600] as [number, number, number], color: "#ff00dd", rotation: [-Math.PI/2, 0, -Math.PI/4] as [number, number, number] }
    ];
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        // Wave motion
        child.position.y += Math.sin(state.clock.elapsedTime + i) * 0.05;
        child.rotation.z += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {auroras.map((aurora, i) => (
        <mesh key={i} position={aurora.position} rotation={aurora.rotation}>
          <planeGeometry args={[400, 100, 32, 8]} />
          <meshBasicMaterial 
            color={aurora.color} 
            transparent 
            opacity={0.03} 
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
            wireframe={true} // Using wireframe for a cool tech/energy wave effect
          />
        </mesh>
      ))}
    </group>
  );
};
