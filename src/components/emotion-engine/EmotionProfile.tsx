import { motion } from 'motion/react';
import { useEmotionSelection } from '../../hooks/useEmotionSelection';
import { getEmotionProfile } from '../../lib/emotionProfiles';
import { Sparkles, Activity, Layers, Disc } from 'lucide-react';

export const EmotionProfile = () => {
  const selectedEmotionIds = useEmotionSelection((s) => s.selectedEmotionIds);
  const profile = getEmotionProfile(selectedEmotionIds);

  if (profile.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-xl mx-auto rounded-3xl border border-white/10 bg-black/60 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden my-6"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3),transparent_75%)]" />

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h4 className="text-cine-gold uppercase tracking-[0.25em] text-[10px] font-bold flex items-center gap-2 mb-1">
              <Sparkles className="w-3 h-3" />
              Emotional Synthesis Profile
            </h4>
            <h3 className="font-heading text-xl sm:text-2xl text-white font-bold tracking-wide">
              Selected Atmosphere Breakdown
            </h3>
          </div>
          <div className="text-right">
            <span className="text-xs text-cine-muted uppercase tracking-widest block">Resonance</span>
            <span className="text-lg font-mono font-bold text-white">
              {profile.length} {profile.length === 1 ? 'Feeling' : 'Blended Feelings'}
            </span>
          </div>
        </div>

        {/* Visual Composition: Expanding Concentric Orbital Rings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Orbital Rings Visualizer */}
          <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
            {profile.map((item, index) => {
              const radius = 90 - index * 24;
              const strokeDash = 2 * Math.PI * radius;
              const strokeOffset = strokeDash * (1 - item.percentage / 100);

              return (
                <div key={item.emotion.id} className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    {/* Background Ring */}
                    <circle
                      cx="96"
                      cy="96"
                      r={radius}
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="6"
                    />
                    {/* Animated Ring */}
                    <motion.circle
                      cx="96"
                      cy="96"
                      r={radius}
                      fill="none"
                      stroke={item.emotion.color}
                      strokeWidth="6"
                      strokeDasharray={strokeDash}
                      initial={{ strokeDashoffset: strokeDash }}
                      animate={{ strokeDashoffset: strokeOffset }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: index * 0.2 }}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              );
            })}

            {/* Central Node */}
            <div className="z-10 text-center bg-black/80 rounded-full w-20 h-20 border border-white/20 flex flex-col items-center justify-center shadow-xl">
              <Disc className="w-5 h-5 text-cine-gold animate-spin-slow mb-0.5" />
              <span className="text-[9px] uppercase tracking-widest text-white/80 font-bold">Aura</span>
            </div>
          </div>

          {/* Details breakdown */}
          <div className="space-y-4">
            {profile.map((item, index) => (
              <motion.div
                key={item.emotion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full shadow-md"
                    style={{ backgroundColor: item.emotion.color }}
                  />
                  <div>
                    <h5 className="text-sm font-bold text-white tracking-wide">
                      {item.emotion.name}
                    </h5>
                    <p className="text-[10px] text-cine-muted line-clamp-1">
                      {item.emotion.tagline}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-base font-bold text-white">
                    {item.percentage}%
                  </span>
                  <span className="block text-[9px] text-white/40 uppercase tracking-widest">
                    Intensity
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Environmental Indicators */}
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <Activity className="w-3.5 h-3.5 text-cine-gold mx-auto mb-1" />
            <span className="block text-[9px] text-cine-muted uppercase tracking-wider">Density</span>
            <span className="font-bold text-white">Harmonic Wave</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <Layers className="w-3.5 h-3.5 text-blue-400 mx-auto mb-1" />
            <span className="block text-[9px] text-cine-muted uppercase tracking-wider">Motion</span>
            <span className="font-bold text-white">{profile[0]?.emotion.particlePreset.motionType}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 mx-auto mb-1" />
            <span className="block text-[9px] text-cine-muted uppercase tracking-wider">Resonance</span>
            <span className="font-bold text-white">Coherent</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
