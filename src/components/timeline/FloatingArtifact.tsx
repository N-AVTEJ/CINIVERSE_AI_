import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CinemaEra } from "../../lib/cinemaHistory";

export const FloatingArtifact = ({ era, isActive }: { era: CinemaEra; isActive: boolean }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * (isActive ? 0.5 : 0.1);
    meshRef.current.rotation.x += delta * (isActive ? 0.2 : 0.05);
  });

  const artifactColor = useMemo(() => {
    if (era.visualTheme === "monochrome") return "#888888";
    if (era.lightingPreset === "amber") return "#d4af37"; // cine-gold
    if (era.lightingPreset === "blue-warm") return "#0088ff";
    return "#ffffff";
  }, [era]);

  const renderArtifact = () => {
    switch (era.iconicObject) {
      case "projector":
        // Abstract projector: a box with a cylinder lens and two reels
        return (
          <group>
            <mesh position={[0, -0.5, 0]}>
              <boxGeometry args={[3, 2, 4]} />
              <meshStandardMaterial color="#222" metalness={0.8} roughness={0.4} />
            </mesh>
            <mesh position={[0, 0, 2.5]} rotation={[Math.PI/2, 0, 0]}>
              <cylinderGeometry args={[0.5, 0.5, 1, 16]} />
              <meshStandardMaterial color="#444" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[0, 1.5, -1]} rotation={[0, 0, Math.PI/2]}>
              <cylinderGeometry args={[1.5, 1.5, 0.2, 32]} />
              <meshStandardMaterial color={artifactColor} metalness={0.5} roughness={0.5} />
            </mesh>
            <mesh position={[0, 1.5, 1]} rotation={[0, 0, Math.PI/2]}>
              <cylinderGeometry args={[1.5, 1.5, 0.2, 32]} />
              <meshStandardMaterial color={artifactColor} metalness={0.5} roughness={0.5} />
            </mesh>
          </group>
        );
      case "spotlight":
        return (
          <group>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[1.5, 1, 3, 32]} />
              <meshStandardMaterial color="#111" metalness={0.8} roughness={0.3} />
            </mesh>
            <mesh position={[0, 1.5, 0]}>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial color={artifactColor} emissive={artifactColor} emissiveIntensity={isActive ? 2 : 0.5} />
            </mesh>
          </group>
        );
      case "director-chair":
        return (
          <group>
            <mesh position={[-1.5, 0, 0]}>
              <boxGeometry args={[0.2, 4, 0.2]} />
              <meshStandardMaterial color="#4a3b2c" />
            </mesh>
            <mesh position={[1.5, 0, 0]}>
              <boxGeometry args={[0.2, 4, 0.2]} />
              <meshStandardMaterial color="#4a3b2c" />
            </mesh>
            <mesh position={[0, -0.5, 0]}>
              <boxGeometry args={[3, 0.1, 2]} />
              <meshStandardMaterial color="#111" />
            </mesh>
            <mesh position={[0, 1.5, 0]}>
              <boxGeometry args={[3, 0.8, 0.1]} />
              <meshStandardMaterial color="#111" />
            </mesh>
          </group>
        );
      case "film-reel":
        return (
          <group>
            <mesh rotation={[Math.PI/2, 0, 0]}>
              <torusGeometry args={[2, 0.2, 16, 64]} />
              <meshStandardMaterial color={artifactColor} metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh rotation={[Math.PI/2, 0, 0]}>
              <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
              <meshStandardMaterial color="#222" metalness={0.8} />
            </mesh>
            {/* Spokes */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <mesh key={i} rotation={[Math.PI/2, 0, (i * Math.PI) / 3]} position={[0, 0, 0]}>
                <boxGeometry args={[4, 0.1, 0.1]} />
                <meshStandardMaterial color={artifactColor} metalness={0.8} roughness={0.2} />
              </mesh>
            ))}
          </group>
        );
      case "camera-lens":
        return (
          <group>
            <mesh rotation={[Math.PI/2, 0, 0]}>
              <cylinderGeometry args={[2, 2, 3, 32]} />
              <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh rotation={[Math.PI/2, 0, 0]} position={[0, 0, 1.6]}>
              <sphereGeometry args={[1.9, 32, 32, 0, Math.PI * 2, 0, Math.PI / 4]} />
              <meshPhysicalMaterial 
                color={artifactColor} 
                transmission={0.9} 
                opacity={1} 
                metalness={0} 
                roughness={0} 
                ior={1.5} 
                thickness={0.5} 
              />
            </mesh>
          </group>
        );
      case "crystal-core":
        return (
          <group>
            <mesh>
              <octahedronGeometry args={[2, 0]} />
              <meshPhysicalMaterial 
                color={artifactColor}
                emissive={artifactColor}
                emissiveIntensity={isActive ? 1 : 0.2}
                transmission={0.8}
                opacity={1}
                metalness={0.2}
                roughness={0.1}
                wireframe={!isActive}
              />
            </mesh>
            {isActive && (
              <mesh>
                <octahedronGeometry args={[2.2, 0]} />
                <meshBasicMaterial color={artifactColor} transparent opacity={0.1} wireframe />
              </mesh>
            )}
          </group>
        );
      default:
        return (
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color={artifactColor} />
          </mesh>
        );
    }
  };

  return (
    <group ref={meshRef}>
      {renderArtifact()}
    </group>
  );
};
