import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useDNAAnimation } from "../../hooks/useDNAAnimation";
import { dnaAttributesData } from "../../lib/dnaAttributes";

import { DNAStrand } from "./DNAStrand";
import { DNACamera } from "./DNACamera";
import { DNALighting } from "./DNALighting";
import { DNAFog } from "./DNAFog";
import { DNAParticles } from "./DNAParticles";
import { DNAAttributeNode } from "./DNAAttributeNode";
import { DNAExplanationPanel } from "./DNAExplanationPanel";

gsap.registerPlugin(ScrollTrigger);

export const MovieDNA = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const setProgress = useDNAAnimation(s => s.setProgress);
  const setActiveAttributeId = useDNAAnimation(s => s.setActiveAttributeId);

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
          
          // Determine active attribute based on progress
          // Assuming progress maps to Y positions 0 to -100
          const currentY = -p * 100;
          let activeId: string | null = null;
          
          for (const attr of dnaAttributesData) {
            if (Math.abs(currentY - attr.positionY) < 5) {
              activeId = attr.id;
              break;
            }
          }
          setActiveAttributeId(activeId);
        }
      }
    });

    return () => { tl.kill(); };
  }, [setProgress, setActiveAttributeId]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[500vh] bg-[#020202]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-auto">
        <Canvas gl={{ antialias: true, alpha: false }} dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
          
          <DNALighting />
          <DNAFog />
          <DNACamera />
          
          <group position={[0, 0, -10]}>
            <DNAStrand />
            <DNAParticles />
            
            {dnaAttributesData.map((attr) => (
              <DNAAttributeNode key={attr.id} data={attr} />
            ))}
          </group>
        </Canvas>
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,2,2,0.95)_100%)] z-10" />
        
        {/* UI Overlay */}
        <div className="absolute inset-0 pointer-events-none z-20 flex justify-end items-center p-8 md:p-16">
          <DNAExplanationPanel />
        </div>
      </div>
    </section>
  );
};
