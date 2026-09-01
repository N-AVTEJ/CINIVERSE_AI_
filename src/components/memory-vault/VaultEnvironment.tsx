import { VaultParticles } from './VaultParticles';
import { VaultLighting } from './VaultLighting';

interface VaultEnvironmentProps {
  focused: boolean;
}

export const VaultEnvironment = ({ focused }: VaultEnvironmentProps) => {
  return (
    <group>
      <fogExp2 attach="fog" args={['#020617', 0.012]} />
      <VaultLighting focused={focused} />
      <VaultParticles />

      {/* Architectural Vault Columns along the corridor */}
      {Array.from({ length: 8 }).map((_, i) => {
        const z = -i * 15;
        return (
          <group key={`arch-${i}`} position={[0, 0, z]}>
            {/* Left Column */}
            <mesh position={[-12, 0, 0]}>
              <boxGeometry args={[1.2, 30, 1.2]} />
              <meshStandardMaterial color="#0f172a" roughness={0.7} metalness={0.4} />
            </mesh>

            {/* Right Column */}
            <mesh position={[12, 0, 0]}>
              <boxGeometry args={[1.2, 30, 1.2]} />
              <meshStandardMaterial color="#0f172a" roughness={0.7} metalness={0.4} />
            </mesh>

            {/* Overhead Arch Beams */}
            <mesh position={[0, 14, 0]}>
              <boxGeometry args={[25.2, 0.8, 0.8]} />
              <meshStandardMaterial color="#1e293b" roughness={0.6} metalness={0.5} />
            </mesh>
          </group>
        );
      })}

      {/* Vault Floor reflecting subtle archive ambient */}
      <mesh position={[0, -10, -50]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[120, 200]} />
        <meshStandardMaterial color="#020617" roughness={0.9} metalness={0.2} />
      </mesh>

      {/* Far Backing Plane */}
      <mesh position={[0, 0, -110]}>
        <planeGeometry args={[160, 100]} />
        <meshBasicMaterial color="#020617" transparent opacity={0.95} />
      </mesh>
    </group>
  );
};
