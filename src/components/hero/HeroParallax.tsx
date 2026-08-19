import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";

export const HeroParallax = ({ children }: { children: ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 30;
      const y = (clientY / window.innerHeight - 0.5) * 30;

      gsap.to(container, {
        x,
        y,
        rotationY: x * 0.02,
        rotationX: -y * 0.02,
        duration: 2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="hero-parallax-container w-full h-full relative" style={{ transformStyle: "preserve-3d", perspective: "1000px" }}>
      {children}
    </div>
  );
};
