import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment, Float } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

const CrystalPrism = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float floatIntensity={2} speed={1.5} rotationIntensity={0.5}>
      <mesh ref={meshRef} scale={1.5}>
        <octahedronGeometry args={[1.5, 0]} />
        <MeshTransmissionMaterial 
          thickness={1.5}
          roughness={0.1}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.06}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          backside
        />
      </mesh>
    </Float>
  );
};

export const HeroCenterpiece = () => {
  return (
    <div className="hero-centerpiece absolute top-1/2 left-1/2 md:left-2/3 md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] z-10 pointer-events-none mix-blend-screen opacity-0">
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
          <spotLight position={[-10, 0, -10]} intensity={3} color="#d4af37" />
          <CrystalPrism />
          <Environment preset="city" />
        </Canvas>
      </Suspense>
    </div>
  );
};
