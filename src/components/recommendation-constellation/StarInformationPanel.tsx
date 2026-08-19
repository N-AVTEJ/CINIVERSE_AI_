import { motion, AnimatePresence } from "motion/react";
import { useConstellationGraph } from "../../hooks/useConstellationGraph";
import { movieUniverseData } from "../../lib/movieUniverse";
import { Play, Navigation2, Star } from "lucide-react";
import { useShallow } from 'zustand/react/shallow';

export const StarInformationPanel = () => {
  const { selectedMovieId, setSelectedMovieId } = useConstellationGraph(
    useShallow(s => ({ selectedMovieId: s.selectedMovieId, setSelectedMovieId: s.setSelectedMovieId }))
  );
  const selectedMovie = movieUniverseData.find(m => m.id === selectedMovieId);

  return (
    <AnimatePresence mode="wait">
      {selectedMovie && (
        <motion.div
          key={selectedMovie.id}
          initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-[450px] rounded-2xl border border-white/10 bg-black/60 backdrop-blur-3xl p-8 shadow-[0_0_80px_rgba(0,136,255,0.15)] overflow-hidden relative pointer-events-auto"
        >
          {/* Subtle colored glow */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(0,136,255,0.3),transparent_70%)]" />
          
          <div className="relative z-10 flex flex-col gap-6">
            <header>
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs uppercase tracking-[0.3em] text-[#00d2ff] font-bold">
                  {selectedMovie.recommendationScore}% Match
                </p>
                <div className="flex items-center gap-1 text-yellow-500 text-xs font-medium">
                  <Star className="w-3 h-3 fill-current" />
                  {selectedMovie.rating}
                </div>
              </div>
              
              <h2 className="text-4xl font-light tracking-tight text-white mb-2">
                {selectedMovie.title}
              </h2>
              
              <div className="flex items-center gap-3 text-sm text-neutral-400 font-medium tracking-wide">
                <span>{selectedMovie.year}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>{selectedMovie.runtime}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>{selectedMovie.director}</span>
              </div>
            </header>

            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              {selectedMovie.description}
            </p>
            
            <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500">Thematic Resonance</span>
              <div className="flex flex-wrap gap-2">
                {selectedMovie.themes.map(t => (
                  <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300 tracking-wide">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4 mt-2">
              <button className="flex-1 flex items-center justify-center gap-2 bg-white text-black rounded-lg py-3 text-sm font-semibold hover:bg-neutral-200 transition-colors">
                <Play className="w-4 h-4 fill-current" />
                Trailer
              </button>
              <button 
                onClick={() => setSelectedMovieId(null)}
                className="flex items-center justify-center p-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors group"
                title="Continue Journey"
              >
                <Navigation2 className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
