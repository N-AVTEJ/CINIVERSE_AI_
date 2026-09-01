import { useMemorySearch } from '../../hooks/useMemorySearch';

interface MemorySearchProps {
  onSelectMovieId?: (id: string) => void;
}

export const MemorySearch = ({ onSelectMovieId }: MemorySearchProps) => {
  const { searchQuery, setSearchQuery, isOpen, setIsOpen, filteredMemories, hasResults } =
    useMemorySearch();

  return (
    <div className="relative pointer-events-auto">
      {/* Small refined trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3.5 py-2 rounded-full bg-slate-950/80 backdrop-blur-xl border border-sky-500/30 hover:border-sky-400 text-sky-200 text-xs font-mono tracking-wider flex items-center gap-2 shadow-xl hover:scale-105 transition-all cursor-pointer"
        aria-label="Search cinematic memory"
      >
        <span className="text-sky-400">🔍</span>
        <span>Search Vault</span>
      </button>

      {/* Floating refined search drawer */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 md:w-96 p-4 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-sky-500/30 text-white shadow-2xl animate-fadeIn z-50">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movie, director, genre, emotion..."
              className="w-full bg-transparent text-xs text-white placeholder-slate-500 outline-none pr-2 font-mono"
              autoFocus
            />
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white font-mono text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="mt-3 max-h-56 overflow-y-auto space-y-2 pr-1">
            {!hasResults ? (
              <p className="text-xs text-slate-500 font-mono py-3 text-center">
                No matching cinematic memories found.
              </p>
            ) : (
              filteredMemories.map((mem) => (
                <button
                  key={mem.id}
                  onClick={() => {
                    if (onSelectMovieId) onSelectMovieId(mem.id);
                    setIsOpen(false);
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-900/60 hover:bg-sky-950/60 border border-slate-800/80 hover:border-sky-400/60 text-left transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div>
                    <p className="text-xs font-semibold text-white group-hover:text-sky-300">
                      {mem.title}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {mem.director} • {mem.genre}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-sky-400/80 px-2 py-0.5 rounded-md bg-slate-950">
                    {mem.interactionType}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
