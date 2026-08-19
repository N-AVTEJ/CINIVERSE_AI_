import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cinematicEngine } from "../../lib/cinematicEngine";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);
    
    // Use GSAP ticker to update cursor position and incorporate scroll velocity
    const updateCursor = () => {
      const velocity = cinematicEngine.getVelocity() || 0;
      const normalizedVelocity = Math.min(Math.max(velocity / 1000, -1), 1);
      
      const stretch = 1 + Math.abs(normalizedVelocity) * 1.5;
      const angle = velocity > 0 ? 90 : -90; // stretch vertically on scroll
      
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        scaleY: stretch,
        rotation: Math.abs(velocity) > 50 ? angle : 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    gsap.ticker.add(updateCursor);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(updateCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[100] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cine-gold/50 bg-cine-gold/10 backdrop-blur-sm hidden md:block"
      style={{ mixBlendMode: "screen" }}
    />
  );
};
