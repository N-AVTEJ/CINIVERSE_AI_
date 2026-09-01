import { useMoodFinder } from '../../hooks/useMoodFinder';
import { EMOTIONS } from '../../lib/emotionData';

export const MoodFinder = () => {
  const {
    isOpen,
    setIsOpen,
    selectedEmotionIds,
    toggleEmotion,
    clearEmotions,
    applyMood,
    resetMood,
  } = useMoodFinder();

  return (
    <div className="absolute top-8 right-8 z-30 pointer-events-auto">
      {/* Control Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2.5 rounded-full bg-slate-950/80 backdrop-blur-xl border border-sky-500/40 hover:border-sky-400 text-sky-200 text-xs md:text-sm font-mono tracking-wider flex items-center gap-2 shadow-xl hover:scale-105 transition-all cursor-pointer"
        aria-label="Find my mood selector"
      >
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
        Find my mood
        {selectedEmotionIds.length > 0 && (
          <span className="px-1.5 py-0.5 rounded-full bg-sky-500/30 text-[10px] text-sky-300">
            {selectedEmotionIds.length}
          </span>
        )}
      </button>

      {/* Floating Selector Drawer */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 md:w-96 p-5 rounded-2xl bg-slate-950/90 backdrop-blur-2xl border border-sky-500/30 text-white shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h4 className="font-heading text-sm uppercase tracking-widest text-sky-300">
              AI Mood Filter
            </h4>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white font-mono text-xs"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-slate-300/80 mt-2">
            Select feelings to dynamically reorganize the 3D map.
          </p>

          <div className="grid grid-cols-2 gap-2 mt-3 max-h-48 overflow-y-auto pr-1">
            {EMOTIONS.slice(0, 10).map((emo) => {
              const isSelected = selectedEmotionIds.includes(emo.id);
              return (
                <button
                  key={emo.id}
                  onClick={() => toggleEmotion(emo.id)}
                  className={`p-2 rounded-xl text-left text-xs transition-all border ${
                    isSelected
                      ? 'bg-sky-950/80 border-sky-400 text-white shadow-lg'
                      : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: emo.color }}
                  />
                  {emo.name}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-800">
            <button
              onClick={resetMood}
              className="px-3 py-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              Reset
            </button>
            <button
              onClick={() => {
                applyMood();
                setIsOpen(false);
              }}
              disabled={selectedEmotionIds.length === 0}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-semibold hover:brightness-110 disabled:opacity-40 transition-all cursor-pointer shadow-lg"
            >
              Transform Map
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
