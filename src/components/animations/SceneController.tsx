import { useEffect, useRef, ReactNode } from "react";
import { scrollDirector } from "../../lib/scrollDirector";
import gsap from "gsap";

interface SceneControllerProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export const SceneController = ({ id, children, className = "" }: SceneControllerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const tl = gsap.timeline({ paused: true });
    scrollDirector.registerScene(id, containerRef.current, tl);
    
  }, [id]);

  return (
    <div ref={containerRef} className={`scene-controller relative w-full ${className}`} id={`scene-${id}`}>
      {children}
    </div>
  );
};
