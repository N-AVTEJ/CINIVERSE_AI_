import { motion } from 'motion/react';
import { Compass, Sparkles } from 'lucide-react';
import { MovieShowcaseItem } from '../../lib/moviePresentation';

interface AIExplanationProps {
  movie: MovieShowcaseItem;
}

export const AIExplanation = ({ movie }: AIExplanationProps) => {
  const atmosphere = movie.atmospherePreset;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.55 }}
      className="space-y-3 p-4 rounded-2xl bg-neutral-900/60 border border-white/10 backdrop-blur-md max-w-xl"
      id={`showcase-explanation-${movie.id}`}
    >
      <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-neutral-400 uppercase">
        <Compass className="w-4 h-4" style={{ color: atmosphere.accentColor }} />
        <span>Why CINEVERSE AI Selected This Story</span>
      </div>

      <p className="text-sm text-neutral-200 leading-relaxed font-normal">
        {movie.recommendationReason}
      </p>

      {/* Themes / Tags */}
      {movie.themes && movie.themes.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {movie.themes.map((theme, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-neutral-300"
            >
              <Sparkles className="w-2.5 h-2.5 text-neutral-500" />
              {theme}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};
