import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { useScrollVelocity } from "./useScrollVelocity";

export const useCameraMotion = (ref: RefObject<HTMLElement | null>, intensity: number = 1) => {
  const velocity = useScrollVelocity();

  useEffect(() => {
    if (!ref.current) return;
    
    const normalizedVelocity = Math.min(Math.max(velocity / 1000, -1), 1);
    
    gsap.to(ref.current, {
      skewY: normalizedVelocity * 2 * intensity,
      scaleY: 1 + Math.abs(normalizedVelocity) * 0.05 * intensity,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [velocity, ref, intensity]);
};
