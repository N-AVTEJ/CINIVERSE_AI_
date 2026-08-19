import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const InfiniteStarfield = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 8000;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const starData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      // Spread across a large volume
      const x = (Math.random() - 0.5) * 400;
      const y = (Math.random() - 0.5) * 400;
      const z = (Math.random() - 0.5) * 400;
      
      const scale = 0.1 + Math.random() * 0.4;
      
      // Temperature colors (blue, white, yellow, orange)
      const colors = ["#ffffff", "#aaccff", "#ffddaa", "#ffaa88", "#eef0ff"];
      const color = new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
      
      // Twinkle speed
      const speed = 0.5 + Math.random() * 2;
      const phase = Math.random() * Math.PI * 2;
      
      data.push({ x, y, z, scale, color, speed, phase });
    }
    return data;
  }, []);

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    starData.forEach((star, i) => {
      star.color.toArray(arr, i * 3);
    });
    return arr;
  }, [starData]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    starData.forEach((star, i) => {
      dummy.position.set(star.x, star.y, star.z);
      
      // Twinkle effect
      const currentScale = star.scale * (0.8 + 0.2 * Math.sin(time * star.speed + star.phase));
      dummy.scale.set(currentScale, currentScale, currentScale);
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    
    // Very slow global rotation
    meshRef.current.rotation.y = time * 0.005;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 4, 4]}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </sphereGeometry>
      <meshBasicMaterial vertexColors transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} fog={true} />
    </instancedMesh>
  );
};
