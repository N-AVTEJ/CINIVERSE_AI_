import { useShallow } from 'zustand/react/shallow';
import { usePlanetFocus } from "../../hooks/usePlanetFocus";
import { genreData } from "../../lib/genreData";

export const PlanetInfoPanel = () => {
  const { focusedPlanetId, setFocusedPlanetId } = usePlanetFocus(
    useShallow(s => ({ focusedPlanetId: s.focusedPlanetId, setFocusedPlanetId: s.setFocusedPlanetId }))
  );

  if (!focusedPlanetId) return <div className="w-80 md:w-96 lg:w-[400px]" />; // Spacer

  const genre = genreData.find(g => g.id === focusedPlanetId);
  if (!genre) return <div className="w-80 md:w-96 lg:w-[400px]" />;

  return (
    <div className="w-80 md:w-96 lg:w-[400px] glass-panel rounded-3xl p-8 backdrop-blur-2xl border border-white/10 bg-black/50 text-left transition-all duration-1000 animate-fade-in-up relative overflow-hidden">
      {/* Colored glow behind panel based on genre */}
      <div 
        className="absolute top-0 left-0 w-full h-1" 
        style={{ background: `linear-gradient(90deg, transparent, ${genre.themeColor}, transparent)` }} 
      />
      
      <button 
        className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
        onClick={(e) => {
          e.stopPropagation();
          setFocusedPlanetId(null);
        }}
      >
        <span className="w-3 h-px bg-white rotate-45 absolute" />
        <span className="w-3 h-px bg-white -rotate-45 absolute" />
      </button>

      <h4 className="text-white/50 uppercase tracking-[0.3em] text-[10px] font-bold mb-2">Cinematic Universe</h4>
      <h2 
        className="font-heading text-4xl font-bold leading-tight uppercase mb-6 drop-shadow-lg"
        style={{ color: genre.themeColor }}
      >
        {genre.name}
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <p className="text-white/30 text-[9px] uppercase tracking-widest mb-1">Movies</p>
          <p className="text-white text-sm font-bold">{genre.movieCount}</p>
        </div>
        <div>
          <p className="text-white/30 text-[9px] uppercase tracking-widest mb-1">Avg Rating</p>
          <p className="text-white text-sm font-bold">{genre.averageRating}</p>
        </div>
        <div className="col-span-2">
          <p className="text-white/30 text-[9px] uppercase tracking-widest mb-1">Mood</p>
          <p className="text-white/90 text-sm">{genre.mood}</p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <p className="text-white/30 text-[9px] uppercase tracking-widest mb-2">Top Directors</p>
          <div className="flex flex-wrap gap-2">
            {genre.topDirectors.map(dir => (
              <span key={dir} className="px-2 py-1 text-[10px] uppercase tracking-wider border border-white/10 rounded-full text-white/70 bg-white/5">
                {dir}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button 
          className="w-full py-4 text-black font-bold uppercase tracking-widest text-xs transition-colors duration-500 rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          style={{ backgroundColor: genre.themeColor }}
        >
          Explore {genre.name} Movies
        </button>
        <button className="w-full py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:border-white transition-colors duration-500 rounded-sm">
          Watch Trailer Collection
        </button>
      </div>
    </div>
  );
};
