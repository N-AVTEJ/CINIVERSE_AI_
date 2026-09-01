import { useMemoryRecall } from '../../hooks/useMemoryRecall';

export const MemoryRecall = () => {
  const { recallFeeling, primaryEmotion } = useMemoryRecall();

  return (
    <button
      onClick={() => recallFeeling(primaryEmotion)}
      className="px-4 py-2 rounded-full bg-slate-950/80 backdrop-blur-xl border border-sky-500/30 hover:border-sky-400 text-sky-200 text-xs font-mono tracking-wider flex items-center gap-2 shadow-xl hover:scale-105 transition-all cursor-pointer pointer-events-auto"
      aria-label="Recall a feeling"
    >
      <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
      <span>Recall a feeling</span>
    </button>
  );
};
