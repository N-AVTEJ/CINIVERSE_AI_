import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useSceneProgress } from "../../hooks/useSceneProgress";
import { useDirectorWorld } from "../../hooks/useDirectorWorld";
import { HallScene } from "./HallScene";
import { DirectorInsightPanel } from "./DirectorInsightPanel";
import { directorData } from "../../lib/directorData";
import { AnimatePresence, motion } from "motion/react";
import { useShallow } from "zustand/react/shallow";

export const DirectorHall = () => {
  const progress = useSceneProgress("hall-of-directors");
  
  const { activeDirectorId, isInsideWorld } = useDirectorWorld(
    useShallow(s => ({
      activeDirectorId: s.activeDirectorId,
      isInsideWorld: s.isInsideWorld
    }))
  );

  const activeDirector = directorData.find(d => d.id === activeDirectorId);

  return (
    <section className="relative h-[800vh] w-full bg-[#020202]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        <Canvas gl={{ antialias: true, alpha: false }} dpr={[1, 2]}>
          <HallScene progress={progress} />
        </Canvas>

        {/* Overlay HUD */}
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-8">
          
          {/* Hallway Title (fades out when entering a world) */}
          <AnimatePresence>
            {!activeDirectorId && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center mt-10"
              >
                <h1 className="font-heading text-4xl tracking-[0.2em] uppercase text-white">
                  Hall of Legendary Directors
                </h1>
                <p className="text-cine-muted mt-4 tracking-widest text-sm uppercase">
                  Select a portal to explore their cinematic universe
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Director Insight Panel (appears when fully inside) */}
          <AnimatePresence>
            {isInsideWorld && activeDirector && (
              <DirectorInsightPanel director={activeDirector} />
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};
