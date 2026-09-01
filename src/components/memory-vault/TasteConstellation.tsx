import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TasteProfile } from '../../lib/memoryModel';

interface TasteConstellationProps {
  tasteProfile: TasteProfile;
}

export const TasteConstellation = ({ tasteProfile }: TasteConstellationProps) => {
  const groupRef = useRef<THREE.Group>(null);

  const clusters = useMemo(() => {
    const list: Array<{
      id: string;
      label: string;
      position: [number, number, number];
      color: string;
      size: number;
    }> = [];

    // Emotions
    tasteProfile.emotions.slice(0, 3).forEach((e, idx) => {
      list.push({
        id: `emo-${e.id}`,
        label: e.name,
        position: [8 + idx * 3, 5 + idx * 2, -20 - idx * 10],
        color: '#38bdf8',
        size: 0.8 + e.score * 0.6,
      });
    });

    // Genres
    tasteProfile.genres.slice(0, 3).forEach((g, idx) => {
      list.push({
        id: `gen-${g.id}`,
        label: g.name,
        position: [-10 - idx * 3, -4 - idx * 2, -25 - idx * 12],
        color: '#818cf8',
        size: 0.8 + g.score * 0.6,
      });
    });

    // Directors
    tasteProfile.directors.slice(0, 2).forEach((d, idx) => {
      list.push({
        id: `dir-${d.id}`,
        label: d.name,
        position: [12, -6, -40 - idx * 15],
        color: '#fbbf24',
        size: 1.0,
      });
    });

    return list;
  }, [tasteProfile]);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {clusters.map((c) => (
        <group key={c.id} position={c.position}>
          {/* Glowing central light sphere */}
          <mesh>
            <sphereGeometry args={[c.size, 16, 16]} />
            <meshBasicMaterial color={c.color} transparent opacity={0.65} wireframe />
          </mesh>

          {/* Core light point */}
          <pointLight color={c.color} intensity={1.5} distance={15} />
        </group>
      ))}
    </group>
  );
};
