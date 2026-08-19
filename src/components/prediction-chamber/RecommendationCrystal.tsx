import { useShallow } from 'zustand/react/shallow';
import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePredictionEngine } from "../../hooks/usePredictionEngine";
import { finalRecommendation } from "../../lib/recommendationLogic";

export const RecommendationCrystal = () => {
  const groupRef = useRef<THREE.Group>(null);
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const posterRef = useRef<THREE.Mesh>(null);
  
  const { phase, progress } = usePredictionEngine(
    useShallow(s => ({ phase: s.phase, progress: s.progress }))
  );
  const { camera } = useThree();

  const posterTexture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(finalRecommendation.poster);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || !outerMeshRef.current || !innerMeshRef.current || !posterRef.current) return;

    // Rotate crystal
    outerMeshRef.current.rotation.y += delta * 0.1;
    innerMeshRef.current.rotation.y -= delta * 0.15;
    innerMeshRef.current.rotation.x += delta * 0.05;

    // Hover effect
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5 + 2; // base offset

    if (phase === 'converging' || phase === 'revealing' || phase === 'complete') {
      const convergeProgress = Math.max(0, Math.min(1, (progress - 0.5) / 0.2));
      const revealProgress = Math.max(0, Math.min(1, (progress - 0.7) / 0.2));

      // Crystal scales up during converge
      const scale = 1 + convergeProgress * 1.5;
      outerMeshRef.current.scale.set(scale, scale, scale);
      innerMeshRef.current.scale.set(scale * 0.8, scale * 0.8, scale * 0.8);

      // Inner material becomes brighter
      (innerMeshRef.current.material as THREE.MeshBasicMaterial).opacity = 0.2 + convergeProgress * 0.6;
      
      // Poster appears
      posterRef.current.scale.setScalar(revealProgress);
      (posterRef.current.material as THREE.MeshBasicMaterial).opacity = revealProgress;
      
      // Poster faces camera
      if (revealProgress > 0) {
        // Soft lookat
        const dummy = new THREE.Object3D();
        dummy.position.copy(posterRef.current.getWorldPosition(new THREE.Vector3()));
        dummy.lookAt(camera.position);
        posterRef.current.quaternion.slerp(dummy.quaternion, delta * 5);
      }
    } else {
      // Reset defaults
      outerMeshRef.current.scale.set(1, 1, 1);
      innerMeshRef.current.scale.set(0.8, 0.8, 0.8);
      (innerMeshRef.current.material as THREE.MeshBasicMaterial).opacity = 0.2;
      posterRef.current.scale.setScalar(0);
      (posterRef.current.material as THREE.MeshBasicMaterial).opacity = 0;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Crystal Shell (Glass) */}
      <mesh ref={outerMeshRef}>
        <octahedronGeometry args={[2, 0]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          transmission={0.9}
          opacity={1}
          metalness={0.2}
          roughness={0.0}
          ior={1.5}
          thickness={1.5}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh ref={innerMeshRef}>
        <octahedronGeometry args={[2, 1]} />
        <meshBasicMaterial 
          color="#00d2ff" 
          transparent 
          opacity={0.2} 
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          wireframe={true}
        />
      </mesh>

      {/* Movie Poster that reveals inside/in front of the crystal */}
      <mesh ref={posterRef} position={[0, 0, 2.5]}>
        <planeGeometry args={[3, 4.5]} />
        <meshBasicMaterial 
          map={posterTexture} 
          transparent 
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};
