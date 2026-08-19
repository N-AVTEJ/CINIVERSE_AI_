import { useShallow } from 'zustand/react/shallow';
import { usePosterFocus } from "../../hooks/usePosterFocus";
import { moviesData } from "../../lib/posterData";

export const PosterInfoPanel = () => {
  const { focusedPosterId, setFocusedPosterId } = usePosterFocus(
    useShallow(s => ({ focusedPosterId: s.focusedPosterId, setFocusedPosterId: s.setFocusedPosterId }))
  );

  const movie = moviesData.find((m) => m.id === focusedPosterId);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-4 md:p-12">
      {/* Click outside to close */}
      <div 
        className="absolute inset-0 pointer-events-auto cursor-pointer bg-black/40 backdrop-blur-sm"
        onClick={() => setFocusedPosterId(null)}
      />
      
      <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 gap-8 md:gap-12 bg-black/60 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-2xl shadow-2xl pointer-events-auto transform transition-all">
        {/* Left: Selected Poster Clone */}
        <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl">
          <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
        
        {/* Right: Info */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-cine-gold border border-cine-gold/30 rounded-full">
              {movie.year}
            </span>
            <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-white/70 border border-white/20 rounded-full">
              {movie.runtime}
            </span>
            <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-white/70 border border-white/20 rounded-full">
              IMDb {movie.rating}
            </span>
          </div>
          
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight leading-none mb-2">
            {movie.title}
          </h2>
          <p className="font-heading text-lg md:text-xl text-white/50 italic tracking-wide mb-8">
            Dir. {movie.director}
          </p>
          
          <p className="font-body text-sm md:text-base text-white/70 leading-relaxed font-light mb-10 max-w-lg">
            {movie.synopsis}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <button className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-cine-gold transition-colors duration-500 rounded-sm">
              Watch Trailer
            </button>
            <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:border-white transition-colors duration-500 rounded-sm">
              Discover Similar
            </button>
          </div>
          
          <button 
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
            onClick={() => setFocusedPosterId(null)}
          >
            <span className="w-4 h-px bg-white rotate-45 absolute" />
            <span className="w-4 h-px bg-white -rotate-45 absolute" />
          </button>
        </div>
      </div>
    </div>
  );
};
