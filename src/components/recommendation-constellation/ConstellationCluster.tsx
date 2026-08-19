import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { movieUniverseData, MovieNode } from "../../lib/movieUniverse";
import { useConstellationGraph } from "../../hooks/useConstellationGraph";
import { useShallow } from 'zustand/react/shallow';

const MovieStarNode = ({ movie }: { movie: MovieNode }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { hoveredMovieId, setHoveredMovieId, selectedMovieId, setSelectedMovieId } = useConstellationGraph(
    useShallow(s => ({ 
      hoveredMovieId: s.hoveredMovieId, 
      setHoveredMovieId: s.setHoveredMovieId, 
      selectedMovieId: s.selectedMovieId, 
      setSelectedMovieId: s.setSelectedMovieId 
    }))
  );
  
  const isHovered = hoveredMovieId === movie.id;
  const isSelected = selectedMovieId === movie.id;
  
  const isActive = isHovered || isSelected;
  const targetScale = useRef(1);

  useFrame((state, delta) => {
    if (!meshRef.current || !glowRef.current) return;
    
    // Scale animation
    const desired = isActive ? 2.5 : 1;
    targetScale.current = THREE.MathUtils.lerp(targetScale.current, desired, delta * 5);
    
    meshRef.current.scale.setScalar(targetScale.current);
    glowRef.current.scale.setScalar(targetScale.current * 1.5);
    
    // Breathing
    const time = state.clock.elapsedTime;
    const breathe = 1 + 0.1 * Math.sin(time * 2 + movie.coordinates[0]);
    
    // Color intensity
    const material = meshRef.current.material as THREE.MeshBasicMaterial;
    const glowMaterial = glowRef.current.material as THREE.MeshBasicMaterial;
    
    if (isActive) {
      material.color.setHex(0xffffff);
      glowMaterial.opacity = 0.8 * breathe;
    } else {
      // If something is selected and it's not this one, dim it slightly
      if (selectedMovieId) {
        material.color.setHex(0x666688);
        glowMaterial.opacity = 0.1;
      } else {
        material.color.setHex(0xaaddff);
        glowMaterial.opacity = 0.4 * breathe;
      }
    }
  });

  return (
    <group position={new THREE.Vector3(...movie.coordinates)}>
      {/* Core Star */}
      <mesh 
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHoveredMovieId(movie.id); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHoveredMovieId(null); document.body.style.cursor = 'default'; }}
        onClick={(e) => { e.stopPropagation(); setSelectedMovieId(movie.id); }}
      >
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial color="#aaddff" />
      </mesh>

      {/* Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color="#0088ff" transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Label */}
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.8}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
        fillOpacity={isActive ? 1 : (selectedMovieId ? 0.2 : 0.6)}
      >
        {movie.title}
      </Text>
      
      {/* Point Light when active */}
      {isActive && (
        <pointLight color="#0088ff" intensity={2} distance={15} decay={2} />
      )}
    </group>
  );
};

export const ConstellationCluster = () => {
  return (
    <group>
      {movieUniverseData.map((movie) => (
        <MovieStarNode key={movie.id} movie={movie} />
      ))}
    </group>
  );
};
