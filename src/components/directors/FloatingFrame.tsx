import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float, Html } from "@react-three/drei";
import * as THREE from "three";

interface FloatingFrameProps {
  movie: { title: string; year: string; rating: string };
  position: [number, number, number];
  rotation?: [number, number, number];
}

export const FloatingFrame = ({ movie, position, rotation = [0, 0, 0] }: FloatingFrameProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const targetScale = hovered ? 1.1 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group 
        ref={meshRef} 
        position={position} 
        rotation={rotation}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Frame / Glass */}
        <mesh>
          <planeGeometry args={[4, 2.5]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            transmission={0.9} 
            opacity={1} 
            metalness={0.1} 
            roughness={0.2}
            emissive={hovered ? "#3366ff" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : 0}
          />
        </mesh>
        
        {/* Border */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[4.2, 2.7]} />
          <meshBasicMaterial color={hovered ? "#ffffff" : "#333333"} />
        </mesh>

        {hovered && (
          <Html position={[0, -1.8, 0]} center transform className="pointer-events-none">
            <div className="bg-black/80 backdrop-blur-md border border-white/20 p-4 rounded-xl w-64 text-center">
              <h4 className="font-heading text-lg text-white mb-1">{movie.title}</h4>
              <div className="flex items-center justify-center gap-3 text-xs text-cine-muted">
                <span>{movie.year}</span>
                <span className="w-1 h-1 rounded-full bg-cine-gold"></span>
                <span>IMDb {movie.rating}</span>
              </div>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
};
