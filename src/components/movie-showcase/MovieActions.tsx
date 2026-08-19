import { motion } from 'motion/react';
import { Play, Bookmark, BookmarkCheck, Network, Compass } from 'lucide-react';
import { MovieShowcaseItem } from '../../lib/moviePresentation';
import { scrollDirector } from '../../lib/scrollDirector';

interface MovieActionsProps {
  movie: MovieShowcaseItem;
  isSavedInWatchlist: boolean;
  onWatchTrailer: () => void;
  onToggleWatchlist: () => void;
}

export const MovieActions = ({
  movie,
  isSavedInWatchlist,
  onWatchTrailer,
  onToggleWatchlist,
}: MovieActionsProps) => {
  const atmosphere = movie.atmospherePreset;

  const handleExploreUniverse = () => {
    // Scroll smoothly to movie universe or constellation section if available
    const target = document.getElementById('movie-universe') || document.getElementById('constellation');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      scrollDirector.transitionTo('movie-universe');
    }
  };

  const handleDiscoverSimilar = () => {
    const target = document.getElementById('emotion-engine');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.65 }}
      className="flex flex-wrap items-center gap-3 pt-2"
      id={`showcase-actions-${movie.id}`}
    >
      {/* Primary: WATCH TRAILER */}
      <button
        onClick={onWatchTrailer}
        className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-bold text-sm text-black transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] active:scale-95 cursor-pointer overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #ffffff 0%, ${atmosphere.lightRayColor} 100%)`,
        }}
      >
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-black text-white transition-transform duration-300 group-hover:scale-110">
          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
        </div>
        <span className="tracking-wider uppercase font-extrabold text-xs">Watch Trailer</span>
      </button>

      {/* Secondary: SAVE TO WATCHLIST */}
      <button
        onClick={onToggleWatchlist}
        className={`inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border backdrop-blur-md cursor-pointer active:scale-95 ${
          isSavedInWatchlist
            ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
            : 'bg-white/5 border-white/15 text-white hover:bg-white/10 hover:border-white/30'
        }`}
      >
        {isSavedInWatchlist ? (
          <>
            <BookmarkCheck className="w-4 h-4 text-amber-400" />
            <span>Saved in Watchlist</span>
          </>
        ) : (
          <>
            <Bookmark className="w-4 h-4 text-neutral-300" />
            <span>Save to Watchlist</span>
          </>
        )}
      </button>

      {/* Extension Action 1: Explore Universe (Phase 15 integration point) */}
      <button
        onClick={handleExploreUniverse}
        className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl text-xs font-semibold text-neutral-300 bg-neutral-900/60 border border-white/10 hover:bg-neutral-800 hover:text-white transition-all cursor-pointer backdrop-blur-md"
        title="Explore connected films in the Movie Universe graph"
      >
        <Network className="w-4 h-4 text-neutral-400" />
        <span>Explore Universe</span>
      </button>

      {/* Extension Action 2: Discover Similar */}
      <button
        onClick={handleDiscoverSimilar}
        className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
        title="Discover similar stories with Emotion Engine"
      >
        <Compass className="w-4 h-4" />
        <span>Similar Stories</span>
      </button>
    </motion.div>
  );
};
