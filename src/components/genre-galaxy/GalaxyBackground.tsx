import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { StarField } from "./StarField";
import { NebulaCloud } from "./NebulaCloud";
import { AuroraLayer } from "./AuroraLayer";

export const GalaxyBackground = () => {
  return (
    <group>
      <StarField />
      <NebulaCloud />
      <AuroraLayer />
      
      {/* Background ambient fog */}
      <fog attach="fog" args={["#020202", 50, 400]} />
    </group>
  );
};
