import { useEffect, RefObject } from "react";
import gsap from "gsap";

export const useFloatingAnimation = (
  ref: RefObject<HTMLElement | null>,
  delayOffset: number = 0,
  intensity: number = 1
) => {
  useEffect(() => {
    if (!ref.current) return;
    
    // Very subtle floating motion
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    tl.to(ref.current, {
      y: `+=${15 * intensity}`,
      rotationX: `+=${2 * intensity}`,
      rotationZ: `+=${1 * intensity}`,
      duration: 4 + Math.random() * 2,
      ease: "sine.inOut",
      delay: delayOffset
    });
    
    return () => {
      tl.kill();
    };
  }, [ref, delayOffset, intensity]);
};
