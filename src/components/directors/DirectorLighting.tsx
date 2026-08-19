import { useMemo } from "react";
import * as THREE from "three";
import { getLightingColors } from "../../lib/lightingPresets";

export const DirectorLighting = ({ preset }: { preset: string }) => {
  const colors = useMemo(() => getLightingColors(preset), [preset]);
  
  return (
    <>
      <color attach="background" args={[colors.fog]} />
      <fog attach="fog" args={[colors.fog, 10, 100]} />
      
      <ambientLight intensity={0.5} color={colors.ambient} />
      <directionalLight position={[10, 20, 10]} intensity={2} color={colors.main} castShadow />
      
      {/* Volumetric glow simulation */}
      <pointLight position={[0, 0, 0]} intensity={1} color={colors.main} distance={50} decay={2} />
    </>
  );
};
