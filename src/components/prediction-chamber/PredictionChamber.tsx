import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { usePredictionEngine } from "../../hooks/usePredictionEngine";
import { PreferenceFragments } from "./PreferenceFragments";
import { RecommendationCrystal } from "./RecommendationCrystal";
import { ChamberLighting } from "./ChamberLighting";
import { ReflectiveFloor } from "./ReflectiveFloor";
import { ParticleCore } from "./ParticleCore";
import { GlassInfoPanel } from "./GlassInfoPanel";
import { ScanningWave } from "./ScanningWave";

gsap.registerPlugin(ScrollTrigger);

export const PredictionChamber = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const setPhase = usePredictionEngine(s => s.setPhase);
  const setProgress = usePredictionEngine(s => s.setProgress);
  const scrollData = useRef({ val: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);
          
          if (p < 0.2) setPhase('idle');
          else if (p < 0.5) setPhase('scanning');
          else if (p < 0.7) setPhase('converging');
          else if (p < 0.9) setPhase('revealing');
          else setPhase('complete');
        }
      }
    });

    tl.to(scrollData.current, {
      val: 1,
      ease: "none"
    });

    return () => { tl.kill(); };
  }, [setPhase, setProgress]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[500vh] bg-[#020202]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-auto">
        <Canvas gl={{ antialias: true, alpha: false }} dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 2, 20]} fov={45} />
          
          <ChamberLighting />
          
          <group position={[0, -2, 0]}>
            <ReflectiveFloor />
            <RecommendationCrystal />
            <ParticleCore />
            <ScanningWave />
          </group>
          
          <PreferenceFragments />
          
        </Canvas>
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,2,2,0.95)_100%)] z-10" />
        
        {/* UI Overlay */}
        <div className="absolute inset-0 pointer-events-none z-20 flex justify-center items-center p-8 md:p-16">
          <GlassInfoPanel />
        </div>
      </div>
    </section>
  );
};
