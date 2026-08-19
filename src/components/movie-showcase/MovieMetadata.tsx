import { motion } from 'motion/react';
import { Star, Film, Clock, Calendar, User, Users } from 'lucide-react';
import { MovieShowcaseItem } from '../../lib/moviePresentation';

interface MovieMetadataProps {
  movie: MovieShowcaseItem;
}

export const MovieMetadata = ({ movie }: MovieMetadataProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-4 text-sm text-neutral-300"
      id={`showcase-metadata-${movie.id}`}
    >
      {/* Primary Specs Bar */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-medium">
        {/* Rating */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="font-bold">{movie.rating.toFixed(1)}</span>
        </div>

        {/* Year */}
        <div className="flex items-center gap-1.5 text-neutral-300">
          <Calendar className="w-4 h-4 text-neutral-400" />
          <span>{movie.year}</span>
        </div>

        <span className="text-neutral-600">•</span>

        {/* Runtime */}
        <div className="flex items-center gap-1.5 text-neutral-300">
          <Clock className="w-4 h-4 text-neutral-400" />
          <span>{movie.runtime}</span>
        </div>

        <span className="text-neutral-600">•</span>

        {/* Genre */}
        <div className="flex items-center gap-1.5 text-neutral-300">
          <Film className="w-4 h-4 text-neutral-400" />
          <span>{movie.genre}</span>
        </div>
      </div>

      {/* Director & Key Cast */}
      <div className="grid sm:grid-cols-2 gap-3 pt-2 border-t border-white/10 text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-neutral-500 shrink-0" />
          <div>
            <span className="text-neutral-500">Directed by </span>
            <span className="text-neutral-200 font-semibold">{movie.director}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-neutral-500 shrink-0" />
          <div className="truncate">
            <span className="text-neutral-500">Starring </span>
            <span className="text-neutral-200 font-medium">
              {movie.cast.slice(0, 3).join(', ')}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
