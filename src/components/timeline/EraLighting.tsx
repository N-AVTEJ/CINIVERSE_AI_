import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CinemaEra } from "../../lib/cinemaHistory";

export const EraLighting = ({ era, isActive }: { era: CinemaEra; isActive: boolean }) => {
  const lightRef = useRef<THREE.PointLight>(null);
  const targetIntensity = useRef(0);

  const color = useMemo(() => {
    switch (era.lightingPreset) {
      case 'sepia': return new THREE.Color("#d4a373");
      case 'amber': return new THREE.Color("#ffb703");
      case 'orange': return new THREE.Color("#fb8500");
      case 'blue-warm': return new THREE.Color("#023e8a");
      case 'white': return new THREE.Color("#ffffff");
      case 'white-gold': return new THREE.Color("#ffd60a");
      default: return new THREE.Color("#ffffff");
    }
  }, [era.lightingPreset]);

  useFrame((_, delta) => {
    if (!lightRef.current) return;
    targetIntensity.current = isActive ? 5 : 0.5;
    lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, targetIntensity.current, delta * 2);
  });

  return (
    <group>
      <pointLight
        ref={lightRef}
        position={[0, 0, 5]}
        color={color}
        distance={60}
        decay={2}
      />
      {/* If active, add a subtle colored fog or bloom by placing a large low-opacity sprite */}
      {isActive && (
        <sprite position={[0, 0, -10]} scale={[80, 80, 1]}>
          <spriteMaterial color={color} transparent opacity={0.03} blending={THREE.AdditiveBlending} depthWrite={false} />
        </sprite>
      )}
    </group>
  );
};
