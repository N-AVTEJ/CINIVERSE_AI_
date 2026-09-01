import { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { VaultEnvironment } from './VaultEnvironment';
import { MemoryCluster } from './MemoryCluster';
import { MemoryTimeline } from './MemoryTimeline';
import { TasteConstellation } from './TasteConstellation';
import { VaultCamera } from './VaultCamera';

import { MemorySearch } from './MemorySearch';
import { MemoryRecall } from './MemoryRecall';
import { CinematicSignature } from './CinematicSignature';
import { MemoryInsight } from './MemoryInsight';

import { useMemoryHistory } from '../../hooks/useMemoryHistory';
import { useTasteProfile } from '../../hooks/useTasteProfile';

gsap.registerPlugin(ScrollTrigger);

export const MemoryVault = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showSignature, setShowSignature] = useState(false);

  const { memories, selectedMemoryId, activeFilter, setSelectedMemoryId } = useMemoryHistory();
  const tasteProfile = useTasteProfile();

  const selectedMemory = selectedMemoryId
    ? memories.find((m) => m.id === selectedMemoryId)
    : null;

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Compute camera focus position if a memory is clicked
  const focusedPosition = selectedMemory?.coordinates || null;

  // Opening minimal typography opacity phases
  const openingOpacity = scrollProgress < 0.25 ? Math.sin((scrollProgress / 0.25) * Math.PI) : 0;
  const phase18TransitionProgress = Math.max(0, (scrollProgress - 0.8) / 0.2);

  return (
    <section
      ref={containerRef}
      id="memory-vault"
      className="relative w-full h-[150vh] bg-slate-950 text-white overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-full relative">
        {/* 3D R3F Canvas */}
        <Canvas
          camera={{ position: [0, 0, 25], fov: 55 }}
          gl={{ antialias: true, alpha: false }}
          className="w-full h-full"
        >
          <VaultEnvironment focused={!!selectedMemoryId} />
          <VaultCamera
            scrollProgress={scrollProgress}
            focusedPosition={focusedPosition}
          />
          <MemoryCluster
            memories={memories}
            selectedMemoryId={selectedMemoryId}
            activeFilter={activeFilter}
            onSelectMemory={(id) => setSelectedMemoryId(id)}
          />
          <MemoryTimeline />
          <TasteConstellation tasteProfile={tasteProfile} />
        </Canvas>

        {/* 1. Minimal Opening Typography Overlay */}
        {openingOpacity > 0.05 && (
          <div
            className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center p-6 text-center transition-opacity duration-300"
            style={{ opacity: openingOpacity }}
          >
            <p className="font-heading text-3xl md:text-5xl font-light text-slate-100 tracking-tight max-w-3xl leading-tight">
              {scrollProgress < 0.12
                ? 'Every movie you choose leaves a trace.'
                : 'Your cinematic memory.'}
            </p>
          </div>
        )}

        {/* 2. Top Controls Bar (Search, Recall, Signature Trigger) */}
        <div className="absolute top-8 right-8 z-30 flex items-center gap-3">
          <MemorySearch onSelectMovieId={(id) => setSelectedMemoryId(id)} />
          <MemoryRecall />

          <button
            onClick={() => setShowSignature(!showSignature)}
            className="px-4 py-2 rounded-full bg-slate-950/80 backdrop-blur-xl border border-sky-500/40 hover:border-sky-400 text-sky-200 text-xs font-mono tracking-wider flex items-center gap-2 shadow-xl hover:scale-105 transition-all cursor-pointer pointer-events-auto"
            aria-label="View Cinematic Signature"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>Cinematic Signature</span>
          </button>
        </div>

        {/* 3. Floating Signature Analysis Modal */}
        {showSignature && (
          <div className="absolute top-20 right-8 z-40 pointer-events-auto">
            <CinematicSignature
              tasteProfile={tasteProfile}
              onClose={() => setShowSignature(false)}
            />
          </div>
        )}

        {/* 4. Memory Insight Summary Overlay */}
        {selectedMemory && (
          <div className="absolute inset-x-4 bottom-10 z-40 pointer-events-none flex justify-center">
            <div className="pointer-events-auto">
              <MemoryInsight
                memory={selectedMemory}
                onClose={() => setSelectedMemoryId(null)}
              />
            </div>
          </div>
        )}

        {/* 5. Phase 18 Transition Sequence (The Cinematic Fingerprint) */}
        {phase18TransitionProgress > 0.1 && (
          <div
            className="absolute inset-0 z-40 pointer-events-none flex flex-col items-center justify-center text-center p-6 transition-opacity duration-500 bg-slate-950/60 backdrop-blur-sm"
            style={{ opacity: phase18TransitionProgress }}
          >
            <div className="p-6 rounded-2xl bg-slate-950/90 backdrop-blur-2xl border border-sky-500/40 shadow-2xl max-w-lg">
              <span className="font-mono text-sky-400 text-xs uppercase tracking-widest block">
                Entering Phase 18
              </span>
              <h4 className="font-heading text-2xl text-white tracking-wide mt-2">
                The Cinematic Fingerprint
              </h4>
              <p className="text-xs text-slate-300/80 font-mono mt-2 leading-relaxed">
                Mapping your unique movie taste as an evolving cinematic identity...
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
