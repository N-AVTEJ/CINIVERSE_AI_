import { motion } from 'motion/react';
import { MovieShowcaseItem } from '../../lib/moviePresentation';
import { ParallaxOffsets } from '../../hooks/useMovieReveal';

interface MovieArtworkProps {
  movie: MovieShowcaseItem;
  parallax: ParallaxOffsets;
  openingProgress: number;
}

export const MovieArtwork = ({
  movie,
  parallax,
  openingProgress,
}: MovieArtworkProps) => {
  const atmosphere = movie.atmospherePreset;

  return (
    <div
      className="relative z-10 flex items-center justify-center w-full max-w-sm lg:max-w-md xl:max-w-lg aspect-[2/3] group"
      id={`showcase-poster-${movie.id}`}
    >
      {/* Background Poster Soft Glow Layer */}
      <motion.div
        className="absolute -inset-4 rounded-3xl opacity-60 filter blur-3xl transition-opacity duration-700 group-hover:opacity-90"
        style={{
          backgroundColor: atmosphere.primaryColor,
          transform: `translate3d(${parallax.artworkX * 0.5}px, ${parallax.artworkY * 0.5}px, 0)`,
        }}
        animate={{
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Primary Poster Frame with Parallax Tilt */}
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] bg-neutral-900"
        style={{
          transform: `translate3d(${parallax.artworkX}px, ${parallax.artworkY}px, 0)`,
        }}
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Anamorphic Flare Specular Reflection Highlight */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-70"
          style={{
            background: `linear-gradient(135deg, ${atmosphere.lightRayColor}55 0%, transparent 40%, transparent 60%, ${atmosphere.accentColor}33 100%)`,
          }}
        />

        {/* Poster Bottom Ambient Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Subtle Frame Edge Highlight */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/15 pointer-events-none" />
      </motion.div>
    </div>
  );
};
