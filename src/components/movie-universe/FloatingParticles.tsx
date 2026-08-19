export const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-30" style={{ transformStyle: "preserve-3d", backgroundImage: "var(--noise)" }}>
      {/* Simulated dust using noise overlay, actual moving particles might be too heavy, so we rely on subtle noise for cinematic dust texture */}
    </div>
  );
};
