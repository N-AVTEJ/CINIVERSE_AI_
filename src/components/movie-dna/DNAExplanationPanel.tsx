import { motion, AnimatePresence } from "motion/react";
import { useDNAAnimation } from "../../hooks/useDNAAnimation";
import { dnaAttributesData } from "../../lib/dnaAttributes";

export const DNAExplanationPanel = () => {
  const activeAttributeId = useDNAAnimation(s => s.activeAttributeId);
  const activeAttribute = dnaAttributesData.find(a => a.id === activeAttributeId);

  return (
    <AnimatePresence mode="wait">
      {activeAttribute && (
        <motion.div
          key={activeAttribute.id}
          initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: 20, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-[400px] rounded-2xl border border-white/10 bg-black/40 backdrop-blur-3xl p-8 shadow-2xl overflow-hidden relative"
        >
          {/* Subtle colored glow matching the attribute */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: `radial-gradient(circle at top right, ${activeAttribute.colorTheme}, transparent 70%)`
            }}
          />
          
          <div className="relative z-10 flex flex-col gap-4">
            <header className="flex justify-between items-start">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-2 font-bold">
                  {activeAttribute.name}
                </p>
                <h3 
                  className="text-3xl font-light tracking-tight text-white"
                  style={{ textShadow: `0 0 20px ${activeAttribute.colorTheme}40` }}
                >
                  {activeAttribute.value}
                </h3>
              </div>
              <div className="flex flex-col items-end">
                <span 
                  className="text-2xl font-light"
                  style={{ color: activeAttribute.colorTheme }}
                >
                  {activeAttribute.confidence}%
                </span>
                <span className="text-[9px] uppercase tracking-widest text-neutral-500">
                  Influence
                </span>
              </div>
            </header>

            <div className="w-full h-px bg-white/10 my-2" />

            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              {activeAttribute.description}
            </p>
            
            {/* Visualizer bars */}
            <div className="flex items-end gap-1 h-8 mt-4">
              {[...Array(12)].map((_, i) => {
                const height = Math.random() * 100;
                const active = i < (activeAttribute.importance / 100) * 12;
                return (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${active ? height : height * 0.2}%` }}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}
                    className="w-full rounded-t-sm"
                    style={{ 
                      backgroundColor: active ? activeAttribute.colorTheme : '#333',
                      opacity: active ? 0.8 : 0.3
                    }}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
