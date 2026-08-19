import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitMovieData } from "../../lib/genreData";

interface OrbitMovieProps {
  movie: OrbitMovieData;
  position: [number, number, number];
  planetScale: number;
  index: number;
}

export const OrbitMovie = ({ movie, position, planetScale, index }: OrbitMovieProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  const texture = useMemo(() => {
    // We would use useLoader(THREE.TextureLoader, movie.poster) here,
    // but for stability and performance without suspense, we'll create a basic material
    // and load it asynchronously
    const tex = new THREE.TextureLoader().load(movie.poster);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [movie.poster]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Billboarding - always face the camera
      meshRef.current.quaternion.copy(camera.quaternion);
      
      // Add slight floating motion
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2 + index) * 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[1.5, 2.25]} />
      <meshBasicMaterial 
        map={texture} 
        transparent 
        opacity={0.8}
        side={THREE.DoubleSide} 
      />
      {/* Soft glow behind the movie poster */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[1.8, 2.7]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.1} 
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </mesh>
  );
};
