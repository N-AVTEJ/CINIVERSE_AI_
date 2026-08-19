import { useShallow } from 'zustand/react/shallow';
import { useRecommendationGraph } from "../../hooks/useRecommendationGraph";

export const SimilarityPanel = () => {
  const { activeNode, isThinking } = useRecommendationGraph(
    useShallow(s => ({ activeNode: s.activeNode, isThinking: s.isThinking }))
  );

  if (!activeNode) return <div className="w-80" />; // Spacer

  return (
    <div className="w-80 md:w-96 glass-panel rounded-2xl p-6 md:p-8 backdrop-blur-2xl border border-white/5 bg-black/40 text-left transition-all duration-1000 opacity-100">
      <h4 className="text-cine-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-6">Input Analysis</h4>
      
      <div className="flex gap-4 mb-6">
        <div className="w-16 h-24 shrink-0 rounded overflow-hidden">
          <img src={activeNode.poster} alt={activeNode.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="font-heading text-xl md:text-2xl text-white font-bold leading-tight uppercase mb-1">{activeNode.title}</h2>
          <p className="text-white/50 text-xs tracking-widest uppercase">{activeNode.director}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-white/30 text-[9px] uppercase tracking-widest mb-1">Detected Genres</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 text-[9px] uppercase tracking-widest border border-white/10 rounded-full text-white/70">
              {activeNode.genre}
            </span>
          </div>
        </div>
        
        <div>
          <p className="text-white/30 text-[9px] uppercase tracking-widest mb-1">Network Activity</p>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-cine-gold transition-all duration-[2.5s] ease-out ${isThinking ? 'w-full' : 'w-0'}`}
            />
          </div>
          <p className="text-cine-gold/70 text-[9px] uppercase tracking-widest mt-2 text-right">
            {isThinking ? "Computing connections..." : "Ready"}
          </p>
        </div>
      </div>
    </div>
  );
};
