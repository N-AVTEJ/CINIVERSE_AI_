import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEmotionBlend } from '../../hooks/useEmotionBlend';

export const EmotionEnvironment = () => {
  const blend = useEmotionBlend();
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.1;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <group>
      {/* Dynamic reflective floor plane */}
      <mesh position={[0, -12, -15]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial
          color="#030712"
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Abstract orbital rings representing the emotional spectrum */}
      <group ref={ringRef} position={[0, 0, -20]}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[18, 0.08, 16, 100]} />
          <meshBasicMaterial
            color={blend.primaryColor}
            transparent
            opacity={0.3}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[22, 0.05, 16, 100]} />
          <meshBasicMaterial
            color={blend.accentColor}
            transparent
            opacity={0.2}
          />
        </mesh>
      </group>
    </group>
  );
};
