import { useMemo } from "react";
import { FloatingFrame } from "./FloatingFrame";
import { Director } from "../../lib/directorData";

export const FilmConstellation = ({ director }: { director: Director }) => {
  const positions = useMemo(() => {
    // Generate a semi-circle or scattered layout around the director center
    return director.famousMovies.map((movie, i) => {
      const angle = (i / director.famousMovies.length) * Math.PI - Math.PI / 2; // Spread across arc
      const radius = 8;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius - 5;
      const y = (Math.random() - 0.5) * 4;
      return { 
        movie, 
        pos: [x, y, z] as [number, number, number],
        rot: [0, -angle, 0] as [number, number, number]
      };
    });
  }, [director]);

  return (
    <group position={[0, 0, -5]}>
      {positions.map((item, i) => (
        <FloatingFrame key={i} movie={item.movie} position={item.pos} rotation={item.rot} />
      ))}
    </group>
  );
};
