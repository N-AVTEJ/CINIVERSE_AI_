import { MovieMemory } from './memoryModel';

export type MemoryObjectType = 'film-frame' | 'film-reel' | 'glass-photo' | 'poster-fragment' | 'prism';

export interface SpatialMemoryObject {
  memory: MovieMemory;
  position: [number, number, number];
  rotation: [number, number, number];
  objectType: MemoryObjectType;
  layerLevel: number;
  scale: number;
  glowIntensity: number;
}

export function calculateMemorySpatialLayout(
  memories: MovieMemory[],
  activeFilter?: string
): SpatialMemoryObject[] {
  const objectTypes: MemoryObjectType[] = [
    'film-frame',
    'film-reel',
    'glass-photo',
    'poster-fragment',
    'prism',
  ];

  return memories.map((mem, index) => {
    // 3D positioning in vault depth
    const layerLevel = Math.min(7, Math.floor(index / 2) + 1);
    const zBase = -(layerLevel - 1) * 14;

    // Golden angle arrangement in architectural hallway
    const angle = index * 2.39996; // Golden angle in radians
    const radius = 6 + (index % 3) * 3;

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * (radius * 0.5) + (index % 2 === 0 ? 1 : -1) * 1.5;
    const z = zBase - (index % 4) * 2;

    const rotX = (Math.random() - 0.5) * 0.2;
    const rotY = -Math.atan2(x, -z);
    const rotZ = (Math.random() - 0.5) * 0.15;

    const objectType = objectTypes[index % objectTypes.length];
    const scale = 0.9 + (mem.importance / 5) * 0.4 + (mem.repeatCount > 1 ? 0.2 : 0);
    const glowIntensity = 0.4 + (mem.importance / 5) * 0.5;

    return {
      memory: mem,
      position: [x, y, z],
      rotation: [rotX, rotY, rotZ],
      objectType,
      layerLevel,
      scale,
      glowIntensity,
    };
  });
}
