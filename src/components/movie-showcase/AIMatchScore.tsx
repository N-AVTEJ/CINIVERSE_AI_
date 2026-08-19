import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';
import { MovieShowcaseItem } from '../../lib/moviePresentation';

interface AIMatchScoreProps {
  movie: MovieShowcaseItem;
}

export const AIMatchScore = ({ movie }: AIMatchScoreProps) => {
  const [displayScore, setDisplayScore] = useState(0);
  const targetScore = movie.matchScore;
  const atmosphere = movie.atmospherePreset;

  useEffect(() => {
    setDisplayScore(0);
    const duration = 1200; // ms
    const steps = 30;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const current = Math.round((targetScore / steps) * step);
      setDisplayScore(current);
      if (step >= steps) {
        setDisplayScore(targetScore);
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [targetScore]);

  const circleRadius = 26;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.45 }}
      className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-fit shadow-xl"
      id={`showcase-match-score-${movie.id}`}
    >
      {/* Circular Energy Ring */}
      <div className="relative flex items-center justify-center w-14 h-14 shrink-0">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 60 60">
          {/* Background Ring */}
          <circle
            cx="30"
            cy="30"
            r={circleRadius}
            className="stroke-neutral-800"
            strokeWidth="4"
            fill="transparent"
          />
          {/* Animated Glow Ring */}
          <circle
            cx="30"
            cy="30"
            r={circleRadius}
            stroke={atmosphere.primaryColor}
            strokeWidth="4.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-300 ease-out"
          />
        </svg>

        {/* Center Percentage Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-extrabold text-white tracking-tighter">
            {displayScore}%
          </span>
        </div>
      </div>

      {/* Label and Status */}
      <div className="space-y-0.5 pr-2">
        <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-neutral-300">
          <Zap className="w-3.5 h-3.5 fill-current" style={{ color: atmosphere.accentColor }} />
          <span>AI Match Score</span>
        </div>
        <p className="text-xs text-neutral-400">
          Optimal emotional resonance with your intent
        </p>
      </div>
    </motion.div>
  );
};
