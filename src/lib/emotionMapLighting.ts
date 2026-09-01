import { EMOTION_REGIONS, EmotionRegionData } from './emotionRegions';

export interface LightingPreset {
  ambientColor: string;
  ambientIntensity: number;
  directionalColor: string;
  directionalIntensity: number;
  pointLightColor: string;
  pointLightIntensity: number;
  fogColor: string;
  fogDensity: number;
}

export const DEFAULT_EMOTION_MAP_LIGHTING: LightingPreset = {
  ambientColor: '#0a0f1d',
  ambientIntensity: 0.8,
  directionalColor: '#60a5fa',
  directionalIntensity: 1.5,
  pointLightColor: '#38bdf8',
  pointLightIntensity: 2.0,
  fogColor: '#030712',
  fogDensity: 0.015,
};

export function getLightingPresetForEmotion(emotionId: string | null): LightingPreset {
  if (!emotionId) return DEFAULT_EMOTION_MAP_LIGHTING;

  const region = EMOTION_REGIONS.find((r) => r.id === emotionId);
  if (!region) return DEFAULT_EMOTION_MAP_LIGHTING;

  return {
    ambientColor: region.lightingPreset.ambient,
    ambientIntensity: 1.2,
    directionalColor: region.lightingPreset.directional,
    directionalIntensity: region.lightingPreset.pointIntensity,
    pointLightColor: region.color,
    pointLightIntensity: region.lightingPreset.pointIntensity * 1.3,
    fogColor: region.fogColor,
    fogDensity: region.environmentPreset.fogDensity,
  };
}
