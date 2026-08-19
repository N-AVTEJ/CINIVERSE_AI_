import { useTimelineProgress } from "../../hooks/useTimelineProgress";
import { cinemaEras } from "../../lib/cinemaHistory";
import { motion, AnimatePresence } from "motion/react";

export const EraPanel = () => {
  const activeEraId = useTimelineProgress(s => s.activeEraId);
  const activeEra = cinemaEras.find(e => e.id === activeEraId);

  return (
    <div className="w-full h-full p-8 md:p-16 flex items-center justify-start pointer-events-none">
      <AnimatePresence mode="wait">
        {activeEra && (
          <motion.div
            key={activeEra.id}
            initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md lg:max-w-lg rounded-3xl border border-white/10 bg-black/40 backdrop-blur-3xl p-8 shadow-2xl pointer-events-auto"
          >
            {/* Subtle glow */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_70%)]" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-cine-gold uppercase tracking-[0.3em] text-[10px] font-bold">
                  {activeEra.years}
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-wider mb-8">
                {activeEra.title}
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-white/40 text-[9px] uppercase tracking-widest mb-3">Major Innovations</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeEra.innovations.map((innovation, idx) => (
                      <span key={idx} className="px-3 py-1 text-[10px] uppercase tracking-widest border border-white/10 rounded-full text-white/80 bg-white/5">
                        {innovation}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white/40 text-[9px] uppercase tracking-widest mb-2">Legendary Films</h4>
                  <ul className="space-y-1">
                    {activeEra.famousMovies.map((movie, idx) => (
                      <li key={idx} className="text-white/80 text-xs tracking-wider">
                        • {movie}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-white/40 text-[9px] uppercase tracking-widest mb-2">Influential Directors</h4>
                  <ul className="space-y-1">
                    {activeEra.famousDirectors.map((director, idx) => (
                      <li key={idx} className="text-white/80 text-xs tracking-wider">
                        • {director}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
