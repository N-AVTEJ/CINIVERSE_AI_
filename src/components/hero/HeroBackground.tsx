export const HeroBackground = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-cine-bg">
      {/* Fog and Volumetric illusion */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.03),transparent_50%)]" />
      
      {/* Moving Light Rays */}
      <div 
        className="hero-light-ray absolute -top-[10%] right-[15%] w-[120%] h-[40%] bg-gradient-to-b from-white/10 to-transparent rotate-[-35deg] blur-3xl mix-blend-screen opacity-0" 
        style={{ transformOrigin: 'top right' }}
      />

      {/* Floating Dust / Noise */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: "var(--noise)" }} />
    </div>
  );
};
