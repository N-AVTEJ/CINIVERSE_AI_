import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePlanetFocus } from "../../hooks/usePlanetFocus";
import { planetConfigs } from "../../lib/planetConfigs";

interface GalaxyCameraProps {
  scrollProgress: React.MutableRefObject<{ progress: number }>;
}

export const GalaxyCamera = ({ scrollProgress }: GalaxyCameraProps) => {
  const { camera } = useThree();
  const focusedPlanetId = usePlanetFocus(s => s.focusedPlanetId);

  useFrame((state, delta) => {
    if (focusedPlanetId && planetConfigs[focusedPlanetId]) {
      // Fly to focused planet
      const config = planetConfigs[focusedPlanetId];
      const targetPos = new THREE.Vector3(...config.position);
      
      // Target camera position is slightly offset from the planet
      const offset = new THREE.Vector3(config.scale * 1.5, config.scale * 0.5, config.scale * 2.5);
      const camTargetPos = targetPos.clone().add(offset);
      
      camera.position.lerp(camTargetPos, delta * 2);
      
      // Look at the planet but slightly to the left so the info panel fits on right
      const lookTarget = targetPos.clone().add(new THREE.Vector3(-config.scale * 0.5, 0, 0));
      
      // We need to lerp the lookAt target smoothly. We can use a dummy object or just lerp rotation.
      // For simplicity in this step, we'll smoothly look at it using quaternion slerp.
      const dummy = new THREE.Object3D();
      dummy.position.copy(camera.position);
      dummy.lookAt(lookTarget);
      camera.quaternion.slerp(dummy.quaternion, delta * 2);

    } else {
      // Normal scroll flight through the galaxy
      const progress = scrollProgress.current.progress;
      
      // Move from Z=50 to Z=-400
      const targetZ = 50 - (progress * 450);
      const targetX = Math.sin(progress * Math.PI * 2) * 20;
      const targetY = Math.cos(progress * Math.PI * 1.5) * 10;

      camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), delta * 2);
      
      // Look straight ahead with a slight drift
      const lookTarget = new THREE.Vector3(
        targetX + Math.sin(state.clock.elapsedTime * 0.1) * 5,
        targetY + Math.cos(state.clock.elapsedTime * 0.1) * 5,
        targetZ - 50
      );
      
      const dummy = new THREE.Object3D();
      dummy.position.copy(camera.position);
      dummy.lookAt(lookTarget);
      camera.quaternion.slerp(dummy.quaternion, delta * 2);
    }
  });

  return null;
};
