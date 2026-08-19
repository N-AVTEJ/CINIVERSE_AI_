import { Canvas } from '@react-three/fiber';
import { MovieShowcaseItem } from '../../lib/moviePresentation';
import { MovieLighting } from './MovieLighting';
import { MovieParticles } from './MovieParticles';
import { ParallaxOffsets } from '../../hooks/useMovieReveal';

interface MovieAtmosphereProps {
  movie: MovieShowcaseItem;
  parallax: ParallaxOffsets;
  reducedMotion?: boolean;
}

export const MovieAtmosphere = ({
  movie,
  parallax,
  reducedMotion = false,
}: MovieAtmosphereProps) => {
  const atmosphere = movie.atmospherePreset;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Layer 1: Blurred enlarged background artwork */}
      <div
        className="absolute -inset-10 transition-transform duration-300 ease-out opacity-40 scale-110"
        style={{
          transform: `translate3d(${parallax.bgX}px, ${parallax.bgY}px, 0)`,
        }}
      >
        <img
          src={movie.backdrop || movie.poster}
          alt=""
          className="w-full h-full object-cover filter blur-2xl contrast-125 saturate-150 brightness-75"
          loading="lazy"
        />
        {/* Ambient Color Extraction Gradient Mesh Overlay */}
        <div
          className="absolute inset-0 transition-colors duration-1000"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${atmosphere.primaryColor}35 0%, ${atmosphere.accentColor}20 50%, ${atmosphere.fogColor} 95%)`,
          }}
        />
      </div>

      {/* Layer 2: 3D WebGL Atmospheric Canvas (Light Rays & Floating Dust Particles) */}
      <div className="absolute inset-0 z-1">
        <Canvas
          camera={{ position: [0, 0, 20], fov: 50 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <MovieLighting atmosphere={atmosphere} />
          <MovieParticles atmosphere={atmosphere} reducedMotion={reducedMotion} />
        </Canvas>
      </div>

      {/* Film Grain Texture Overlay */}
      <div
        className="absolute inset-0 z-2 pointer-events-none mix-blend-overlay"
        style={{
          opacity: atmosphere.filmGrainOpacity,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Cinematic Vignette */}
      <div
        className="absolute inset-0 z-3 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, transparent 40%, black ${
            atmosphere.vignetteStrength * 100
          }%)`,
        }}
      />
    </div>
  );
};
