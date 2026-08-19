import { useEffect, useRef, ReactNode } from "react";
import { cinematicEngine } from "../../lib/cinematicEngine";

export const CameraRig = ({ children }: { children: ReactNode }) => {
  const rigRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rigRef.current || cinematicEngine.isReducedMotion) return;

    // Apply global cinematic camera dolly and tilt as user scrolls the whole page
    const master = cinematicEngine.masterTimeline;

    master.to(rigRef.current, {
      z: 300, // Dolly in globally
      rotationX: 1.5, // Micro tilt
      ease: "none"
    });

  }, []);

  return (
    <div className="w-full h-full" style={{ perspective: "1500px", overflowX: "hidden" }}>
      <div ref={rigRef} className="camera-rig w-full h-full" style={{ transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </div>
  );
};
