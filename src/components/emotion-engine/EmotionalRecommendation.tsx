import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EmotionalRecommendationItem } from '../../lib/emotionalScoring';
import { EmotionalSpectrum } from './EmotionalSpectrum';
import { Sparkles, Film, ArrowRight, Play, Check } from 'lucide-react';
import { useEmotionSelection } from '../../hooks/useEmotionSelection';

interface RecommendationProps {
  items: EmotionalRecommendationItem[];
  onSelectForPhase14?: (item: EmotionalRecommendationItem) => void;
}

export const EmotionalRecommendation = ({
  items,
  onSelectForPhase14,
}: RecommendationProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const setActiveStep = useEmotionSelection((s) => s.setActiveStep);
  const setFocusedMovieId = useEmotionSelection((s) => s.setFocusedMovieId);

  if (items.length === 0) return null;

  const currentItem = items[selectedIndex];

  const handleSelectMovie = (item: EmotionalRecommendationItem) => {
    setFocusedMovieId(item.movie.id);
    if (onSelectForPhase14) {
      onSelectForPhase14(item);
    } else {
      setActiveStep('COLLAPSING');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-8 space-y-8">
      {/* Top Main Featured Discovery */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.movie.id}
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: -20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-white/10 bg-black/75 backdrop-blur-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
        >
          {/* Subtle Ambient Background Flare */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.3),transparent_70%)]" />

          {/* Left Column: Movie Poster with Particle Emergence Effect */}
          <div className="md:col-span-4 relative group flex flex-col items-center">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl max-w-xs w-full aspect-[2/3] bg-neutral-900">
              <img
                src={currentItem.movie.poster}
                alt={currentItem.movie.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

              {/* Match Score Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 flex items-center gap-1.5 text-xs font-bold text-cine-gold shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-cine-gold" />
                <span>{currentItem.matchScore}% Emotional Match</span>
              </div>
            </div>
          </div>

          {/* Middle Column: Title & Emotional Explanation */}
          <div className="md:col-span-5 space-y-5 text-left">
            <div>
              <div className="flex items-center gap-3 text-xs text-cine-muted uppercase tracking-widest mb-2 font-mono">
                <span>{currentItem.movie.genre}</span>
                <span className="w-1 h-1 rounded-full bg-cine-gold" />
                <span>{currentItem.movie.year}</span>
                <span className="w-1 h-1 rounded-full bg-cine-gold" />
                <span>{currentItem.movie.runtime}</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl text-white font-bold tracking-wide uppercase">
                {currentItem.movie.title}
              </h2>
              <p className="text-sm text-cine-gold/90 font-mono mt-1">
                Directed by {currentItem.movie.director}
              </p>
            </div>

            {/* Natural Language Explanation Box */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <h5 className="text-[10px] text-cine-gold uppercase tracking-[0.25em] font-bold flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5" />
                Why This Fits Your Feeling
              </h5>
              <p className="text-sm text-white/90 leading-relaxed italic">
                "{currentItem.explanation}"
              </p>
            </div>

            <p className="text-xs text-white/70 line-clamp-3 leading-relaxed">
              {currentItem.movie.description}
            </p>

            {/* Themes */}
            <div className="flex flex-wrap gap-2 pt-1">
              {currentItem.movie.themes.map((theme, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/80 uppercase tracking-widest"
                >
                  {theme}
                </span>
              ))}
            </div>

            {/* Select Action Button */}
            <div className="pt-2">
              <button
                onClick={() => handleSelectMovie(currentItem)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-cine-gold text-black font-bold text-sm tracking-widest uppercase hover:bg-amber-300 transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-amber-500/20"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Focus This Movie (Phase 14)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Emotional Spectrum Visualization */}
          <div className="md:col-span-3 flex flex-col items-center justify-center">
            <h5 className="text-[10px] text-cine-muted uppercase tracking-[0.25em] font-bold mb-2">
              Emotional Spectrum
            </h5>
            <EmotionalSpectrum item={currentItem} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Secondary Discovered Candidates List */}
      {items.length > 1 && (
        <div className="space-y-4">
          <h4 className="text-cine-muted uppercase tracking-[0.25em] text-xs font-bold text-center">
            Additional Emotionally Aligned Discoveries
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, idx) => {
              if (idx === selectedIndex) return null;

              return (
                <motion.div
                  key={item.movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  onClick={() => setSelectedIndex(idx)}
                  className="p-4 rounded-2xl bg-black/60 border border-white/10 hover:border-cine-gold/50 transition-all cursor-pointer group flex items-center gap-4 hover:bg-white/5"
                >
                  <img
                    src={item.movie.poster}
                    alt={item.movie.title}
                    className="w-14 h-20 object-cover rounded-xl border border-white/10 shadow-md group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-cine-gold font-mono">
                        {item.matchScore}% Match
                      </span>
                      <span className="text-[10px] text-cine-muted">• {item.movie.year}</span>
                    </div>
                    <h5 className="text-sm font-bold text-white truncate group-hover:text-cine-gold transition-colors">
                      {item.movie.title}
                    </h5>
                    <p className="text-[11px] text-cine-muted truncate">{item.movie.genre}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
