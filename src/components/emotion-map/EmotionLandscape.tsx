import { useMemo } from 'react';
import { EmotionEnvironment } from './EmotionEnvironment';
import { EmotionRegion } from './EmotionRegion';
import { EmotionMovieNode } from './EmotionMovieNode';
import { EmotionConnection } from './EmotionConnection';
import { EmotionMapCamera } from './EmotionMapCamera';
import { useEmotionMap } from '../../hooks/useEmotionMap';
import { useEmotionRegions } from '../../hooks/useEmotionRegions';
import { useMemoryHistory } from '../../hooks/useMemoryHistory';
import { calculateMoodTargetPositions } from '../../lib/emotionCoordinates';
import { EMOTION_MAP_MOVIES } from '../../lib/emotionMapData';

export const EmotionLandscape = () => {
  const {
    movies,
    selectedMovieId,
    hoveredMovieId,
    selectedRegionId,
    hoveredRegionId,
    isTransforming,
    transformStep,
    focalMovieId,
    setSelectedMovie,
    setHoveredMovie,
    setSelectedRegion,
    setHoveredRegion,
  } = useEmotionMap();

  const { recordInteraction } = useMemoryHistory();

  const { regions } = useEmotionRegions();

  // Compute dynamic positions based on active mood/region selection
  const targetPositions = useMemo(() => {
    return calculateMoodTargetPositions(
      movies,
      selectedRegionId || hoveredRegionId,
      []
    );
  }, [movies, selectedRegionId, hoveredRegionId]);

  // Extract all 3D connections between movies
  const connectionsList = useMemo(() => {
    const list: Array<{
      id: string;
      sourceMovieId: string;
      targetMovieId: string;
      startPos: [number, number, number];
      endPos: [number, number, number];
      strength: number;
      sharedEmotions: string[];
      isHighlighted: boolean;
    }> = [];

    movies.forEach((m) => {
      m.connections.forEach((conn) => {
        const targetMovie = movies.find((tm) => tm.id === conn.targetMovieId);
        if (targetMovie) {
          const startPos = targetPositions[m.id] || m.coordinates;
          const endPos = targetPositions[targetMovie.id] || targetMovie.coordinates;

          const isConnHighlighted =
            selectedMovieId === m.id ||
            selectedMovieId === targetMovie.id ||
            hoveredMovieId === m.id ||
            hoveredMovieId === targetMovie.id;

          list.push({
            id: `${m.id}-${conn.targetMovieId}`,
            sourceMovieId: m.id,
            targetMovieId: conn.targetMovieId,
            startPos,
            endPos,
            strength: conn.strength,
            sharedEmotions: conn.sharedEmotions,
            isHighlighted: isConnHighlighted,
          });
        }
      });
    });

    return list;
  }, [movies, targetPositions, selectedMovieId, hoveredMovieId]);

  return (
    <group>
      <EmotionEnvironment />
      <EmotionMapCamera />

      {/* Render 3D Emotional Regions */}
      {regions.map((region) => (
        <EmotionRegion
          key={region.id}
          region={region}
          isSelected={selectedRegionId === region.id}
          isHovered={hoveredRegionId === region.id}
          onClick={() => setSelectedRegion(selectedRegionId === region.id ? null : region.id)}
          onHover={(hovered) => setHoveredRegion(hovered ? region.id : null)}
        />
      ))}

      {/* Render 3D Movie Connections */}
      {connectionsList.map((conn) => (
        <EmotionConnection
          key={conn.id}
          startPos={conn.startPos}
          endPos={conn.endPos}
          strength={conn.strength}
          sharedEmotions={conn.sharedEmotions}
          isHighlighted={conn.isHighlighted}
        />
      ))}

      {/* Render 3D Movie Nodes */}
      {movies.map((movie) => {
        const targetPos = targetPositions[movie.id] || movie.coordinates;
        const isMovieHighlighted =
          selectedMovieId === movie.id ||
          hoveredMovieId === movie.id ||
          (selectedRegionId !== null &&
            movie.emotionalScores.some((s) => s.emotionId === selectedRegionId && s.strength > 0.6));

        return (
          <EmotionMovieNode
            key={movie.id}
            movie={movie}
            targetPos={targetPos}
            isHighlighted={isMovieHighlighted}
            onClick={() => {
              const newSelected = selectedMovieId === movie.id ? null : movie.id;
              setSelectedMovie(newSelected);
              if (newSelected) {
                recordInteraction(movie.id, 'Selected', 'Emotion Map', movie.primaryEmotionId);
              }
            }}
            onHover={(hovered) => setHoveredMovie(hovered ? movie.id : null)}
          />
        );
      })}
    </group>
  );
};
