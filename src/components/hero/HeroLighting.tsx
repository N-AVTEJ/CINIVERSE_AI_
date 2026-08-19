import { useEffect, useRef } from "react";
import gsap from "gsap";

export const HeroLighting = () => {
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const light = lightRef.current;
    if (!light) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = clientX - window.innerWidth / 2;
      const y = clientY - window.innerHeight / 2;

      gsap.to(light, {
        x: x * 0.5,
        y: y * 0.5,
        duration: 3,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <>
      {/* Dynamic Spotlight */}
      <div 
        ref={lightRef}
        className="absolute top-[40%] left-[25%] w-[60vw] h-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_60%)] blur-[100px] pointer-events-none z-0 mix-blend-screen"
      />
      
      {/* Static soft glow specifically behind typography */}
      <div className="absolute top-[45%] left-[30%] w-[70vw] h-[40vw] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] blur-[120px] pointer-events-none z-0 mix-blend-screen" />
    </>
  );
};
