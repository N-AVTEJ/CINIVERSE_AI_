import { motion } from 'motion/react';
import { useEmotionSelection } from '../../hooks/useEmotionSelection';
import { EMOTIONS } from '../../lib/emotionData';
import { Cpu, ArrowRight, CheckCircle2, Film, Sparkles } from 'lucide-react';

export const EmotionMatchVisualization = () => {
  const selectedEmotionIds = useEmotionSelection((s) => s.selectedEmotionIds);

  const selectedEmotions = selectedEmotionIds
    .map((id) => EMOTIONS.find((e) => e.id === id))
    .filter((e): e is typeof EMOTIONS[0] => e !== undefined);

  if (selectedEmotions.length === 0) return null;

  const primary = selectedEmotions[0];

  const steps = [
    { label: 'Emotion', value: selectedEmotions.map((e) => e.name).join(' + ') },
    { label: 'Mood', value: primary.tagline },
    { label: 'Themes', value: primary.compatibleThemes.slice(0, 2).join(', ') },
    { label: 'Genre Alignment', value: primary.compatibleGenres.slice(0, 3).join(' / ') },
    { label: 'Pacing Vector', value: primary.compatiblePacing + ' Build' },
    { label: 'Visual Signature', value: primary.compatibleVisualStyles[0] },
    { label: 'Candidate Scan', value: 'Neural Filtering active...' },
    { label: 'Top Discoveries', value: 'Synthesized Recommendations' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-4xl mx-auto rounded-3xl border border-white/10 bg-black/70 backdrop-blur-3xl p-6 sm:p-8 my-6 shadow-2xl relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cine-gold/10 border border-cine-gold/30 flex items-center justify-center text-cine-gold">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-cine-gold uppercase tracking-[0.25em] text-[10px] font-bold">
              AI Neural Analysis Pipeline
            </h4>
            <h3 className="font-heading text-xl text-white font-bold tracking-wide">
              Emotion → Movie DNA Translation
            </h3>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-cine-muted">
          <Sparkles className="w-3.5 h-3.5 text-cine-gold" />
          <span>Connected to AI Brain</span>
        </div>
      </div>

      {/* Process Flow Nodes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((st, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="p-3.5 rounded-2xl bg-white/5 border border-white/10 relative group hover:border-cine-gold/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] uppercase tracking-widest text-cine-gold font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Step 0{index + 1}
              </span>
              <span className="text-[9px] text-white/40 uppercase font-mono">{st.label}</span>
            </div>

            <p className="text-xs font-bold text-white tracking-wide line-clamp-2">
              {st.value}
            </p>

            {index < steps.length - 1 && (
              <ArrowRight className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 z-10" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
