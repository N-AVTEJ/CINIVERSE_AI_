import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDNAAnimation } from "../../hooks/useDNAAnimation";
import { dnaAttributesData } from "../../lib/dnaAttributes";

export const DNALighting = () => {
  const activeAttributeId = useDNAAnimation(s => s.activeAttributeId);
  const pointLightRef = useRef<THREE.PointLight>(null);
  
  const activeAttribute = dnaAttributesData.find(a => a.id === activeAttributeId);
  const targetColor = useRef(new THREE.Color("#4444ff"));

  useFrame((state, delta) => {
    if (!pointLightRef.current) return;
    
    if (activeAttribute) {
      targetColor.current.set(activeAttribute.colorTheme);
    } else {
      targetColor.current.set("#4444ff");
    }
    
    pointLightRef.current.color.lerp(targetColor.current, delta * 2);
    
    // Follow camera roughly
    pointLightRef.current.position.y = state.camera.position.y - 10;
  });

  return (
    <group>
      <ambientLight intensity={0.1} color="#0a0a1a" />
      <pointLight 
        ref={pointLightRef}
        position={[0, 0, 0]} 
        intensity={2} 
        distance={40} 
        decay={2}
      />
      <directionalLight position={[10, 10, -10]} intensity={0.3} color="#ffffff" />
    </group>
  );
};
