import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useSceneProgress } from "../../hooks/useSceneProgress";
import { useTimelineProgress } from "../../hooks/useTimelineProgress";
import { TimelineScene } from "./TimelineScene";
import { EraPanel } from "./EraPanel";
import { useShallow } from "zustand/react/shallow";

export const TimelineOfCinema = () => {
  const progress = useSceneProgress("timeline-of-cinema");
  const setProgress = useTimelineProgress(s => s.setProgress);

  useEffect(() => {
    setProgress(progress);
  }, [progress, setProgress]);

  return (
    <section className="relative h-[600vh] w-full bg-[#020202]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Canvas gl={{ antialias: true, alpha: false }} dpr={[1, 2]}>
          <TimelineScene />
        </Canvas>
        
        <div className="absolute inset-0 pointer-events-none z-10">
          <EraPanel />
        </div>
      </div>
    </section>
  );
};
