import { useShallow } from 'zustand/react/shallow';
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { usePredictionEngine } from "../../hooks/usePredictionEngine";
import { preferenceFragmentsData } from "../../lib/preferenceData";

export const PreferenceFragments = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { progress, phase } = usePredictionEngine(
    useShallow(s => ({ progress: s.progress, phase: s.phase }))
  );
  
  const fragments = useMemo(() => {
    return preferenceFragmentsData.map(f => ({
      ...f,
      targetPos: new THREE.Vector3(0, 0, 0), // center
      initialPos: new THREE.Vector3(...f.initialPosition),
      randomOffset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    groupRef.current.children.forEach((child, i) => {
      const frag = fragments[i];
      const time = state.clock.elapsedTime;
      
      if (phase === 'idle' || phase === 'scanning') {
        // Floating around initial position
        const floatY = Math.sin(time * 0.5 + frag.randomOffset) * 1.5;
        const floatX = Math.cos(time * 0.3 + frag.randomOffset) * 1.0;
        
        child.position.lerp(new THREE.Vector3(
          frag.initialPos.x + floatX,
          frag.initialPos.y + floatY,
          frag.initialPos.z
        ), delta * 2);
        
        // Gentle rotation
        child.rotation.y += delta * 0.2;
        child.rotation.x += delta * 0.1;
      } else if (phase === 'converging' || phase === 'revealing' || phase === 'complete') {
        // Converge to center based on progress (0.5 to 0.7)
        const convergeProgress = Math.max(0, Math.min(1, (progress - 0.5) / 0.2));
        
        const currentTarget = new THREE.Vector3().lerpVectors(frag.initialPos, frag.targetPos, convergeProgress);
        
        // Add swirling motion as they converge
        if (convergeProgress < 1) {
          const swirlRadius = (1 - convergeProgress) * 5;
          const swirlAngle = time * 2 + frag.randomOffset;
          currentTarget.x += Math.cos(swirlAngle) * swirlRadius;
          currentTarget.z += Math.sin(swirlAngle) * swirlRadius;
        }
        
        child.position.lerp(currentTarget, delta * 4);
        
        // Spin faster
        child.rotation.y += delta * (1 + convergeProgress * 5);
        child.rotation.x += delta * (0.5 + convergeProgress * 5);
        
        // Scale down slightly as they merge
        const scale = 1 - (convergeProgress * 0.5);
        child.scale.set(scale, scale, scale);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {fragments.map((frag, i) => (
        <group key={frag.id} position={frag.initialPosition}>
          {/* Glass Capsule */}
          <mesh>
            <capsuleGeometry args={[0.5, 2, 16, 16]} />
            <meshPhysicalMaterial 
              color="#ffffff"
              transmission={0.9}
              opacity={1}
              metalness={0.1}
              roughness={0.1}
              ior={1.5}
              thickness={0.5}
              transparent
            />
          </mesh>
          
          {/* Inner colored core */}
          <mesh scale={0.8}>
            <capsuleGeometry args={[0.3, 1.5, 8, 8]} />
            <meshBasicMaterial color={frag.color} transparent opacity={0.6} blending={THREE.AdditiveBlending} />
          </mesh>
          
          {/* Point light for emission */}
          <pointLight color={frag.color} intensity={0.5} distance={10} />

          {/* Label */}
          <Text
            position={[0, 2, 0]}
            fontSize={0.5}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/PlusJakartaSans-Bold.ttf"
          >
            {frag.label}
          </Text>
        </group>
      ))}
    </group>
  );
};
