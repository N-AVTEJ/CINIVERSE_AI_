import { useMemo } from 'react';
import { MovieMemory } from '../../lib/memoryModel';
import { calculateMemorySpatialLayout } from '../../lib/memoryTimeline';
import { MemoryObject } from './MemoryObject';

interface MemoryClusterProps {
  memories: MovieMemory[];
  selectedMemoryId: string | null;
  activeFilter: string | null;
  onSelectMemory: (id: string | null) => void;
}

export const MemoryCluster = ({
  memories,
  selectedMemoryId,
  activeFilter,
  onSelectMemory,
}: MemoryClusterProps) => {
  const spatialObjects = useMemo(() => {
    return calculateMemorySpatialLayout(memories, activeFilter || undefined);
  }, [memories, activeFilter]);

  return (
    <group>
      {spatialObjects.map((obj) => (
        <MemoryObject
          key={obj.memory.id}
          memory={obj.memory}
          position={obj.position}
          rotation={obj.rotation}
          objectType={obj.objectType}
          scale={obj.scale}
          isSelected={selectedMemoryId === obj.memory.id}
          onSelect={() =>
            onSelectMemory(selectedMemoryId === obj.memory.id ? null : obj.memory.id)
          }
        />
      ))}
    </group>
  );
};
