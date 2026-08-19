import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useConstellationGraph } from "../../hooks/useConstellationGraph";
import { useEffect, useRef } from "react";
import { useShallow } from 'zustand/react/shallow';

export const GalaxyCamera = () => {
  const { progress, cameraTarget } = useConstellationGraph(
    useShallow(s => ({ progress: s.progress, cameraTarget: s.cameraTarget }))
  );
  const { camera } = useThree();
  
  const currentPos = useRef(new THREE.Vector3(0, 0, 40));
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    // If we have a specific selected target, move toward it
    if (cameraTarget) {
      const targetVec = new THREE.Vector3(...cameraTarget);
      // Position slightly offset from the target
      const offset = new THREE.Vector3(0, 2, 12);
      
      currentPos.current.lerp(targetVec.clone().add(offset), delta * 2);
      lookAtTarget.current.lerp(targetVec, delta * 3);
    } else {
      // Default slow flight through the galaxy based on scroll progress
      // Map progress to Z movement and slow rotation
      const baseZ = 40 - progress * 100;
      const angle = progress * Math.PI * 0.5;
      
      const x = Math.sin(angle) * 20;
      const z = baseZ + Math.cos(angle) * 10;
      
      currentPos.current.lerp(new THREE.Vector3(x, 0, z), delta);
      lookAtTarget.current.lerp(new THREE.Vector3(0, 0, baseZ - 30), delta);
    }

    // Apply mouse parallax
    const parallaxX = mouse.current.x * (cameraTarget ? 1 : 5);
    const parallaxY = mouse.current.y * (cameraTarget ? 1 : 5);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, currentPos.current.x + parallaxX, delta * 3);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, currentPos.current.y + parallaxY, delta * 3);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, currentPos.current.z, delta * 3);

    camera.lookAt(lookAtTarget.current);
  });

  return null;
};
