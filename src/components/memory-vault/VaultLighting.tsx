import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { VAULT_LIGHTING_PRESETS } from '../../lib/vaultLighting';

interface VaultLightingProps {
  focused: boolean;
}

export const VaultLighting = ({ focused }: VaultLightingProps) => {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const spotRef = useRef<THREE.SpotLight>(null);
  const pointRef = useRef<THREE.PointLight>(null);

  const preset = focused ? VAULT_LIGHTING_PRESETS.focused : VAULT_LIGHTING_PRESETS.default;

  useFrame((_, delta) => {
    if (ambientRef.current) {
      ambientRef.current.color.lerp(new THREE.Color(preset.ambientColor), delta * 2);
      ambientRef.current.intensity = THREE.MathUtils.lerp(
        ambientRef.current.intensity,
        preset.ambientIntensity,
        delta * 2
      );
    }

    if (spotRef.current) {
      spotRef.current.color.lerp(new THREE.Color(preset.spotlightColor), delta * 2);
      spotRef.current.intensity = THREE.MathUtils.lerp(
        spotRef.current.intensity,
        preset.spotlightIntensity,
        delta * 2
      );
    }

    if (pointRef.current) {
      pointRef.current.color.lerp(new THREE.Color(preset.vaultGlowColor), delta * 2);
      pointRef.current.intensity = THREE.MathUtils.lerp(
        pointRef.current.intensity,
        preset.vaultGlowIntensity,
        delta * 2
      );
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} args={['#0a0d18', 0.8]} />
      <spotLight
        ref={spotRef}
        position={[0, 25, 10]}
        angle={0.6}
        penumbra={0.8}
        args={['#e0f2fe', 2.2]}
      />
      <pointLight
        ref={pointRef}
        position={[0, -5, -30]}
        args={['#38bdf8', 1.5, 80]}
      />
    </>
  );
};
