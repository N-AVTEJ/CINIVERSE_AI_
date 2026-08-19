import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const NebulaCloud = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const clouds = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 300,
          (Math.random() - 0.5) * 300,
          -100 - Math.random() * 800
        ] as [number, number, number],
        scale: 40 + Math.random() * 60,
        opacity: 0.05 + Math.random() * 0.05,
        rotationSpeed: (Math.random() - 0.5) * 0.005
      });
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.rotation.z += clouds[i].rotationSpeed;
      });
    }
  });

  // Create a procedural soft circle texture for the clouds
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext('2d');
    if (context) {
      const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 64, 64);
    }
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  return (
    <group ref={groupRef}>
      {clouds.map((cloud, i) => (
        <mesh key={i} position={cloud.position}>
          <planeGeometry args={[cloud.scale, cloud.scale]} />
          <meshBasicMaterial 
            map={texture}
            color={new THREE.Color().setHSL(Math.random(), 0.5, 0.5)}
            transparent
            opacity={cloud.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};
