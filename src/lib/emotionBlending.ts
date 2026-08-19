import * as THREE from 'three';
import { EMOTIONS, EmotionData } from './emotionData';

export interface BlendedEmotionProperties {
  primaryColor: string;
  accentColor: string;
  fogColor: string;
  fogDensity: number;
  bloomIntensity: number;
  particleCount: number;
  particleSpeed: number;
  particleSize: number;
  particleColor: string;
  motionType: 'float' | 'rain' | 'streak' | 'orbit' | 'pulse' | 'ascend' | 'drift';
  ambientColor: string;
  directionalColor: string;
  pointIntensity: number;
  cameraDistance: number;
  cameraFov: number;
}

export function computeBlendedEmotionProperties(selectedIds: string[]): BlendedEmotionProperties {
  if (selectedIds.length === 0) {
    // Default ambient idle state
    return {
      primaryColor: '#3b82f6',
      accentColor: '#60a5fa',
      fogColor: '#030712',
      fogDensity: 0.015,
      bloomIntensity: 1.2,
      particleCount: 1000,
      particleSpeed: 0.02,
      particleSize: 0.22,
      particleColor: '#93c5fd',
      motionType: 'float',
      ambientColor: '#0f172a',
      directionalColor: '#60a5fa',
      pointIntensity: 1.8,
      cameraDistance: 25,
      cameraFov: 55,
    };
  }

  const selectedEmotions = selectedIds
    .map((id) => EMOTIONS.find((e) => e.id === id))
    .filter((e): e is EmotionData => e !== undefined);

  if (selectedEmotions.length === 1) {
    const e = selectedEmotions[0];
    return {
      primaryColor: e.color,
      accentColor: e.accentColor,
      fogColor: e.fogColor,
      fogDensity: e.atmosphere.fogDensity,
      bloomIntensity: e.atmosphere.bloomIntensity,
      particleCount: e.particlePreset.count,
      particleSpeed: e.particlePreset.speed,
      particleSize: e.particlePreset.size,
      particleColor: e.particlePreset.color,
      motionType: e.particlePreset.motionType,
      ambientColor: e.lightingPreset.ambient,
      directionalColor: e.lightingPreset.directional,
      pointIntensity: e.lightingPreset.pointIntensity,
      cameraDistance: e.cameraPreset.distance,
      cameraFov: e.cameraPreset.fov,
    };
  }

  // Multi-emotion blending with THREE.Color interpolation and weighted averages
  const count = selectedEmotions.length;
  let totalWeight = 0;

  const cPrimary = new THREE.Color(0, 0, 0);
  const cAccent = new THREE.Color(0, 0, 0);
  const cFog = new THREE.Color(0, 0, 0);
  const cParticle = new THREE.Color(0, 0, 0);
  const cAmbient = new THREE.Color(0, 0, 0);
  const cDirectional = new THREE.Color(0, 0, 0);

  let fogDensitySum = 0;
  let bloomIntensitySum = 0;
  let particleCountSum = 0;
  let particleSpeedSum = 0;
  let particleSizeSum = 0;
  let pointIntensitySum = 0;
  let cameraDistanceSum = 0;
  let cameraFovSum = 0;

  selectedEmotions.forEach((e) => {
    const w = e.intensity;
    totalWeight += w;

    cPrimary.add(new THREE.Color(e.color).multiplyScalar(w));
    cAccent.add(new THREE.Color(e.accentColor).multiplyScalar(w));
    cFog.add(new THREE.Color(e.fogColor).multiplyScalar(w));
    cParticle.add(new THREE.Color(e.particlePreset.color).multiplyScalar(w));
    cAmbient.add(new THREE.Color(e.lightingPreset.ambient).multiplyScalar(w));
    cDirectional.add(new THREE.Color(e.lightingPreset.directional).multiplyScalar(w));

    fogDensitySum += e.atmosphere.fogDensity * w;
    bloomIntensitySum += e.atmosphere.bloomIntensity * w;
    particleCountSum += e.particlePreset.count * w;
    particleSpeedSum += e.particlePreset.speed * w;
    particleSizeSum += e.particlePreset.size * w;
    pointIntensitySum += e.lightingPreset.pointIntensity * w;
    cameraDistanceSum += e.cameraPreset.distance * w;
    cameraFovSum += e.cameraPreset.fov * w;
  });

  const invW = 1 / totalWeight;

  // Primary motion type is derived from the highest intensity emotion in the set
  const primaryEmotion = [...selectedEmotions].sort((a, b) => b.intensity - a.intensity)[0];

  return {
    primaryColor: '#' + cPrimary.multiplyScalar(invW).getHexString(),
    accentColor: '#' + cAccent.multiplyScalar(invW).getHexString(),
    fogColor: '#' + cFog.multiplyScalar(invW).getHexString(),
    fogDensity: fogDensitySum * invW,
    bloomIntensity: bloomIntensitySum * invW,
    particleCount: Math.round(particleCountSum * invW),
    particleSpeed: particleSpeedSum * invW,
    particleSize: particleSizeSum * invW,
    particleColor: '#' + cParticle.multiplyScalar(invW).getHexString(),
    motionType: primaryEmotion.particlePreset.motionType,
    ambientColor: '#' + cAmbient.multiplyScalar(invW).getHexString(),
    directionalColor: '#' + cDirectional.multiplyScalar(invW).getHexString(),
    pointIntensity: pointIntensitySum * invW,
    cameraDistance: cameraDistanceSum * invW,
    cameraFov: cameraFovSum * invW,
  };
}
