import { useRef } from "react";
import { HeroBackground } from "./HeroBackground";
import { HeroLighting } from "./HeroLighting";
import { HeroTypography } from "./HeroTypography";
import { HeroCenterpiece } from "./HeroCenterpiece";
import { HeroParallax } from "./HeroParallax";
import { useHeroTimeline } from "../../hooks/useHeroTimeline";

export const HeroScene = () => {
  const containerRef = useRef<HTMLElement>(null);
  useHeroTimeline(containerRef);

  return (
    <section 
      ref={containerRef}
      className="hero-container relative h-[150vh] w-full bg-[#050505]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <HeroParallax>
          <HeroBackground />
          <HeroLighting />
          <HeroCenterpiece />
          <HeroTypography />
        </HeroParallax>
        
        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(5,5,5,0.95)_100%)] z-30" />
      </div>
    </section>
  );
};
