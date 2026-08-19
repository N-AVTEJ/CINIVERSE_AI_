export interface AtmospherePreset {
  id: string;
  name: string;
  primaryColor: string;
  accentColor: string;
  fogColor: string;
  ambientColor: string;
  lightRayColor: string;
  particleColor: string;
  particleSpeed: number;
  particleMotion: 'float' | 'drift' | 'streak' | 'orbit' | 'ascend' | 'rain';
  fogDensity: number;
  bloomIntensity: number;
  vignetteStrength: number;
  filmGrainOpacity: number;
}

export const ATMOSPHERE_PRESETS: Record<string, AtmospherePreset> = {
  'sci-fi': {
    id: 'sci-fi',
    name: 'Cosmic Horizon',
    primaryColor: '#3b82f6',
    accentColor: '#60a5fa',
    fogColor: '#030712',
    ambientColor: '#0f172a',
    lightRayColor: '#93c5fd',
    particleColor: '#bfdbfe',
    particleSpeed: 0.02,
    particleMotion: 'float',
    fogDensity: 0.018,
    bloomIntensity: 1.8,
    vignetteStrength: 0.6,
    filmGrainOpacity: 0.08,
  },
  'dark-thriller': {
    id: 'dark-thriller',
    name: 'Abyssal Shadows',
    primaryColor: '#e11d48',
    accentColor: '#f43f5e',
    fogColor: '#090204',
    ambientColor: '#28040b',
    lightRayColor: '#fca5a5',
    particleColor: '#fecdd3',
    particleSpeed: 0.06,
    particleMotion: 'streak',
    fogDensity: 0.035,
    bloomIntensity: 1.4,
    vignetteStrength: 0.85,
    filmGrainOpacity: 0.12,
  },
  romance: {
    id: 'romance',
    name: 'Rose Quartz Dusk',
    primaryColor: '#db2777',
    accentColor: '#f472b6',
    fogColor: '#12030b',
    ambientColor: '#2b071a',
    lightRayColor: '#fbcfe8',
    particleColor: '#fce7f3',
    particleSpeed: 0.015,
    particleMotion: 'orbit',
    fogDensity: 0.02,
    bloomIntensity: 1.5,
    vignetteStrength: 0.5,
    filmGrainOpacity: 0.06,
  },
  fantasy: {
    id: 'fantasy',
    name: 'Prismatic Sanctuary',
    primaryColor: '#7c3aed',
    accentColor: '#a78bfa',
    fogColor: '#0c051a',
    ambientColor: '#220e45',
    lightRayColor: '#ddd6fe',
    particleColor: '#ede9fe',
    particleSpeed: 0.03,
    particleMotion: 'ascend',
    fogDensity: 0.022,
    bloomIntensity: 2.0,
    vignetteStrength: 0.55,
    filmGrainOpacity: 0.07,
  },
  drama: {
    id: 'drama',
    name: 'Contemplative Amber',
    primaryColor: '#d97706',
    accentColor: '#fbbf24',
    fogColor: '#0f0a02',
    ambientColor: '#211403',
    lightRayColor: '#fef08a',
    particleColor: '#fef9c3',
    particleSpeed: 0.012,
    particleMotion: 'drift',
    fogDensity: 0.025,
    bloomIntensity: 1.1,
    vignetteStrength: 0.7,
    filmGrainOpacity: 0.1,
  },
  adrenaline: {
    id: 'adrenaline',
    name: 'Kinetic Neon',
    primaryColor: '#ea580c',
    accentColor: '#f97316',
    fogColor: '#120702',
    ambientColor: '#301303',
    lightRayColor: '#ffedd5',
    particleColor: '#fed7aa',
    particleSpeed: 0.09,
    particleMotion: 'streak',
    fogDensity: 0.015,
    bloomIntensity: 2.2,
    vignetteStrength: 0.65,
    filmGrainOpacity: 0.09,
  },
  mystery: {
    id: 'mystery',
    name: 'Twilight Veil',
    primaryColor: '#4f46e5',
    accentColor: '#818cf8',
    fogColor: '#050512',
    ambientColor: '#111136',
    lightRayColor: '#c7d2fe',
    particleColor: '#e0e7ff',
    particleSpeed: 0.025,
    particleMotion: 'orbit',
    fogDensity: 0.028,
    bloomIntensity: 1.6,
    vignetteStrength: 0.75,
    filmGrainOpacity: 0.11,
  },
};

export function getAtmosphereForMovie(genre?: string, mood?: string): AtmospherePreset {
  const g = (genre || '').toLowerCase();
  const m = (mood || '').toLowerCase();

  if (g.includes('sci-fi') || g.includes('science fiction') || m.includes('wonder')) {
    return ATMOSPHERE_PRESETS['sci-fi'];
  }
  if (g.includes('action') || g.includes('thriller') && m.includes('adrenaline')) {
    return ATMOSPHERE_PRESETS['adrenaline'];
  }
  if (g.includes('horror') || (g.includes('thriller') && (m.includes('tension') || m.includes('fear')))) {
    return ATMOSPHERE_PRESETS['dark-thriller'];
  }
  if (g.includes('romance') || g.includes('love')) {
    return ATMOSPHERE_PRESETS['romance'];
  }
  if (g.includes('fantasy') || g.includes('animation')) {
    return ATMOSPHERE_PRESETS['fantasy'];
  }
  if (g.includes('mystery') || g.includes('crime')) {
    return ATMOSPHERE_PRESETS['mystery'];
  }

  // Default to drama/contemplative
  return ATMOSPHERE_PRESETS['drama'];
}
