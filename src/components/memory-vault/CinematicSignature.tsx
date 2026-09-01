import { TasteProfile } from '../../lib/memoryModel';

interface CinematicSignatureProps {
  tasteProfile: TasteProfile;
  onClose?: () => void;
}

export const CinematicSignature = ({ tasteProfile, onClose }: CinematicSignatureProps) => {
  return (
    <div className="w-full max-w-xl p-6 md:p-8 rounded-2xl bg-slate-950/85 backdrop-blur-2xl border border-sky-500/30 text-white shadow-2xl transition-all animate-fadeIn">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div>
          <span className="font-mono text-sky-400 text-[10px] uppercase tracking-widest block">
            AI Cinematic Analysis
          </span>
          <h3 className="font-heading text-xl md:text-2xl font-light tracking-wide uppercase mt-0.5">
            Your Cinematic Signature
          </h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-mono text-sm px-2 cursor-pointer"
            aria-label="Close signature overlay"
          >
            ✕
          </button>
        )}
      </div>

      {tasteProfile.isForming ? (
        <div className="py-6 text-center">
          <div className="w-10 h-10 mx-auto rounded-full bg-sky-950/50 border border-sky-500/30 flex items-center justify-center text-sky-400 text-lg mb-3">
            ✦
          </div>
          <h4 className="font-heading text-lg text-white font-light">
            Your cinematic signature is still forming.
          </h4>
          <p className="text-xs text-slate-300/80 mt-2 max-w-md mx-auto leading-relaxed">
            Your archive is waiting. Explore a few stories across the Movie Universe or Emotion Map, and CINEVERSE will begin mapping your unique cinematic signature.
          </p>
        </div>
      ) : (
        <div className="space-y-4 mt-5">
          {/* Emotional Preference */}
          {tasteProfile.emotions.length > 0 && (
            <div>
              <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest block">
                Primary Emotional Vector
              </span>
              <p className="text-sm font-semibold text-white mt-1 capitalize">
                {tasteProfile.emotions[0].name} ({Math.round(tasteProfile.emotions[0].score * 100)}% Match)
              </p>
            </div>
          )}

          {/* Genre Tendencies */}
          {tasteProfile.genres.length > 0 && (
            <div>
              <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest block">
                Genre Tendencies
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {tasteProfile.genres.map((g) => (
                  <span
                    key={g.id}
                    className="px-2.5 py-1 rounded-full bg-sky-950/50 border border-sky-800/40 text-xs text-sky-200 font-mono"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Directors */}
          {tasteProfile.directors.length > 0 && (
            <div>
              <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest block">
                Director Affinities
              </span>
              <p className="text-xs text-slate-200 mt-1">
                {tasteProfile.directors.map((d) => d.name).join(' • ')}
              </p>
            </div>
          )}

          {/* Pacing & Confidence */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                Pacing Preference
              </span>
              <span className="font-semibold text-slate-200">{tasteProfile.pacingPreference}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                Signature Confidence
              </span>
              <span className="font-mono text-sky-400 font-semibold">
                {Math.round(tasteProfile.confidence * 100)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
