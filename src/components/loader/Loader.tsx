import { useEffect, useRef } from "react";
import { ProjectorBeam } from "./ProjectorBeam";
import { Letterbox } from "./Letterbox";
import { FilmGrain } from "./FilmGrain";
import { DustParticles } from "./DustParticles";
import { LoaderLogo } from "./LoaderLogo";
import { useLoader } from "../../hooks/useLoader";
import { createLoaderTimeline } from "../../lib/loaderTimeline";
import gsap from "gsap";

export const Loader = () => {
  const { isLoading, setIsLoading } = useLoader();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Simulate asset loading
    let assetsLoaded = false;
    const handleLoad = () => {
      assetsLoaded = true;
    };
    window.addEventListener("load", handleLoad);
    if (document.readyState === "complete") {
      assetsLoaded = true;
    }

    const timeline = createLoaderTimeline(() => {
      setIsLoading(false);
    }, prefersReducedMotion);

    // If assets load quickly, we can speed up the timeline slightly but keep the cinematic feel
    const checkAssets = setInterval(() => {
      if (assetsLoaded) {
        gsap.to(timeline, { timeScale: 1.5, duration: 0.5 });
        clearInterval(checkAssets);
      }
    }, 500);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearInterval(checkAssets);
      timeline.kill();
    };
  }, [setIsLoading]);

  if (!isLoading) return null;

  return (
    <div ref={containerRef} className="loader-container fixed inset-0 z-[999] flex items-center justify-center bg-[#050505] overflow-hidden">
      <div className="loader-glow absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_60%)] opacity-0"></div>
      <FilmGrain />
      <DustParticles />
      <ProjectorBeam />
      <Letterbox />
      <LoaderLogo />
    </div>
  );
};
