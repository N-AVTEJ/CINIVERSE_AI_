import { useMemo } from 'react';
import { useEmotionBlend } from '../../hooks/useEmotionBlend';

export const EmotionAtmosphere = () => {
  const blend = useEmotionBlend();

  const fogColor = useMemo(() => blend.fogColor, [blend.fogColor]);
  const ambientColor = useMemo(() => blend.ambientColor, [blend.ambientColor]);
  const directionalColor = useMemo(() => blend.directionalColor, [blend.directionalColor]);

  return (
    <>
      <color attach="background" args={[fogColor]} />
      <fog attach="fog" args={[fogColor, 12, 65]} />

      <ambientLight intensity={0.6} color={ambientColor} />
      <directionalLight
        position={[10, 20, 15]}
        intensity={2.2}
        color={directionalColor}
        castShadow
      />
      <pointLight
        position={[0, 0, -10]}
        intensity={blend.pointIntensity * 1.5}
        color={blend.primaryColor}
        distance={45}
        decay={2}
      />

      {/* Atmospheric central glow aura mesh */}
      <mesh position={[0, 0, -20]}>
        <sphereGeometry args={[16, 32, 32]} />
        <meshBasicMaterial
          color={blend.primaryColor}
          transparent
          opacity={0.12 * blend.bloomIntensity}
          depthWrite={false}
        />
      </mesh>

      {/* Secondary accent bloom */}
      <mesh position={[0, -5, -15]}>
        <sphereGeometry args={[10, 32, 32]} />
        <meshBasicMaterial
          color={blend.accentColor}
          transparent
          opacity={0.08 * blend.bloomIntensity}
          depthWrite={false}
        />
      </mesh>
    </>
  );
};
