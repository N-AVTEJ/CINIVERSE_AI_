import { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'motion/react';
import { EmotionWorld } from './EmotionWorld';
import { EmotionProfile } from './EmotionProfile';
import { EmotionMatchVisualization } from './EmotionMatchVisualization';
import { EmotionalRecommendation } from './EmotionalRecommendation';
import { EmotionTransition } from './EmotionTransition';
import { useEmotionSelection } from '../../hooks/useEmotionSelection';
import { useEmotionalRecommendations } from '../../hooks/useEmotionalRecommendations';
import { useSceneProgress } from '../../hooks/useSceneProgress';
import { EMOTION_STEPS, EmotionEngineStep } from '../../lib/emotionTimeline';
import { Sparkles, Sliders, RefreshCw, Layers, Compass, ChevronRight, Eye, ShieldAlert } from 'lucide-react';

export const EmotionEngine = () => {
  const sceneProgress = useSceneProgress('emotion-engine');
  const {
    activeStep,
    setActiveStep,
    selectedEmotionIds,
    clearEmotions,
    multiEmotionMode,
    setMultiEmotionMode,
    resetEngine,
  } = useEmotionSelection();

  const { recommendations } = useEmotionalRecommendations();
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect user prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Update step based on scroll progress or user interactions
  useEffect(() => {
    if (sceneProgress > 0.05 && activeStep === 'INTRO') {
      setActiveStep('SELECTING');
    }
  }, [sceneProgress, activeStep, setActiveStep]);

  return (
    <div
      className="relative w-full min-h-screen bg-black text-white overflow-hidden py-16 sm:py-24 px-4 sm:px-8 font-sans"
      id="emotion-engine-section"
      aria-label="Emotion Engine Experience"
    >
      {/* 3D WebGL Background Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Canvas
          camera={{ position: [0, 0, 25], fov: 55 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false }}
        >
          <EmotionWorld reducedMotion={reducedMotion} />
        </Canvas>
      </div>

      {/* Foreground UI Layer */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col min-h-screen justify-between pointer-events-none">
        
        {/* Header Title Section */}
        <header className="pt-8 text-center space-y-4 pointer-events-auto max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-xs font-bold text-cine-gold uppercase tracking-[0.25em]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phase 13 — Emotion Engine</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-3xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight uppercase leading-tight"
          >
            Don't Choose a Genre.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-cine-gold to-yellow-500">
              Choose a Feeling.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base text-cine-muted font-mono max-w-xl mx-auto"
          >
            What are you in the mood for? Select one or blend multiple atmospheres to synthesize movie recommendations.
          </motion.p>
        </header>

        {/* Step Navigation Bar & Controls */}
        <div className="py-6 pointer-events-auto max-w-4xl mx-auto w-full">
          <div className="p-2 sm:p-3 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-wrap items-center justify-between gap-3">
            
            {/* Steps Pills */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
              {EMOTION_STEPS.map((st) => {
                const isActive = activeStep === st.step;
                return (
                  <button
                    key={st.step}
                    onClick={() => setActiveStep(st.step)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-cine-gold text-black shadow-lg shadow-amber-500/20'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{st.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMultiEmotionMode(!multiEmotionMode)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider border transition-all flex items-center gap-1.5 ${
                  multiEmotionMode
                    ? 'border-cine-gold/50 bg-cine-gold/10 text-cine-gold'
                    : 'border-white/10 bg-white/5 text-white/60'
                }`}
                title="Toggle Multi-Emotion Blending Mode"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Blend Mode</span>
              </button>

              <button
                onClick={clearEmotions}
                className="p-1.5 rounded-xl border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                title="Clear selections"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Content Views per Active Step */}
        <div className="pointer-events-auto min-h-[360px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {activeStep === 'PROFILING' && (
              <EmotionProfile key="profile" />
            )}

            {activeStep === 'ANALYZING' && (
              <EmotionMatchVisualization key="analysis" />
            )}

            {(activeStep === 'SEARCHING' || activeStep === 'REVEALED') && (
              <EmotionalRecommendation
                key="recommendations"
                items={recommendations}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Bar Footer Info */}
        <footer className="pb-8 text-center pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 mt-8">
          <div className="flex items-center gap-2 text-xs text-cine-muted font-mono">
            <Compass className="w-4 h-4 text-cine-gold" />
            <span>Select 3D nodes directly or toggle feelings above</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-white/60">
            <span>Selected: {selectedEmotionIds.length} Feeling(s)</span>
            <button
              onClick={() => {
                if (activeStep === 'SELECTING') setActiveStep('PROFILING');
                else if (activeStep === 'PROFILING') setActiveStep('ANALYZING');
                else if (activeStep === 'ANALYZING') setActiveStep('REVEALED');
                else setActiveStep('SELECTING');
              }}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <span>Next Phase</span>
              <ChevronRight className="w-4 h-4 text-cine-gold" />
            </button>
          </div>
        </footer>

      </div>

      {/* Collapse Transition overlay */}
      <EmotionTransition />
    </div>
  );
};
