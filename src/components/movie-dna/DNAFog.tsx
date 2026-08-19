import { useDNAAnimation } from "../../hooks/useDNAAnimation";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";
import { dnaAttributesData } from "../../lib/dnaAttributes";

export const DNAFog = () => {
  const fogRef = useRef<THREE.Fog>(null);
  const activeAttributeId = useDNAAnimation(s => s.activeAttributeId);
  const activeAttribute = dnaAttributesData.find(a => a.id === activeAttributeId);
  
  const targetColor = useRef(new THREE.Color("#020202"));

  useFrame((_, delta) => {
    if (!fogRef.current) return;
    
    if (activeAttribute) {
      // Very dark version of the theme color for fog
      const color = new THREE.Color(activeAttribute.colorTheme).multiplyScalar(0.1);
      targetColor.current.copy(color);
    } else {
      targetColor.current.set("#020202");
    }
    
    fogRef.current.color.lerp(targetColor.current, delta);
  });

  return <fog ref={fogRef} attach="fog" args={["#020202", 15, 50]} />;
};
