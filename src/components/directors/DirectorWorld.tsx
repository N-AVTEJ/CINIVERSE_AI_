import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { DirectorEnvironment } from "./DirectorEnvironment";
import { FilmConstellation } from "./FilmConstellation";
import { DirectorLighting } from "./DirectorLighting";
import { AtmosphericParticles } from "./AtmosphericParticles";
import { Director } from "../../lib/directorData";

export const DirectorWorld = ({ director }: { director: Director }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // On mount, position the camera safely inside this isolated world
  useEffect(() => {
    // We isolate worlds at Y = 2000 to keep them far away from the hallway
    camera.position.set(0, 2005, 15);
    camera.lookAt(0, 2000, 0);
  }, [camera]);

  // Subtle camera movement in the world
  useFrame((state, delta) => {
    const targetX = Math.sin(state.clock.elapsedTime * 0.2) * 2;
    const targetY = 2005 + Math.cos(state.clock.elapsedTime * 0.2) * 1;
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * 0.5);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, delta * 0.5);
    camera.lookAt(0, 2000, 0);
  });

  return (
    <group ref={groupRef} position={[0, 2000, 0]}>
      <DirectorLighting preset={director.lightingPreset} />
      <AtmosphericParticles />
      <DirectorEnvironment director={director} />
      <FilmConstellation director={director} />
    </group>
  );
};
