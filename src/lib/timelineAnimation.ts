import * as THREE from "three";
import { CinemaEra } from "./cinemaHistory";

export const calculateCameraPosition = (progress: number, maxZ: number): THREE.Vector3 => {
  const targetZ = maxZ * progress;
  const targetX = Math.sin(progress * Math.PI * 4) * 5;
  const targetY = Math.cos(progress * Math.PI * 4) * 2;
  
  return new THREE.Vector3(targetX, targetY, targetZ);
};

export const getActiveEra = (currentZ: number, eras: CinemaEra[]): CinemaEra => {
  let active = eras[0];
  for (const era of eras) {
    if (currentZ <= era.position[2] + 20) {
      active = era;
    }
  }
  return active;
};
