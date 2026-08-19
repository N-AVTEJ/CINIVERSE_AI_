import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, VolumeX, AlertCircle, Film } from 'lucide-react';
import { MovieShowcaseItem } from '../../lib/moviePresentation';

interface TrailerExperienceProps {
  movie: MovieShowcaseItem;
  isOpen: boolean;
  isMuted: boolean;
  hasError: boolean;
  onClose: () => void;
  onToggleMute: () => void;
  onError: () => void;
}

export const TrailerExperience = ({
  movie,
  isOpen,
  isMuted,
  hasError,
  onClose,
  onToggleMute,
  onError,
}: TrailerExperienceProps) => {
  const atmosphere = movie.atmospherePreset;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
          id="trailer-modal-overlay"
        >
          {/* Top Letterbox Bar */}
          <div className="absolute top-0 inset-x-0 h-16 bg-black z-20 border-b border-white/10 flex items-center justify-between px-6 sm:px-10">
            <div className="flex items-center gap-3">
              <Film className="w-5 h-5" style={{ color: atmosphere.accentColor }} />
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">{movie.title}</h3>
                <p className="text-xs text-neutral-400">Official Cinematic Trailer</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Mute Toggle */}
              <button
                onClick={onToggleMute}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title={isMuted ? 'Unmute Trailer' : 'Mute Trailer'}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Close Trailer (ESC)"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Bottom Letterbox Bar */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-black z-20 border-t border-white/10 flex items-center justify-between px-6 sm:px-10 text-xs text-neutral-400">
            <span>Press ESC or click close to exit premiere</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>CINEVERSE Premiere Mode</span>
            </div>
          </div>

          {/* Ambient Lighting Glow Behind Frame */}
          <div
            className="absolute inset-0 pointer-events-none filter blur-3xl opacity-30"
            style={{
              background: `radial-gradient(circle at center, ${atmosphere.primaryColor} 0%, transparent 70%)`,
            }}
          />

          {/* Video Container (Aspect Ratio 16:9) */}
          <div className="relative w-full max-w-5xl aspect-video mx-4 sm:mx-8 rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_100px_rgba(0,0,0,0.9)] bg-neutral-950 z-10">
            {!hasError && movie.trailer?.url ? (
              <iframe
                src={`${movie.trailer.url}&mute=${isMuted ? 1 : 0}`}
                title={`${movie.title} Trailer`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onError={onError}
              />
            ) : (
              /* Fallback Preview Frame if Video Stream is Offline/Blocked */
              <div className="relative w-full h-full flex flex-col items-center justify-center p-8 text-center bg-neutral-900">
                <img
                  src={movie.backdrop || movie.poster}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-30 filter blur-sm"
                />
                <div className="relative z-10 max-w-md space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white font-serif">{movie.title}</h4>
                  <p className="text-sm text-neutral-300">
                    The external video stream is unavailable in this sandbox region. Experience the film directly via streaming platforms or official distribution.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
                    >
                      Return to Showcase
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
