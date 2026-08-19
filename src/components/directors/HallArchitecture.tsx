import { useMemo } from "react";
import * as THREE from "three";
import { directorData } from "../../lib/directorData";
import { DirectorPortal } from "./DirectorPortal";

export const HallArchitecture = () => {
  // We have 12 directors. Let's space them down the hallway.
  // Z goes from -20 down to -300.
  const spacing = 30;

  const portals = useMemo(() => {
    return directorData.map((director, index) => {
      const z = -20 - Math.floor(index / 2) * spacing;
      // Alternate left and right side of the hallway
      const isLeft = index % 2 === 0;
      const x = isLeft ? -15 : 15;
      const rotY = isLeft ? Math.PI / 4 : -Math.PI / 4;

      return {
        director,
        position: [x, 0, z] as [number, number, number],
        rotation: [0, rotY, 0] as [number, number, number]
      };
    });
  }, []);

  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -0.5, -150]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 400]} />
        <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 20, -150]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 400]} />
        <meshStandardMaterial color="#020202" roughness={0.9} />
      </mesh>

      {/* Columns */}
      {[...Array(20)].map((_, i) => (
        <group key={i}>
          <mesh position={[-25, 10, -i * 20]}>
            <boxGeometry args={[2, 20, 2]} />
            <meshStandardMaterial color="#111111" />
          </mesh>
          <mesh position={[25, 10, -i * 20]}>
            <boxGeometry args={[2, 20, 2]} />
            <meshStandardMaterial color="#111111" />
          </mesh>
        </group>
      ))}

      {/* Portals */}
      {portals.map((p, i) => (
        <DirectorPortal key={i} director={p.director} position={p.position} rotation={p.rotation} />
      ))}
    </group>
  );
};
