import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { HallArchitecture } from "./HallArchitecture";
import { DirectorWorld } from "./DirectorWorld";
import { directorData } from "../../lib/directorData";
import { useDirectorWorld } from "../../hooks/useDirectorWorld";
import { useShallow } from "zustand/react/shallow";

interface HallSceneProps {
  progress: number;
}

export const HallScene = ({ progress }: HallSceneProps) => {
  const { camera } = useThree();
  const { activeDirectorId, isInsideWorld, cameraTransitionProgress, updateTransition } = useDirectorWorld(
    useShallow(s => ({
      activeDirectorId: s.activeDirectorId,
      isInsideWorld: s.isInsideWorld,
      cameraTransitionProgress: s.cameraTransitionProgress,
      updateTransition: s.updateTransition
    }))
  );

  const activeDirector = directorData.find(d => d.id === activeDirectorId);
  const whiteScreenRef = useRef<THREE.MeshBasicMaterial>(null);

  // Maximum distance down the hallway
  const maxZ = -200;

  useFrame((state, delta) => {
    if (activeDirectorId && !isInsideWorld) {
      // Transitioning into a world
      updateTransition(cameraTransitionProgress + delta * 0.5); // 2-second transition

      if (whiteScreenRef.current) {
        whiteScreenRef.current.opacity = cameraTransitionProgress;
      }
      
      // Move camera slightly forward during transition to simulate flying into portal
      camera.position.z -= delta * 10;

    } else if (!activeDirectorId && !isInsideWorld) {
      // Normal hallway scrolling
      const targetZ = maxZ * progress;
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, delta * 3);
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, delta * 2);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 5, delta * 2);
      camera.lookAt(0, 5, camera.position.z - 40);
      
      if (whiteScreenRef.current) {
        whiteScreenRef.current.opacity = 0;
      }
    } else if (isInsideWorld && activeDirectorId) {
      // Inside world - camera logic is handled by DirectorWorld
      // But we need to fade the white screen out
      if (whiteScreenRef.current && whiteScreenRef.current.opacity > 0) {
        whiteScreenRef.current.opacity = Math.max(0, whiteScreenRef.current.opacity - delta);
      }
    }
  });

  return (
    <>
      {/* If we are NOT fully inside the world, render the hallway */}
      {!isInsideWorld && (
        <group>
          <color attach="background" args={["#020202"]} />
          <fog attach="fog" args={["#020202", 10, 100]} />
          <ambientLight intensity={0.2} color="#ffffff" />
          <pointLight position={[0, 10, 0]} intensity={1} distance={50} />
          
          <HallArchitecture />
        </group>
      )}

      {/* If we ARE inside the world, render the specific world */}
      {isInsideWorld && activeDirector && (
        <DirectorWorld director={activeDirector} />
      )}

      {/* Transition Overlay - attached to camera */}
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial ref={whiteScreenRef} color="#ffffff" transparent opacity={0} depthTest={false} depthWrite={false} />
      </mesh>
    </>
  );
};
