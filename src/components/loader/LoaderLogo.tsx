export const LoaderLogo = () => {
  const text = "CINEVERSE AI";
  
  return (
    <div className="relative z-50 flex flex-col items-center justify-center pointer-events-none">
      <div className="relative overflow-hidden py-2">
        <h1 className="font-heading text-4xl md:text-6xl tracking-[0.3em] text-white flex">
          {text.split("").map((char, index) => (
            <span key={index} className="loader-letter inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        {/* Highlight pass element */}
        <div className="loader-highlight absolute top-0 left-0 h-full w-[200%] -translate-x-[150%] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent mix-blend-screen blur-sm"></div>
      </div>
      <p className="loader-tagline mt-6 font-body text-xs md:text-sm tracking-[0.4em] uppercase text-white/60 font-semibold">
        The Future of Movie Discovery
      </p>
    </div>
  );
};
