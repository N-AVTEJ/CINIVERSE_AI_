import { useShallow } from 'zustand/react/shallow';
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePredictionEngine } from "../../hooks/usePredictionEngine";

export const ChamberLighting = () => {
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);
  const { phase, progress } = usePredictionEngine(
    useShallow(s => ({ phase: s.phase, progress: s.progress }))
  );

  useFrame((state, delta) => {
    if (!spotLightRef.current || !coreLightRef.current) return;
    
    // Default lighting
    let spotIntensity = 0.5;
    let coreIntensity = 0.5;
    let coreColor = new THREE.Color("#4444ff"); // Soft blue initially

    if (phase === 'scanning') {
      const scanProgress = Math.max(0, Math.min(1, (progress - 0.2) / 0.3));
      spotIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 5) * 0.2; // flickering
      coreIntensity = 1 + scanProgress * 2;
    } else if (phase === 'converging') {
      const convergeProgress = Math.max(0, Math.min(1, (progress - 0.5) / 0.2));
      spotIntensity = 0.5 - convergeProgress * 0.5; // Dim the room
      coreIntensity = 3 + convergeProgress * 5; // Core gets very bright
      coreColor.lerp(new THREE.Color("#00d2ff"), convergeProgress);
    } else if (phase === 'revealing' || phase === 'complete') {
      spotIntensity = 0.1; // Room stays dark
      coreIntensity = 5;
      coreColor.set("#00d2ff");
    }

    spotLightRef.current.intensity = THREE.MathUtils.lerp(spotLightRef.current.intensity, spotIntensity, delta * 2);
    coreLightRef.current.intensity = THREE.MathUtils.lerp(coreLightRef.current.intensity, coreIntensity, delta * 2);
    coreLightRef.current.color.lerp(coreColor, delta * 2);
  });

  return (
    <group>
      <ambientLight intensity={0.1} color="#111122" />
      
      {/* Top down dramatic spotlight */}
      <spotLight 
        ref={spotLightRef}
        position={[0, 30, 0]} 
        angle={0.5} 
        penumbra={0.8} 
        intensity={0.5} 
        color="#ffffff"
        castShadow
      />
      
      {/* Central light inside the crystal */}
      <pointLight 
        ref={coreLightRef}
        position={[0, 2, 0]} 
        intensity={0.5} 
        distance={50} 
        color="#4444ff"
      />
    </group>
  );
};
