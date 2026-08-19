import { useMemo } from 'react';
import { useMovieShowcase } from './useMovieShowcase';
import { AtmospherePreset } from '../lib/movieAtmospheres';

export function useMovieAtmosphere(): {
  atmosphere: AtmospherePreset;
  ambientGlowStyle: React.CSSProperties;
} {
  const { activeMovie } = useMovieShowcase();

  const atmosphere = activeMovie.atmospherePreset;

  const ambientGlowStyle = useMemo<React.CSSProperties>(() => {
    return {
      background: `radial-gradient(circle at 50% 30%, ${atmosphere.primaryColor}25 0%, ${atmosphere.accentColor}10 40%, ${atmosphere.fogColor} 90%)`,
    };
  }, [atmosphere]);

  return {
    atmosphere,
    ambientGlowStyle,
  };
}
