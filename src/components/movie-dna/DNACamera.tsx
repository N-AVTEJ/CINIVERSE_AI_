import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useDNAAnimation } from "../../hooks/useDNAAnimation";
import { useEffect, useRef } from "react";

export const DNACamera = () => {
  const progress = useDNAAnimation(s => s.progress);
  const { camera } = useThree();
  
  // To allow for smooth interpolation
  const targetY = useRef(0);
  const targetZ = useRef(10);
  const targetRotation = useRef(0);

  // Mouse parallax
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
    // The DNA goes from y=10 to y=-140 (150 length)
    // Progress goes from 0 to 1
    // We want the camera to move down the y axis
    
    // We map progress 0->1 to Y=0 -> Y=-100
    targetY.current = -progress * 100;
    
    // Camera naturally rotates slightly as it moves down
    targetRotation.current = progress * Math.PI;

    // Smooth camera position
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY.current, delta * 8);
    
    // Parallax effect
    const parallaxX = mouse.current.x * 2;
    const parallaxY = mouse.current.y * 2;
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, parallaxX, delta * 6);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ.current + parallaxY, delta * 6);
    
    // Look at center slightly ahead
    const lookAtTarget = new THREE.Vector3(
      Math.sin(targetRotation.current) * 0.5,
      camera.position.y - 5,
      0
    );
    
    camera.lookAt(lookAtTarget);
  });

  return null;
};
