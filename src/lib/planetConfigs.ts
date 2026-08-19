import * as THREE from 'three';

export interface PlanetConfig {
  id: string;
  position: [number, number, number];
  scale: number;
  textureType: 'metallic' | 'glass' | 'rock' | 'gas';
  baseColor: string;
  emissiveColor: string;
  emissiveIntensity: number;
  atmosphereColor: string;
  ringCount?: number;
  particlesMode: 'debris' | 'floating' | 'ash' | 'crystal' | 'sparkle' | 'petals';
}

export const planetConfigs: Record<string, PlanetConfig> = {
  action: {
    id: 'action',
    position: [0, 0, -50], // Initial planet
    scale: 12,
    textureType: 'metallic',
    baseColor: '#2a2a2a',
    emissiveColor: '#ff4d00',
    emissiveIntensity: 0.8,
    atmosphereColor: '#ff2a00',
    particlesMode: 'debris'
  },
  scifi: {
    id: 'scifi',
    position: [0, 0, -150], // Further back
    scale: 15,
    textureType: 'glass',
    baseColor: '#002244',
    emissiveColor: '#00d2ff',
    emissiveIntensity: 0.5,
    atmosphereColor: '#0077ff',
    ringCount: 3,
    particlesMode: 'floating'
  },
  horror: {
    id: 'horror',
    position: [0, 0, -250],
    scale: 10,
    textureType: 'rock',
    baseColor: '#1a0505',
    emissiveColor: '#cc0000',
    emissiveIntensity: 0.3,
    atmosphereColor: '#4d0000',
    particlesMode: 'ash'
  },
  fantasy: {
    id: 'fantasy',
    position: [0, 0, -350],
    scale: 14,
    textureType: 'gas',
    baseColor: '#332b00',
    emissiveColor: '#d4af37',
    emissiveIntensity: 0.4,
    atmosphereColor: '#ffcc00',
    particlesMode: 'crystal'
  },
  romance: {
    id: 'romance',
    position: [0, 0, -450],
    scale: 11,
    textureType: 'gas',
    baseColor: '#33001a',
    emissiveColor: '#ff4d94',
    emissiveIntensity: 0.5,
    atmosphereColor: '#ff80bf',
    particlesMode: 'petals'
  },
  comedy: {
    id: 'comedy',
    position: [0, 0, -550],
    scale: 13,
    textureType: 'glass',
    baseColor: '#333300',
    emissiveColor: '#ffff00',
    emissiveIntensity: 0.6,
    atmosphereColor: '#ffff80',
    particlesMode: 'sparkle'
  },
  drama: {
    id: 'drama',
    position: [0, 0, -650],
    scale: 12,
    textureType: 'rock',
    baseColor: '#1a1a2e',
    emissiveColor: '#4a4ae6',
    emissiveIntensity: 0.4,
    atmosphereColor: '#5c5cff',
    particlesMode: 'floating'
  },
  thriller: {
    id: 'thriller',
    position: [0, 0, -750],
    scale: 11,
    textureType: 'metallic',
    baseColor: '#0f172a',
    emissiveColor: '#0ea5e9',
    emissiveIntensity: 0.5,
    atmosphereColor: '#38bdf8',
    particlesMode: 'debris'
  },
  adventure: {
    id: 'adventure',
    position: [0, 0, -850],
    scale: 14,
    textureType: 'rock',
    baseColor: '#14532d',
    emissiveColor: '#22c55e',
    emissiveIntensity: 0.6,
    atmosphereColor: '#4ade80',
    particlesMode: 'floating'
  }
};
