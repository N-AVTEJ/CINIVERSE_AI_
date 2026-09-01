import { EmotionFog } from './EmotionFog';
import { EmotionLighting } from './EmotionLighting';
import { EmotionParticles } from './EmotionParticles';

export const EmotionEnvironment = () => {
  return (
    <group>
      <EmotionFog />
      <EmotionLighting />
      <EmotionParticles />

      {/* Deep atmospheric backdrop plane */}
      <mesh position={[0, 0, -45]}>
        <planeGeometry args={[160, 100]} />
        <meshBasicMaterial color="#020617" transparent opacity={0.9} />
      </mesh>
    </group>
  );
};
