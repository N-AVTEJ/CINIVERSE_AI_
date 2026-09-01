import { MovieMemory } from '../../lib/memoryModel';

interface MemoryInsightProps {
  memory: MovieMemory;
  onClose: () => void;
}

export const MemoryInsight = ({ memory, onClose }: MemoryInsightProps) => {
  return (
    <div className="w-full max-w-md p-6 rounded-2xl bg-slate-950/90 backdrop-blur-2xl border border-sky-400/40 text-white shadow-2xl transition-all animate-fadeIn">
      <div className="flex items-start justify-between pb-3 border-b border-slate-800">
        <div>
          <span className="font-mono text-sky-400 text-[10px] uppercase tracking-widest block">
            Archived Memory Summary
          </span>
          <h3 className="font-heading text-xl md:text-2xl font-light tracking-wide mt-0.5">
            {memory.title}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            {memory.director} • {memory.year} • {memory.genre}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white font-mono text-base px-2 cursor-pointer"
          aria-label="Close memory summary"
        >
          ✕
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {/* Entry Origin */}
        <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-800/40">
          <span className="font-mono text-sky-300 text-[10px] uppercase tracking-widest block">
            Archive Origin
          </span>
          <p className="text-xs text-sky-100 font-medium mt-1">
            Entered memory via <span className="text-sky-300">{memory.source}</span> as{' '}
            <span className="text-sky-300">{memory.interactionType}</span>.
          </p>
        </div>

        {/* Emotion Context */}
        {memory.emotionContext && (
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="font-mono text-slate-400 text-[10px] uppercase tracking-widest block">
              Emotional Resonance
            </span>
            <p className="text-xs text-slate-200 mt-0.5 capitalize">{memory.emotionContext}</p>
          </div>
        )}

        {/* Description / Metadata */}
        {memory.metadata?.description && (
          <p className="text-xs text-slate-300/90 leading-relaxed pt-1">
            {memory.metadata.description}
          </p>
        )}
      </div>
    </div>
  );
};
