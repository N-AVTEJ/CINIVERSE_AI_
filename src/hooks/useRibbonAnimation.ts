import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export const useRibbonAnimation = () => {
  const ribbonRef = useRef<any>(null);

  useFrame((state) => {
    if (ribbonRef.current && ribbonRef.current.material) {
      ribbonRef.current.material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
    }
  });

  return ribbonRef;
};
