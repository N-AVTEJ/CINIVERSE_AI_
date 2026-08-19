import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Director } from "../../lib/directorData";

export const DirectorEnvironment = ({ director }: { director: Director }) => {
  // Render specific geometries based on the director's visual language
  
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      if (director.environmentTheme === 'nolan') {
        meshRef.current.rotation.y += delta * 0.2;
        meshRef.current.rotation.z += delta * 0.1;
      } else if (director.environmentTheme === 'kubrick') {
        // Slow ominous scale
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05);
      } else {
        meshRef.current.rotation.y += delta * 0.05;
      }
    }
  });

  const renderGeometry = () => {
    switch(director.environmentTheme) {
      case 'nolan':
        return (
          <>
            <mesh rotation={[Math.PI/2, 0, 0]}>
              <torusGeometry args={[8, 0.2, 16, 100]} />
              <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh rotation={[0, Math.PI/4, 0]}>
              <torusGeometry args={[6, 0.4, 16, 100]} />
              <meshStandardMaterial color="#888888" metalness={0.5} roughness={0.5} />
            </mesh>
            <mesh>
              <octahedronGeometry args={[2, 0]} />
              <meshStandardMaterial color="#222222" wireframe />
            </mesh>
          </>
        );
      case 'spielberg':
        return (
          <>
            <mesh position={[0, -2, -10]}>
              <sphereGeometry args={[10, 64, 64]} />
              <meshBasicMaterial color="#ffaa00" transparent opacity={0.8} />
            </mesh>
            <mesh position={[0, -5, 0]} rotation={[-Math.PI/2, 0, 0]}>
              <planeGeometry args={[100, 100]} />
              <meshStandardMaterial color="#111111" roughness={0.8} />
            </mesh>
          </>
        );
      case 'villeneuve':
        return (
          <>
            <mesh position={[0, 5, -15]}>
              <boxGeometry args={[10, 30, 10]} />
              <meshStandardMaterial color="#333333" metalness={0.2} roughness={0.9} />
            </mesh>
            <mesh position={[-15, 0, -20]}>
              <boxGeometry args={[5, 15, 5]} />
              <meshStandardMaterial color="#222222" metalness={0.2} roughness={0.9} />
            </mesh>
            <mesh position={[15, 2, -10]}>
              <boxGeometry args={[8, 20, 8]} />
              <meshStandardMaterial color="#444444" metalness={0.2} roughness={0.9} />
            </mesh>
          </>
        );
      case 'miyazaki':
        return (
          <>
            {[...Array(15)].map((_, i) => (
              <mesh key={i} position={[
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 30 - 10
              ]}>
                <sphereGeometry args={[1 + Math.random() * 2, 16, 16]} />
                <meshStandardMaterial color="#aaddff" transparent opacity={0.6} />
              </mesh>
            ))}
          </>
        );
      case 'hitchcock':
        return (
          <>
            <mesh position={[0, 0, -10]} rotation={[0, 0, Math.PI/4]}>
              <boxGeometry args={[20, 1, 1]} />
              <meshBasicMaterial color="#000000" />
            </mesh>
            <mesh position={[0, 0, -12]} rotation={[0, 0, -Math.PI/4]}>
              <boxGeometry args={[20, 1, 1]} />
              <meshBasicMaterial color="#000000" />
            </mesh>
            <mesh position={[0, 0, -20]}>
              <planeGeometry args={[40, 40]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </>
        );
      case 'kubrick':
        return (
          <>
            <mesh position={[0, 0, -30]}>
              <boxGeometry args={[4, 12, 2]} />
              <meshStandardMaterial color="#000000" metalness={0.5} roughness={0.1} />
            </mesh>
            <mesh position={[-10, 0, -20]}>
              <boxGeometry args={[2, 20, 2]} />
              <meshStandardMaterial color="#ffffff" metalness={0.8} />
            </mesh>
            <mesh position={[10, 0, -20]}>
              <boxGeometry args={[2, 20, 2]} />
              <meshStandardMaterial color="#ffffff" metalness={0.8} />
            </mesh>
            <mesh position={[0, -5, 0]} rotation={[-Math.PI/2, 0, 0]}>
              <planeGeometry args={[50, 100]} />
              <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.1} />
            </mesh>
          </>
        );
      default:
        // Generic elegant museum display
        return (
          <>
            <mesh position={[0, 0, -10]}>
              <cylinderGeometry args={[10, 10, 0.5, 32]} />
              <meshStandardMaterial color="#222222" metalness={0.5} roughness={0.5} />
            </mesh>
            <mesh position={[0, -0.25, -10]}>
              <cylinderGeometry args={[12, 12, 0.2, 32]} />
              <meshStandardMaterial color="#111111" />
            </mesh>
          </>
        );
    }
  };

  return (
    <group ref={meshRef}>
      {renderGeometry()}
    </group>
  );
};
