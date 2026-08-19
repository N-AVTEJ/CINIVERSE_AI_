import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const CinematicMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  // A simple glowing cinematic mesh effect
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color("#030303") },
      uColor2: { value: new THREE.Color("#1a1a1a") },
      uGlow: { value: new THREE.Color("#d4af37").multiplyScalar(0.15) },
    }),
    []
  );

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 10, 32, 32]} />
      <meshBasicMaterial color="#030303" wireframe={false} opacity={0.8} transparent />
    </mesh>
  );
};

export const BackgroundLayer = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-cine-bg">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_#1a1b1f_0%,_#050505_100%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,_transparent_20%,_rgba(0,0,0,0.8)_100%)] z-20" />
      
      {/* Three.js Canvas Placeholder for cinematic effects */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.3 }}
      >
        <CinematicMesh />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
      </Canvas>
    </div>
  );
};
