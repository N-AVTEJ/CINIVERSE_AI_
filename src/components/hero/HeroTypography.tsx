export const HeroTypography = () => {
  return (
    <div className="hero-title relative z-20 flex flex-col items-start justify-center h-full px-8 md:px-16 lg:px-[12%] xl:px-[15%] pointer-events-none pt-[15vh]">
      <div className="flex flex-col gap-2 md:gap-4 lg:gap-6 w-full">
        <div className="overflow-hidden">
          <h1 className="hero-title-line font-heading text-6xl sm:text-7xl md:text-8xl lg:text-[130px] leading-[0.85] text-cine-primary font-bold text-glow tracking-tight">
            THE FUTURE
          </h1>
        </div>
        <div className="overflow-hidden md:ml-32 lg:ml-40">
          <h1 className="hero-title-line font-heading text-6xl sm:text-7xl md:text-8xl lg:text-[130px] leading-[0.85] text-cine-silver italic font-light tracking-tight">
            OF MOVIE
          </h1>
        </div>
        <div className="overflow-hidden md:ml-64 lg:ml-80">
          <h1 className="hero-title-line font-heading text-6xl sm:text-7xl md:text-8xl lg:text-[130px] leading-[0.85] text-cine-primary font-bold text-glow tracking-tight">
            DISCOVERY
          </h1>
        </div>
      </div>
      
      <div className="hero-subtitle mt-8 md:mt-12 max-w-sm self-start md:self-end md:mr-[10%] lg:mr-[15%] border-l border-cine-gold/30 pl-6 relative">
        <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-cine-gold to-transparent"></div>
        <p className="font-body text-sm md:text-base text-white/60 font-light leading-relaxed tracking-wider uppercase">
          Artificial Intelligence meets cinematic storytelling.<br/><br/>
          <span className="text-white/80">Every recommendation begins with emotion.</span>
        </p>
      </div>
    </div>
  );
};
