import { useEffect, RefObject } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { createHeroEntranceTimeline, createHeroScrollTimeline } from "../lib/heroAnimations";
import { useLoader } from "./useLoader";

gsap.registerPlugin(ScrollTrigger);

export const useHeroTimeline = (containerRef: RefObject<HTMLElement | null>) => {
  const { isLoading } = useLoader();

  useEffect(() => {
    if (!containerRef.current) return;
    if (isLoading) return; // Wait for loader to finish

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Entrance animation
    const entranceTl = createHeroEntranceTimeline(containerRef.current, isReducedMotion);

    // Scroll animation
    let scrollTl: gsap.core.Timeline | undefined;
    if (!isReducedMotion) {
      scrollTl = createHeroScrollTimeline(containerRef.current);
    }

    return () => {
      entranceTl.kill();
      if (scrollTl) scrollTl.kill();
    };
  }, [isLoading, containerRef]);
};
