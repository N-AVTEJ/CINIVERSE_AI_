import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { GalaxyBackground } from "./GalaxyBackground";
import { GenrePlanet } from "./GenrePlanet";
import { PlanetInfoPanel } from "./PlanetInfoPanel";
import { genreData } from "../../lib/genreData";
import { planetConfigs } from "../../lib/planetConfigs";
import { usePlanetFocus } from "../../hooks/usePlanetFocus";
import { GalaxyCamera } from "./GalaxyCamera";

gsap.registerPlugin(ScrollTrigger);

export const GenreGalaxy = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const focusedPlanetId = usePlanetFocus(s => s.focusedPlanetId);
  const scrollProgressRef = useRef({ progress: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      }
    });

    tl.to(scrollProgressRef.current, {
      progress: 1,
      ease: "none"
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[150vh] sm:h-[180vh] bg-[#020202]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-auto">
        <Canvas gl={{ antialias: true, alpha: false }} dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 0]} fov={45} />
          
          <ambientLight intensity={0.05} />
          <directionalLight position={[20, 30, 20]} intensity={0.8} />
          
          <GalaxyCamera scrollProgress={scrollProgressRef} />
          
          <GalaxyBackground />

          {genreData.map((genre) => (
            planetConfigs[genre.id] && (
              <GenrePlanet 
                key={genre.id}
                genre={genre}
                config={planetConfigs[genre.id]}
              />
            )
          ))}
          
        </Canvas>
        
        {/* Foreground cinematic vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(2,2,2,0.9)_100%)] z-10" />
        
        {/* PHASE 8 EXTENSION POINT */}
        <div id="genre-dive-container" className="absolute inset-0 z-30 pointer-events-none" />

        {/* Planet Info Panel */}
        <div className="absolute inset-0 pointer-events-none z-20 flex justify-end items-center p-8 md:p-16">
          <PlanetInfoPanel />
        </div>
      </div>
    </section>
  );
};
