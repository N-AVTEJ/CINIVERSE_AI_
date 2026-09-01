import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEraTransition } from "../../hooks/useEraTransition";
import { useShallow } from "zustand/react/shallow";

export const EraTransition = () => {
  const { isTransitioning, transitionType, endTransition } = useEraTransition(
    useShallow(s => ({ 
      isTransitioning: s.isTransitioning, 
      transitionType: s.transitionType,
      endTransition: s.endTransition
    }))
  );
  
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const transitionProgressRef = useRef(1);

  useFrame((state, delta) => {
    if (isTransitioning) {
      transitionProgressRef.current = Math.max(0, transitionProgressRef.current - delta * 1.5);
      
      if (meshRef.current) {
        // Place in front of camera
        meshRef.current.position.copy(state.camera.position);
        meshRef.current.quaternion.copy(state.camera.quaternion);
        meshRef.current.translateZ(-0.5);
      }
      
      if (materialRef.current) {
        const baseOpacity = transitionType === 'film-burn' || transitionType === 'projector-flash' ? 0.8 : 0.3;
        materialRef.current.opacity = transitionProgressRef.current * baseOpacity;
        
        switch (transitionType) {
          case 'film-burn': materialRef.current.color.set("#ff5500"); break;
          case 'projector-flash': materialRef.current.color.set("#ffffff"); break;
          case 'light-bloom': materialRef.current.color.set("#0088ff"); break;
          case 'ribbon': materialRef.current.color.set("#ffd700"); break;
          default: materialRef.current.color.set("#ffffff"); break;
        }
      }

      if (transitionProgressRef.current <= 0) {
        endTransition();
        transitionProgressRef.current = 1;
      }
    } else {
      transitionProgressRef.current = 1;
    }
  });

  if (!isTransitioning) return null;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[5, 5]} />
      <meshBasicMaterial 
        ref={materialRef} 
        transparent 
        opacity={0} 
        blending={THREE.AdditiveBlending} 
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
};
