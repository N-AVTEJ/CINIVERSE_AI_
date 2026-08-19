export const Footer = () => {
  return (
    <footer className="relative z-10 px-8 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between border-t border-white/5 gap-4">
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase font-body">
        <span>IMDb 9.8</span>
        <span className="hidden md:inline">•</span>
        <span>ROTTEN TOMATOES 99%</span>
        <span className="hidden md:inline">•</span>
        <span>ACADEMY AWARD NOMINEE</span>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase font-body">SCROLL TO NAVIGATE</span>
        <div className="w-12 h-px bg-white/20"></div>
      </div>
    </footer>
  );
};
