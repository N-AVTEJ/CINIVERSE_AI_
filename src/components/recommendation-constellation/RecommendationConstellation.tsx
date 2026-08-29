import { useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Preload } from "@react-three/drei";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useConstellationGraph } from "../../hooks/useConstellationGraph";

import { InfiniteStarfield } from "./InfiniteStarfield";
import { ConstellationCluster } from "./ConstellationCluster";
import { GalaxyCamera } from "./GalaxyCamera";
import { NebulaLayer } from "./NebulaLayer";
import { StarInformationPanel } from "./StarInformationPanel";
import { EnergyPath } from "./EnergyPath";
import { movieUniverseData } from "../../lib/movieUniverse";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export const RecommendationConstellation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const setProgress = useConstellationGraph(s => s.setProgress);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          setProgress(self.progress);
        }
      }
    });

    return () => { tl.kill(); };
  }, [setProgress]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[160vh] sm:h-[190vh] bg-[#000000]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-auto">
        <Canvas gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }} dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 30]} fov={60} near={0.1} far={1000} />
          
          <color attach="background" args={["#010103"]} />
          <fogExp2 attach="fog" args={["#010103", 0.015]} />
          
          <ambientLight intensity={0.1} color="#111122" />
          <directionalLight position={[10, 20, 10]} intensity={0.2} color="#4444ff" />

          <Suspense fallback={null}>
            <GalaxyCamera />
            <NebulaLayer />
            <InfiniteStarfield />
            <ConstellationCluster />
            
            {/* Render energy paths */}
            {movieUniverseData.map((movie) => 
              movie.connectedMovies.map((conn) => {
                const targetMovie = movieUniverseData.find(m => m.id === conn.id);
                if (targetMovie && movie.id < targetMovie.id) {
                  // Only render one way
                  return (
                    <EnergyPath 
                      key={`${movie.id}-${targetMovie.id}`} 
                      start={new THREE.Vector3(...movie.coordinates)} 
                      end={new THREE.Vector3(...targetMovie.coordinates)} 
                      strength={conn.strength}
                      sourceId={movie.id}
                      targetId={targetMovie.id}
                    />
                  );
                }
                return null;
              })
            )}
            
            <Preload all />
          </Suspense>
        </Canvas>
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10" />
        
        {/* UI Overlay */}
        <div className="absolute inset-0 pointer-events-none z-20 flex justify-start items-center p-8 md:p-16">
          <StarInformationPanel />
        </div>
      </div>
    </section>
  );
};
