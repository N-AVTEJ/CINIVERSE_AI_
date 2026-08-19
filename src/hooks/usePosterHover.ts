import { useRef, useEffect } from "react";
import gsap from "gsap";

export const usePosterHover = () => {
  const posterRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const poster = posterRef.current;
    const glow = glowRef.current;
    if (!poster) return;

    let hoverTl: gsap.core.Timeline;

    const onMouseEnter = (e: MouseEvent) => {
      // Small lift, glass reflection, rotation
      hoverTl = gsap.timeline();
      hoverTl.to(poster, {
        z: "+=50",
        scale: 1.05,
        rotationX: 0,
        rotationY: 0,
        duration: 0.6,
        ease: "power2.out",
        boxShadow: "0 30px 60px -10px rgba(0,0,0,0.8), 0 0 40px rgba(212,175,55,0.2)",
      }, 0);
      
      if (glow) {
        hoverTl.to(glow, {
          opacity: 0.8,
          duration: 0.6,
        }, 0);
      }
    };

    const onMouseLeave = () => {
      if (hoverTl) hoverTl.kill();
      
      // Revert to original (this will be overridden by the floating animation slightly, 
      // but returning z and scale to normal is good)
      gsap.to(poster, {
        scale: 1,
        z: "-=50",
        duration: 0.8,
        ease: "power2.out",
        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
      });
      
      if (glow) {
        gsap.to(glow, {
          opacity: 0,
          duration: 0.8,
        });
      }
    };
    
    const onMouseMove = (e: MouseEvent) => {
      if (!poster) return;
      const rect = poster.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate rotation based on mouse position over the poster
      const rotationX = -(y / rect.height) * 15;
      const rotationY = (x / rect.width) * 15;
      
      gsap.to(poster, {
        rotationX,
        rotationY,
        duration: 0.3,
        ease: "power1.out"
      });
      
      if (glow) {
        gsap.to(glow, {
          x: x * 0.5,
          y: y * 0.5,
          duration: 0.3
        });
      }
    };

    poster.addEventListener("mouseenter", onMouseEnter);
    poster.addEventListener("mouseleave", onMouseLeave);
    poster.addEventListener("mousemove", onMouseMove);

    return () => {
      poster.removeEventListener("mouseenter", onMouseEnter);
      poster.removeEventListener("mouseleave", onMouseLeave);
      poster.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return { posterRef, glowRef };
};
