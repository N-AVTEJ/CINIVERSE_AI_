import { useMemo } from "react";
import * as THREE from "three";
import { cinemaEras } from "../../lib/cinemaHistory";
import { Line } from "@react-three/drei";
import { useRibbonAnimation } from "../../hooks/useRibbonAnimation";

export const TimelineRibbon = () => {
  const ribbonRef = useRibbonAnimation();
  
  // Create a curved path passing through all era positions
  const curve = useMemo(() => {
    const points = cinemaEras.map(era => new THREE.Vector3(...era.position));
    // Add an end point far away
    const lastPos = points[points.length - 1];
    points.push(new THREE.Vector3(lastPos.x, lastPos.y, lastPos.z - 100));
    
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const points = useMemo(() => {
    return curve.getPoints(200);
  }, [curve]);

  return (
    <Line
      ref={ribbonRef}
      points={points}
      color="#d4af37"
      lineWidth={2}
      transparent
      opacity={0.6}
    />
  );
};
