import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EmotionLandscape } from './EmotionLandscape';
import { MoodFinder } from './MoodFinder';
import { EmotionReveal } from './EmotionReveal';
import { useEmotionMap } from '../../hooks/useEmotionMap';
import { calculateTimelinePhase } from '../../lib/emotionMapTimeline';

gsap.registerPlugin(ScrollTrigger);

export const EmotionMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollProgress, setScrollProgress } = useEmotionMap();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5, // Responsive 0.5 scrub value
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
  });

    return () => ctx.revert();
  }, [setScrollProgress]);

  const phaseProgress = calculateTimelinePhase(scrollProgress);

  return (
    <section
      ref={containerRef}
      id="emotion-map"
      className="relative w-full h-[150vh] md:h-[170vh] bg-slate-950 text-white overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-full relative">
        {/* Three.js 3D Canvas */}
        <Canvas
          camera={{ position: [0, 0, 35], fov: 55 }}
          gl={{ antialias: true, alpha: false }}
          className="w-full h-full"
        >
          <EmotionLandscape />
        </Canvas>

        {/* 1. Opening Minimal Typography Overlay (0 - 20% scroll) */}
        {phaseProgress.openingOpacity > 0.05 && (
          <div
            className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center p-6 text-center transition-opacity duration-300"
            style={{ opacity: phaseProgress.openingOpacity }}
          >
            <p className="font-heading text-3xl md:text-5xl lg:text-6xl font-light text-slate-100 tracking-tight max-w-4xl leading-tight">
              {phaseProgress.openingTextPhase === 1
                ? "Cinema isn't organized by genre."
                : "It's organized by feeling."}
            </p>
          </div>
        )}

        {/* 2. AI Mood Finder Control */}
        <MoodFinder />

        {/* 3. Emotion / Movie Reveal Overlay */}
        <EmotionReveal />

        {/* 4. Transition toward Phase 17 (The Movie Memory Vault) (80% - 100% scroll) */}
        {phaseProgress.phase17TransitionProgress > 0.1 && (
          <div
            className="absolute inset-0 z-40 pointer-events-none flex flex-col items-center justify-end pb-16 text-center transition-opacity duration-500"
            style={{ opacity: phaseProgress.phase17TransitionProgress }}
          >
            <div className="p-4 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-sky-500/30">
              <span className="font-mono text-sky-400 text-xs uppercase tracking-widest block">
                Next Chapter
              </span>
              <h4 className="font-heading text-xl text-white tracking-wide mt-1">
                Entering The Movie Memory Vault...
              </h4>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
