import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { cn } from "../../lib/utils";
import { useSceneProgress } from "../../hooks/useSceneProgress";

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const heroProgress = useSceneProgress("hero");
  const isPastHero = heroProgress >= 0.9;
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Hide during fast cinematic scrolls, show otherwise
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    // Force hide if we are in the middle of a heavy transition (like hero progress around 0.5 to 0.8)
    if (heroProgress > 0.1 && heroProgress < 0.9) {
      setHidden(true);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 w-full transition-all duration-1000",
        isPastHero ? "bg-black/40 backdrop-blur-md border-b border-white/5 h-[90px] flex items-center" : "bg-transparent h-[120px] flex items-center"
      )}
    >
      <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between px-8 md:px-16 lg:px-24">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full transition-transform duration-700 hover:scale-150"></div>
          </div>
          <span className="font-heading text-xl tracking-[0.2em] font-bold text-cine-primary mix-blend-difference">CINEVERSE</span>
        </div>

        <nav className="hidden md:flex gap-10 text-[11px] font-semibold tracking-[0.25em] uppercase text-white/60">
          {["Experience", "Technology", "Explore", "Archive"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <div className="w-px h-6 bg-white/10"></div>
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/40">EST. 2024</span>
        </div>

        {/* Mobile Menu Trigger */}
        <button className="md:hidden flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/20">
          <span className="h-px w-4 bg-cine-primary" />
          <span className="h-px w-4 bg-cine-primary" />
        </button>
      </div>
    </motion.header>
  );
};
