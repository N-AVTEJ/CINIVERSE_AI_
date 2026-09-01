export interface VaultLightingPreset {
  ambientColor: string;
  ambientIntensity: number;
  spotlightColor: string;
  spotlightIntensity: number;
  vaultGlowColor: string;
  vaultGlowIntensity: number;
  fogColor: string;
  fogDensity: number;
}

export const VAULT_LIGHTING_PRESETS: Record<string, VaultLightingPreset> = {
  default: {
    ambientColor: '#0a0d18',
    ambientIntensity: 0.8,
    spotlightColor: '#e0f2fe',
    spotlightIntensity: 2.2,
    vaultGlowColor: '#38bdf8',
    vaultGlowIntensity: 1.5,
    fogColor: '#020617',
    fogDensity: 0.012,
  },
  focused: {
    ambientColor: '#030712',
    ambientIntensity: 0.5,
    spotlightColor: '#fef08a',
    spotlightIntensity: 3.5,
    vaultGlowColor: '#f59e0b',
    vaultGlowIntensity: 2.5,
    fogColor: '#020617',
    fogDensity: 0.018,
  },
  constellation: {
    ambientColor: '#0f172a',
    ambientIntensity: 1.0,
    spotlightColor: '#38bdf8',
    spotlightIntensity: 2.0,
    vaultGlowColor: '#818cf8',
    vaultGlowIntensity: 2.0,
    fogColor: '#080e22',
    fogDensity: 0.010,
  },
};
