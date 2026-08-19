import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { DNAAttribute } from "../../lib/dnaAttributes";
import { useDNAAnimation } from "../../hooks/useDNAAnimation";

interface Props {
  data: DNAAttribute;
}

export const DNAAttributeNode = ({ data }: Props) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const activeAttributeId = useDNAAnimation(s => s.activeAttributeId);
  const { camera } = useThree();
  
  const isActive = activeAttributeId === data.id;

  useFrame((state, delta) => {
    if (!groupRef.current || !coreRef.current || !ringRef.current) return;

    // Hover floating
    const time = state.clock.elapsedTime;
    groupRef.current.position.y = data.positionY + Math.sin(time * 2 + data.positionY) * 0.2;

    // Scale based on active state
    const targetScale = isActive ? 1.5 : 0.8;
    const currentScale = groupRef.current.scale.x;
    const scale = THREE.MathUtils.lerp(currentScale, targetScale, delta * 4);
    groupRef.current.scale.set(scale, scale, scale);

    // Rotate elements
    coreRef.current.rotation.y += delta * (isActive ? 1 : 0.2);
    coreRef.current.rotation.x += delta * (isActive ? 0.8 : 0.1);
    
    ringRef.current.rotation.z -= delta * (isActive ? 0.5 : 0.1);
    ringRef.current.rotation.x += delta * 0.2;

    // Face camera
    if (isActive) {
      const dummy = new THREE.Object3D();
      dummy.position.copy(groupRef.current.position);
      dummy.lookAt(camera.position);
      groupRef.current.quaternion.slerp(dummy.quaternion, delta * 2);
    }
  });

  // Render different geometries based on animationType (simplified)
  let coreGeometry = <icosahedronGeometry args={[0.5, 0]} />;
  let ringGeometry = <torusGeometry args={[1.2, 0.05, 16, 32]} />;

  if (data.animationType === 'golden-light') {
    coreGeometry = <octahedronGeometry args={[0.6, 0]} />;
  } else if (data.animationType === 'circular-orbit') {
    coreGeometry = <sphereGeometry args={[0.5, 16, 16]} />;
    ringGeometry = <torusGeometry args={[1.5, 0.02, 16, 64]} />;
  } else if (data.animationType === 'glass-shards') {
    coreGeometry = <dodecahedronGeometry args={[0.5, 0]} />;
  }

  return (
    <group ref={groupRef} position={[0, data.positionY, 0]}>
      {/* Core */}
      <mesh ref={coreRef}>
        {coreGeometry}
        <meshBasicMaterial 
          color={data.colorTheme}
          transparent
          opacity={isActive ? 0.9 : 0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer Ring / Effect */}
      <mesh ref={ringRef}>
        {ringGeometry}
        <meshBasicMaterial 
          color={data.colorTheme}
          transparent
          opacity={isActive ? 0.6 : 0.1}
          blending={THREE.AdditiveBlending}
          wireframe
        />
      </mesh>
      
      {/* Light emission */}
      {isActive && (
        <pointLight color={data.colorTheme} intensity={2} distance={10} />
      )}
    </group>
  );
};
