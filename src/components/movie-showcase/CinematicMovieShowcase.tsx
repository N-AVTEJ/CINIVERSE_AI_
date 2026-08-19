import { motion } from 'motion/react';
import { useMovieShowcase } from '../../hooks/useMovieShowcase';
import { useMovieReveal } from '../../hooks/useMovieReveal';
import { useMovieAtmosphere } from '../../hooks/useMovieAtmosphere';
import { useTrailerExperience } from '../../hooks/useTrailerExperience';

import { MovieAtmosphere } from './MovieAtmosphere';
import { MovieArtwork } from './MovieArtwork';
import { MovieTitleReveal } from './MovieTitleReveal';
import { MovieMetadata } from './MovieMetadata';
import { AIMatchScore } from './AIMatchScore';
import { AIExplanation } from './AIExplanation';
import { MovieActions } from './MovieActions';
import { TrailerExperience } from './TrailerExperience';

import { SHOWCASE_PRESENTATION_DATA } from '../../lib/moviePresentation';
import { useEmotionSelection } from '../../hooks/useEmotionSelection';

export const CinematicMovieShowcase = () => {
  const { activeMovie, isSavedInWatchlist, toggleWatchlist } = useMovieShowcase();
  const { sceneProgress, reducedMotion, handleMouseMove, parallax } = useMovieReveal();
  const { atmosphere } = useMovieAtmosphere();
  const {
    isOpen: isTrailerOpen,
    isMuted: isTrailerMuted,
    hasError: isTrailerError,
    setHasError: setTrailerError,
    openTrailer,
    closeTrailer,
    toggleMute: toggleTrailerMute,
  } = useTrailerExperience();

  const setFocusedMovieId = useEmotionSelection((s) => s.setFocusedMovieId);

  return (
    <section
      id="movie-showcase"
      className="relative min-h-screen w-full bg-black text-white overflow-hidden py-16 px-4 sm:px-8 lg:px-16 flex flex-col justify-center items-center select-none"
      onMouseMove={handleMouseMove}
    >
      {/* 1. Atmospheric Backdrop & 3D Lighting Environment */}
      <MovieAtmosphere
        movie={activeMovie}
        parallax={parallax}
        reducedMotion={reducedMotion}
      />

      {/* 2. Main Center Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
        
        {/* Left / Center Column: Dominant Poster Protagonist */}
        <div className="w-full lg:w-5/12 flex flex-col items-center justify-center">
          <MovieArtwork
            movie={activeMovie}
            parallax={parallax}
            openingProgress={sceneProgress}
          />

          {/* Quick Selection Switcher for Alternate Top Recommendations */}
          <div className="mt-6 flex items-center justify-center gap-3 bg-neutral-900/60 p-2 rounded-full border border-white/10 backdrop-blur-md">
            <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase px-2">
              Featured Stories:
            </span>
            {Object.values(SHOWCASE_PRESENTATION_DATA).map((item) => (
              <button
                key={item.id}
                onClick={() => setFocusedMovieId(item.id || null)}
                className={`w-7 h-7 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeMovie.id === item.id
                    ? 'ring-2 ring-white scale-110 font-extrabold text-black'
                    : 'opacity-60 hover:opacity-100 text-neutral-300'
                }`}
                style={{
                  backgroundColor:
                    activeMovie.id === item.id
                      ? atmosphere.primaryColor
                      : 'rgba(255,255,255,0.1)',
                }}
                title={item.title}
              >
                {item.title?.charAt(0)}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Cinematic Details & AI Intent Analysis */}
        <div className="w-full lg:w-7/12 space-y-6 text-left">
          {/* Title & Tagline */}
          <MovieTitleReveal movie={activeMovie} parallax={parallax} />

          {/* Specs & Cast Metadata */}
          <MovieMetadata movie={activeMovie} />

          {/* AI Match Score Radial Ring */}
          <AIMatchScore movie={activeMovie} />

          {/* Natural Language AI Explanation & Themes */}
          <AIExplanation movie={activeMovie} />

          {/* Primary Action Suite */}
          <MovieActions
            movie={activeMovie}
            isSavedInWatchlist={isSavedInWatchlist}
            onWatchTrailer={openTrailer}
            onToggleWatchlist={() => toggleWatchlist(activeMovie.id)}
          />
        </div>
      </div>

      {/* 3. Full-Screen Theatrical Trailer Modal */}
      <TrailerExperience
        movie={activeMovie}
        isOpen={isTrailerOpen}
        isMuted={isTrailerMuted}
        hasError={isTrailerError}
        onClose={closeTrailer}
        onToggleMute={toggleTrailerMute}
        onError={() => setTrailerError(true)}
      />

      {/* Subtle Scroll / Transition Indicator */}
      <motion.div
        className="absolute bottom-4 inset-x-0 flex flex-col items-center justify-center text-[10px] uppercase tracking-widest text-neutral-500 pointer-events-none z-10"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <span>CINEVERSE AI • Phase 14 Cinematic Showcase</span>
      </motion.div>
    </section>
  );
};
