import { useShallow } from 'zustand/react/shallow';
import { memo } from "react";
import { Movie } from "../../lib/posterData";
import { SpatialPosition } from "../../lib/depthSystem";
import { usePosterHover } from "../../hooks/usePosterHover";
import { usePosterFocus } from "../../hooks/usePosterFocus";
import { useFloatingAnimation } from "../../hooks/useFloatingAnimation";
import { cn } from "../../lib/utils";

interface MoviePosterProps {
  movie: Movie;
  position: SpatialPosition;
  index: number;
}

export const MoviePoster = memo(({ movie, position, index }: MoviePosterProps) => {
  const { posterRef, glowRef } = usePosterHover();
  const { focusedPosterId, setFocusedPosterId } = usePosterFocus(
    useShallow(s => ({ focusedPosterId: s.focusedPosterId, setFocusedPosterId: s.setFocusedPosterId }))
  );
  
  // Use index for random delay offset to desynchronize floats
  useFloatingAnimation(posterRef, (index % 10) * 0.5, 1 / position.layer);

  const isFocused = focusedPosterId === movie.id;
  const isBlurTarget = focusedPosterId !== null && !isFocused;

  // Cinematic blur based on depth layer and focus state
  const blurAmount = isBlurTarget ? 15 : Math.max(0, (position.layer - 3) * 2);

  return (
    <div
      ref={posterRef}
      onClick={() => setFocusedPosterId(movie.id)}
      className={cn(
        "absolute top-1/2 left-1/2 cursor-pointer group transition-all duration-1000",
        isFocused ? "z-50" : "z-10"
      )}
      style={{
        transform: `translate3d(-50%, -50%, ${position.z}px) 
                    translateX(${position.x}vw) 
                    translateY(${position.y}vh) 
                    scale(${position.scale}) 
                    rotateX(${position.rotationX}deg) 
                    rotateY(${position.rotationY}deg) 
                    rotateZ(${position.rotationZ}deg)`,
        transformStyle: "preserve-3d",
        filter: `blur(${blurAmount}px) brightness(${isBlurTarget ? 0.3 : 1})`,
      }}
    >
      <div 
        className={cn(
          "relative w-[280px] md:w-[320px] aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl transition-all duration-700",
          "border border-white/10 bg-[#0a0a0a]",
          isFocused ? "shadow-[0_0_80px_rgba(212,175,55,0.3)] ring-1 ring-cine-gold/50" : ""
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        <img 
          src={movie.poster} 
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-1000"
        />
        
        {/* Glass Reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        {/* Interactive Hover Glow */}
        <div 
          ref={glowRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)] opacity-0 pointer-events-none mix-blend-overlay"
        />
        
        {/* Shadow vignette for cinema feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
        
        {/* Title overlay (appears on hover if not focused) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
          <h3 className="font-heading text-xl font-bold text-white tracking-wider uppercase mb-1">{movie.title}</h3>
          <p className="font-body text-xs text-cine-gold uppercase tracking-widest">{movie.genre}</p>
        </div>
      </div>
    </div>
  );
});

MoviePoster.displayName = "MoviePoster";
