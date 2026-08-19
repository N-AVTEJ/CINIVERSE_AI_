import { motion } from 'motion/react';
import { useEmotionSelection } from '../../hooks/useEmotionSelection';
import { useEmotionalRecommendations } from '../../hooks/useEmotionalRecommendations';
import { Disc, ArrowRight, RotateCcw } from 'lucide-react';

export const EmotionTransition = () => {
  const { activeStep, resetEngine } = useEmotionSelection();
  const { primaryRecommendation } = useEmotionalRecommendations();

  if (activeStep !== 'COLLAPSING' || !primaryRecommendation) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md space-y-6"
      >
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-cine-gold/20 animate-ping opacity-75" />
          <div className="w-24 h-24 rounded-full border-2 border-cine-gold bg-black flex items-center justify-center shadow-2xl overflow-hidden">
            <img
              src={primaryRecommendation.movie.poster}
              alt={primaryRecommendation.movie.title}
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-cine-gold">
            Phase 14 Showcase Ready
          </span>
          <h2 className="font-heading text-3xl text-white font-bold tracking-wide uppercase">
            {primaryRecommendation.movie.title}
          </h2>
          <p className="text-xs text-cine-muted font-mono">
            Focusing universe around your strongest emotional resonance ({primaryRecommendation.matchScore}%)
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={resetEngine}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Select Another Feeling</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
