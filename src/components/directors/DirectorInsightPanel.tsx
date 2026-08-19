import { motion } from "motion/react";
import { Director } from "../../lib/directorData";
import { Eye, Award, Film, PlayCircle, X } from "lucide-react";
import { useDirectorWorld } from "../../hooks/useDirectorWorld";
import { useShallow } from "zustand/react/shallow";

export const DirectorInsightPanel = ({ director }: { director: Director }) => {
  const leaveWorld = useDirectorWorld(s => s.leaveWorld);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      className="absolute top-1/2 left-16 -translate-y-1/2 w-full max-w-md pointer-events-auto"
    >
      <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_70%)]" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-cine-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-2 flex items-center gap-2">
                <PlayCircle className="w-3 h-3" />
                Director Profile
              </h4>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
                {director.name}
              </h2>
            </div>
            <button 
              onClick={leaveWorld}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-white/40 text-[9px] uppercase tracking-widest mb-3 flex items-center gap-2">
                <PlayCircle className="w-3 h-3 text-cine-gold" />
                AI Analysis & Influence
              </h4>
              <p className="text-cine-gold/90 text-sm leading-relaxed italic border-l-2 border-cine-gold/30 pl-3">
                Our model identifies their signature patterns—{director.signatureThemes[0].toLowerCase()} and {director.signatureThemes[1]?.toLowerCase()}—to shape your neural recommendations.
              </p>
            </div>

            <div>
              <h4 className="text-white/40 text-[9px] uppercase tracking-widest mb-3 flex items-center gap-2">
                <Film className="w-3 h-3" />
                Filmmaking Style
              </h4>
              <p className="text-white/90 text-sm leading-relaxed">
                {director.filmmakingStyle}
              </p>
            </div>

            <div>
              <h4 className="text-white/40 text-[9px] uppercase tracking-widest mb-3 flex items-center gap-2">
                <Eye className="w-3 h-3" />
                Visual Language
              </h4>
              <p className="text-white/90 text-sm leading-relaxed">
                {director.visualLanguage}
              </p>
            </div>

            <div>
              <h4 className="text-white/40 text-[9px] uppercase tracking-widest mb-3 flex items-center gap-2">
                <Award className="w-3 h-3" />
                Signature Themes
              </h4>
              <div className="flex flex-wrap gap-2">
                {director.signatureThemes.map((theme, idx) => (
                  <span key={idx} className="px-3 py-1 text-[10px] uppercase tracking-widest border border-white/10 rounded-full text-white/80 bg-white/5">
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white/40 text-[9px] uppercase tracking-widest mb-3 flex items-center gap-2">
                <Film className="w-3 h-3" />
                Notable Collaborators
              </h4>
              <p className="text-white/90 text-sm leading-relaxed">
                {director.collaborators.join(', ')}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-cine-muted text-xs italic">
                Audio Preset: {director.soundtrackMood}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
