import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { MovieShowcaseItem } from '../../lib/moviePresentation';
import { ParallaxOffsets } from '../../hooks/useMovieReveal';

interface MovieTitleRevealProps {
  movie: MovieShowcaseItem;
  parallax: ParallaxOffsets;
}

export const MovieTitleReveal = ({
  movie,
  parallax,
}: MovieTitleRevealProps) => {
  const atmosphere = movie.atmospherePreset;

  return (
    <div
      className="space-y-3"
      style={{
        transform: `translate3d(${parallax.typographyX}px, ${parallax.typographyY}px, 0)`,
      }}
      id={`showcase-title-${movie.id}`}
    >
      {/* Mood Eyebrow Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-white/5 border border-white/10 text-neutral-300 backdrop-blur-md"
      >
        <Sparkles className="w-3.5 h-3.5" style={{ color: atmosphere.accentColor }} />
        <span>{movie.mood}</span>
      </motion.div>

      {/* Dominant Movie Title */}
      <motion.h1
        initial={{ opacity: 0, y: 25, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none font-serif drop-shadow-2xl"
      >
        {movie.title}
      </motion.h1>

      {/* Cinematic Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="text-lg sm:text-xl md:text-2xl font-light italic text-neutral-200 tracking-wide max-w-2xl leading-relaxed"
        style={{ color: atmosphere.lightRayColor }}
      >
        “{movie.tagline}”
      </motion.p>
    </div>
  );
};
