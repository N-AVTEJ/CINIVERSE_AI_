import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { NeuralSphere } from "./NeuralSphere";
import { ParticleField } from "./ParticleField";
import { RecommendationPanel } from "./RecommendationPanel";
import { SimilarityPanel } from "./SimilarityPanel";
import { useRecommendationGraph } from "../../hooks/useRecommendationGraph";
import { graphNodes } from "../../lib/graphData";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const AIBrainScene = () => {
  const triggerRecommendation = useRecommendationGraph(s => s.triggerRecommendation);
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraTargetRef = useRef<{ orbit: number, zoom: number }>({ orbit: 0, zoom: 45 });

  useEffect(() => {
    // Automatically trigger a recommendation demo every 15 seconds
    const interval = setInterval(() => {
      const randomNode = graphNodes[Math.floor(Math.random() * graphNodes.length)];
      triggerRecommendation(randomNode.id);
    }, 15000);
    
    // Initial trigger
    setTimeout(() => {
      triggerRecommendation(graphNodes[0].id);
    }, 2000);

    return () => clearInterval(interval);
  }, [triggerRecommendation]);

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

    // Animate the camera properties
    tl.to(cameraTargetRef.current, {
      orbit: Math.PI * 1.5, // 270 degrees
      zoom: 25, // Zoom in
      ease: "power1.inOut"
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[140vh] sm:h-[160vh] bg-[#020202]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-auto">
        <Canvas gl={{ antialias: true, alpha: false }} dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 45]} fov={45} />
          <ambientLight intensity={0.05} />
          {/* Inner brain glow that illuminates the surroundings */}
          <pointLight position={[0, 0, 0]} intensity={3} color="#d4af37" distance={60} decay={2} />
          {/* Soft directional fill */}
          <directionalLight position={[10, 20, 15]} intensity={0.5} color="#4a4a6a" />
          <directionalLight position={[-10, -20, -15]} intensity={0.2} color="#1a1a2e" />
          
          <NeuralSphere scrollCameraTarget={cameraTargetRef} />
          <ParticleField />
          
        </Canvas>
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,2,2,0.8)_100%)] z-10" />
        
        {/* Panels */}
        <div className="absolute inset-0 pointer-events-none z-20 flex justify-between items-center p-8 md:p-16">
          <SimilarityPanel />
          <RecommendationPanel />
        </div>
      </div>
    </section>
  );
};
