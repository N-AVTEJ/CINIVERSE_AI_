import { motion, AnimatePresence } from "motion/react";
import { usePredictionEngine } from "../../hooks/usePredictionEngine";
import { finalRecommendation } from "../../lib/recommendationLogic";
import { Play, Plus, Compass } from "lucide-react";

export const GlassInfoPanel = () => {
  const phase = usePredictionEngine(s => s.phase);
  const show = phase === 'revealing' || phase === 'complete';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-16 right-16 w-[450px] rounded-2xl border border-white/10 bg-black/40 backdrop-blur-3xl p-8 shadow-[0_0_80px_rgba(0,210,255,0.1)] overflow-hidden"
        >
          {/* Subtle reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col gap-6">
            <header>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs uppercase tracking-[0.3em] text-[#00d2ff] mb-2 font-bold"
              >
                98% Match Score
              </motion.p>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="text-4xl font-light tracking-tight text-white mb-2"
              >
                {finalRecommendation.title}
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex items-center gap-3 text-sm text-neutral-400 font-medium tracking-wide"
              >
                <span>{finalRecommendation.genre}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>{finalRecommendation.runtime}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span className="text-white border border-white/20 rounded px-1.5 py-0.5 text-[10px]">IMDb {finalRecommendation.rating}</span>
              </motion.div>
            </header>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-sm text-neutral-300 leading-relaxed"
            >
              {finalRecommendation.recommendationReason}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="flex flex-col gap-2 pt-4 border-t border-white/10"
            >
              <span className="text-[10px] uppercase tracking-widest text-neutral-500">Cinematic Profile</span>
              <div className="flex flex-wrap gap-2">
                {finalRecommendation.mood.split(', ').map(m => (
                  <span key={m} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300 tracking-wide">
                    {m}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="flex gap-3 pt-4 mt-2"
            >
              <button className="flex-1 flex items-center justify-center gap-2 bg-white text-black rounded-lg py-3 text-sm font-semibold hover:bg-neutral-200 transition-colors">
                <Play className="w-4 h-4 fill-current" />
                Trailer
              </button>
              <button className="flex items-center justify-center p-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors group">
                <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button className="flex items-center justify-center p-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors group">
                <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
