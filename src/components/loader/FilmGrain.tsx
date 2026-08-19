export const FilmGrain = () => {
  return (
    <div
      className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-30"
      style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
        animation: "grain 0.8s steps(10) infinite",
      }}
    >
      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0) }
          10% { transform: translate(-1%, -1%) }
          20% { transform: translate(1%, 1%) }
          30% { transform: translate(-2%, -2%) }
          40% { transform: translate(2%, 2%) }
          50% { transform: translate(-1%, 2%) }
          60% { transform: translate(1%, -1%) }
          70% { transform: translate(2%, 1%) }
          80% { transform: translate(-2%, -1%) }
          90% { transform: translate(1%, -2%) }
        }
      `}</style>
    </div>
  );
};
