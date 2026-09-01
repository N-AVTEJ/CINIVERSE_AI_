import { useEmotionMap } from '../../hooks/useEmotionMap';
import { useEmotionRegions } from '../../hooks/useEmotionRegions';
import { EMOTION_MAP_MOVIES } from '../../lib/emotionMapData';

export const EmotionReveal = () => {
  const { selectedMovieId, selectedRegionId, setSelectedMovie, setSelectedRegion } =
    useEmotionMap();
  const { activeRegion, moviesForActiveRegion } = useEmotionRegions();

  const selectedMovie = selectedMovieId
    ? EMOTION_MAP_MOVIES.find((m) => m.id === selectedMovieId)
    : null;

  if (!selectedMovie && !selectedRegionId) return null;

  return (
    <div className="absolute inset-x-4 bottom-8 md:bottom-12 z-30 pointer-events-none flex justify-center">
      {/* 1. Emotion Region Reveal (Floating Cinematic Typography) */}
      {activeRegion && selectedRegionId && (
        <div className="w-full max-w-2xl p-6 md:p-8 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-sky-500/30 text-white shadow-2xl pointer-events-auto transition-all animate-fadeIn">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full animate-ping"
                style={{ backgroundColor: activeRegion.color }}
              />
              <h3 className="font-heading text-2xl md:text-3xl font-light tracking-wide uppercase">
                {activeRegion.name}
              </h3>
            </div>
            <button
              onClick={() => setSelectedRegion(null)}
              className="text-slate-400 hover:text-white transition-colors text-xl px-2 font-mono"
              aria-label="Close region reveal"
            >
              ✕
            </button>
          </div>

          <p className="font-sans text-sm md:text-base text-slate-300 mt-2 leading-relaxed">
            {activeRegion.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-800/80 text-xs">
            <div>
              <span className="font-mono text-sky-400 uppercase tracking-widest text-[10px]">
                Compatible Genres
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {activeRegion.compatibleGenres.map((g) => (
                  <span
                    key={g}
                    className="px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-200"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-sky-400 uppercase tracking-widest text-[10px]">
                Common Themes
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {activeRegion.compatibleThemes.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Representative Movies in Region */}
          <div className="mt-4 pt-3 border-t border-slate-800/60">
            <span className="font-mono text-slate-400 text-[10px] uppercase tracking-widest">
              Representative Titles
            </span>
            <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
              {moviesForActiveRegion.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMovie(m.id)}
                  className="px-3 py-1.5 rounded-lg bg-sky-950/40 border border-sky-800/40 hover:border-sky-400 text-xs text-sky-200 whitespace-nowrap transition-all"
                >
                  {m.title} ({m.year})
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. Movie Neighborhood & DNA Reveal */}
      {selectedMovie && (
        <div className="w-full max-w-2xl p-6 md:p-8 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-sky-400/40 text-white shadow-2xl pointer-events-auto transition-all animate-fadeIn">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest">
                Emotional Neighborhood Node
              </span>
              <h3 className="font-heading text-2xl md:text-3xl font-light tracking-wide mt-0.5">
                {selectedMovie.title}
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {selectedMovie.director} • {selectedMovie.year} • {selectedMovie.runtime}
              </p>
            </div>
            <button
              onClick={() => setSelectedMovie(null)}
              className="text-slate-400 hover:text-white transition-colors text-xl px-2 font-mono"
              aria-label="Close movie reveal"
            >
              ✕
            </button>
          </div>

          <p className="text-sm text-slate-300 mt-3 leading-relaxed">
            {selectedMovie.description}
          </p>

          {/* Emotional Spectrum Breakdown */}
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <span className="font-mono text-sky-400 text-[10px] uppercase tracking-widest">
              Emotional Fingerprint
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {selectedMovie.emotionalScores.map((score) => (
                <div
                  key={score.emotionId}
                  className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs"
                >
                  <span className="font-mono text-slate-400 uppercase text-[9px] block">
                    {score.emotionId}
                  </span>
                  <span className="font-semibold text-sky-300 text-sm">
                    {Math.round(score.strength * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
