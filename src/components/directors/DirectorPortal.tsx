import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { Director } from "../../lib/directorData";
import { useDirectorWorld } from "../../hooks/useDirectorWorld";

interface DirectorPortalProps {
  director: Director;
  position: [number, number, number];
  rotation?: [number, number, number];
}

export const DirectorPortal = ({ director, position, rotation = [0, 0, 0] }: DirectorPortalProps) => {
  const portalRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const enterWorld = useDirectorWorld(s => s.enterWorld);

  useFrame((state, delta) => {
    if (!portalRef.current) return;
    const targetScale = hovered ? 1.05 : 1;
    portalRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
  });

  return (
    <group 
      ref={portalRef} 
      position={position} 
      rotation={rotation}
      onClick={(e) => { e.stopPropagation(); enterWorld(director.id); }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Portal Frame */}
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[4, 8, 0.5]} />
        <meshStandardMaterial 
          color={hovered ? "#ffffff" : "#222222"} 
          metalness={0.9} 
          roughness={0.2} 
        />
      </mesh>
      
      {/* Portal Opening (Glowing Glass) */}
      <mesh position={[0, 4, 0.1]}>
        <planeGeometry args={[3.6, 7.6]} />
        <meshBasicMaterial 
          color={hovered ? "#00aaff" : "#111111"} 
          transparent 
          opacity={hovered ? 0.8 : 0.2} 
        />
      </mesh>

      {/* Director Name Label */}
      <Text
        position={[0, 9, 0]}
        fontSize={0.6}
        color={hovered ? "#ffffff" : "#888888"}
        anchorX="center"
        anchorY="middle"
        font="/fonts/PlayfairDisplay-Bold.ttf"
      >
        {director.name}
      </Text>
    </group>
  );
};
