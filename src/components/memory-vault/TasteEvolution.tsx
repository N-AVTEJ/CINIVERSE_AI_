import { useTasteEvolution } from '../../hooks/useTasteEvolution';

export const TasteEvolution = () => {
  const { stages, isDataSufficient } = useTasteEvolution();

  if (!isDataSufficient) {
    return (
      <div className="p-4 rounded-xl bg-slate-950/70 backdrop-blur-md border border-slate-800 text-xs text-slate-400 font-mono text-center">
        Taste evolution mapping activates as you explore additional films.
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-sky-500/20 text-white">
      <span className="font-mono text-sky-400 text-[10px] uppercase tracking-widest block mb-3">
        Cinematic Taste Trajectory
      </span>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 overflow-x-auto">
        {stages.map((stage, idx) => (
          <div key={stage.step} className="flex items-center gap-3 shrink-0">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 transition-all">
              <span className="font-mono text-[9px] text-sky-400 block">
                0{stage.step} • {stage.primaryGenre}
              </span>
              <p className="text-xs font-semibold text-white mt-0.5">{stage.label}</p>
              <p className="text-[10px] text-slate-400 mt-0.5 max-w-[150px] line-clamp-1">
                {stage.description}
              </p>
            </div>

            {idx < stages.length - 1 && (
              <span className="text-sky-500/60 font-mono text-xs hidden md:inline">↓</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
