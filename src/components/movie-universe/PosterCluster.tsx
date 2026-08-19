import { useMemo } from "react";
import { MoviePoster } from "./MoviePoster";
import { moviesData } from "../../lib/posterData";
import { generateSpatialPositions } from "../../lib/depthSystem";

export const PosterCluster = () => {
  // Memoize positions so they don't change on re-render
  const positions = useMemo(() => generateSpatialPositions(moviesData.length), []);

  return (
    <div className="absolute inset-0 w-full h-full" style={{ transformStyle: "preserve-3d" }}>
      {moviesData.map((movie, idx) => (
        <MoviePoster 
          key={movie.id} 
          movie={movie} 
          position={positions[idx]} 
          index={idx}
        />
      ))}
    </div>
  );
};
