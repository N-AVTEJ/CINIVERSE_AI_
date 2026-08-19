import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AtmospherePreset } from '../../lib/movieAtmospheres';

interface MovieLightingProps {
  atmosphere: AtmospherePreset;
}

export const MovieLighting = ({ atmosphere }: MovieLightingProps) => {
  const spotLightRef = useRef<THREE.SpotLight>(null);

  const primaryCol = new THREE.Color(atmosphere.primaryColor);
  const accentCol = new THREE.Color(atmosphere.accentColor);

  useFrame((state) => {
    if (spotLightRef.current) {
      spotLightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 4;
      spotLightRef.current.position.y = 12 + Math.cos(state.clock.elapsedTime * 0.3) * 2;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} color={atmosphere.ambientColor} />

      <directionalLight
        position={[10, 20, 15]}
        intensity={2.2}
        color={atmosphere.lightRayColor}
      />

      <spotLight
        ref={spotLightRef}
        position={[0, 15, 10]}
        angle={0.6}
        penumbra={0.8}
        intensity={3.5 * atmosphere.bloomIntensity}
        color={primaryCol}
        castShadow
      />

      <pointLight
        position={[0, -5, -8]}
        intensity={2.0}
        color={accentCol}
        distance={30}
      />
    </group>
  );
};
