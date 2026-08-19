export interface SpatialPosition {
  x: number; // Viewport width percentage (-50 to 50)
  y: number; // Viewport height percentage (-50 to 50)
  z: number; // Depth (-2000 to 1000)
  scale: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  layer: number;
}

export const generateSpatialPositions = (count: number): SpatialPosition[] => {
  const positions: SpatialPosition[] = [];
  
  for (let i = 0; i < count; i++) {
    // Determine layer (1-6) based on index to ensure distribution
    const layer = (i % 6) + 1;
    
    // Depth mapping based on layer
    // Layer 1: Very distant
    // Layer 6: Foreground
    const zBase = -3000 + (layer * 600);
    const zVariance = (Math.sin(i * 12.5) * 200);
    const z = zBase + zVariance;
    
    // Spread X widely, but keep closer items more central
    const spreadFactor = 1.2 + (layer * 0.1);
    const xBase = Math.cos(i * 13.7) * 45 * spreadFactor;
    
    // Spread Y vertically
    const yBase = Math.sin(i * 17.3) * 40 * spreadFactor;
    
    // Scale adjusts slightly for variety, but depth handles most size perception
    const scale = 0.8 + Math.abs(Math.cos(i * 9.1)) * 0.4;
    
    // Subtle initial rotations
    const rotationX = Math.sin(i * 11.4) * 15; // -15 to 15 deg
    const rotationY = Math.cos(i * 7.9) * 20;  // -20 to 20 deg
    const rotationZ = Math.sin(i * 5.3) * 5;   // -5 to 5 deg
    
    positions.push({
      x: xBase,
      y: yBase,
      z,
      scale,
      rotationX,
      rotationY,
      rotationZ,
      layer
    });
  }
  
  return positions;
};
