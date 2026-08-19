import { motion } from 'motion/react';
import { EmotionalRecommendationItem } from '../../lib/emotionalScoring';
import { Compass } from 'lucide-react';

interface SpectrumProps {
  item: EmotionalRecommendationItem;
}

export const EmotionalSpectrum = ({ item }: SpectrumProps) => {
  const dims = item.emotionalDimensions;

  const dimensionList = [
    { label: 'Wonder', val: dims.wonder, color: '#60a5fa' },
    { label: 'Tension', val: dims.tension, color: '#a855f7' },
    { label: 'Joy', val: dims.joy, color: '#fbbf24' },
    { label: 'Sadness', val: dims.sadness, color: '#94a3b8' },
    { label: 'Mystery', val: dims.mystery, color: '#818cf8' },
    { label: 'Romance', val: dims.romance, color: '#f472b6' },
    { label: 'Nostalgia', val: dims.nostalgia, color: '#fb923c' },
    { label: 'Hope', val: dims.hope, color: '#38bdf8' },
  ];

  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center my-4">
      {/* Outer Glow Circle */}
      <div className="absolute inset-0 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl" />

      {/* Radial Spectrum Orbits */}
      <svg className="absolute inset-0 w-full h-full p-4 transform -rotate-90">
        <circle
          cx="112"
          cy="112"
          r="90"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
        <circle
          cx="112"
          cy="112"
          r="60"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />

        {dimensionList.map((d, idx) => {
          const angle = (idx / dimensionList.length) * 2 * Math.PI;
          const maxR = 90;
          const minR = 25;
          const currentR = minR + (d.val / 100) * (maxR - minR);

          const x = 112 + Math.cos(angle) * currentR;
          const y = 112 + Math.sin(angle) * currentR;

          return (
            <g key={d.label}>
              {/* Connecting Spoke */}
              <line
                x1="112"
                y1="112"
                x2={x}
                y2={y}
                stroke={d.color}
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />
              {/* Node Orb */}
              <motion.circle
                cx={x}
                cy={y}
                r="4.5"
                fill={d.color}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              />
            </g>
          );
        })}
      </svg>

      {/* Central Core */}
      <div className="z-10 text-center bg-black/90 rounded-full w-24 h-24 border border-white/20 flex flex-col items-center justify-center p-2 shadow-2xl">
        <Compass className="w-5 h-5 text-cine-gold mb-1 animate-pulse" />
        <span className="text-[10px] font-mono font-bold text-white">
          {item.matchScore}%
        </span>
        <span className="text-[8px] uppercase tracking-widest text-cine-muted">
          Resonance
        </span>
      </div>

      {/* Dimension Floating Labels */}
      {dimensionList.map((d, idx) => {
        const angle = (idx / dimensionList.length) * 2 * Math.PI;
        const labelR = 110;
        const x = Math.cos(angle) * labelR;
        const y = Math.sin(angle) * labelR;

        return (
          <div
            key={d.label}
            className="absolute text-[8px] font-bold tracking-widest uppercase text-white/70 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
            }}
          >
            {d.label}
          </div>
        );
      })}
    </div>
  );
};
