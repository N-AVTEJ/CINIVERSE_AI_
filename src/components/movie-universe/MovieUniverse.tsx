import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PosterCluster } from "./PosterCluster";
import { PosterInfoPanel } from "./PosterInfoPanel";
import { DepthFog } from "./DepthFog";
import { VolumetricLight } from "./VolumetricLight";
import { FloatingParticles } from "./FloatingParticles";
import { usePosterFocus } from "../../hooks/usePosterFocus";
import { useSceneProgress } from "../../hooks/useSceneProgress";

gsap.registerPlugin(ScrollTrigger);

export const MovieUniverse = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const focusedPosterId = usePosterFocus(s => s.focusedPosterId);
  const progress = useSceneProgress("universe");
  
  useEffect(() => {
    if (!containerRef.current || !cameraRef.current) return;
    
    // We create a ScrollTrigger specifically to drive the camera through the universe
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      }
    });
    
    // Camera moves forward through Z space
    // Since our posters are at Z from -3000 to +600, we move the camera from Z=0 to Z=3000
    // We also add a subtle rotation for a cinematic orbit feel
    tl.to(cameraRef.current, {
      z: 3500,
      rotationY: 10,
      rotationX: -5,
      ease: "none"
    });
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-[150vh] sm:h-[180vh] w-full bg-[#020202]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ perspective: "1500px" }}>
        
        <DepthFog />
        <VolumetricLight />
        
        {/* The Universe Camera */}
        <div 
          ref={cameraRef}
          className="absolute inset-0 w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          <PosterCluster />
          <FloatingParticles />
        </div>
        
        {/* Foreground cinematic vignette to blend edges */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(2,2,2,0.95)_100%)] z-40" />
        
        {/* PHASE 6 EXTENSION POINT: The AI Recommendation Brain will emerge here */}
        <div id="ai-brain-container" className="absolute inset-0 z-40 pointer-events-none" />

        {focusedPosterId && <PosterInfoPanel />}
      </div>
    </section>
  );
};
