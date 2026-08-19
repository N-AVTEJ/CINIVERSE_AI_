import { useShallow } from 'zustand/react/shallow';
import { useRecommendationGraph } from "../../hooks/useRecommendationGraph";

export const RecommendationPanel = () => {
  const { recommendedNodes, isThinking } = useRecommendationGraph(
    useShallow(s => ({ recommendedNodes: s.recommendedNodes, isThinking: s.isThinking }))
  );

  if (isThinking || recommendedNodes.length === 0) return <div className="w-80 md:w-96" />; // Spacer

  return (
    <div className="w-80 md:w-96 flex flex-col gap-4 text-right">
      <h4 className="text-cine-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-2">Neural Matches</h4>
      
      {recommendedNodes.map((node, i) => (
        <div 
          key={node.id}
          className="glass-panel rounded-xl p-4 backdrop-blur-2xl border border-white/5 bg-black/40 flex gap-4 items-center animate-fade-in-up"
          style={{ animationDelay: `${i * 150}ms`, animationFillMode: "backwards" }}
        >
          <div className="flex-1 text-right">
            <h3 className="font-heading text-sm text-white font-bold uppercase tracking-wider mb-1">{node.title}</h3>
            <div className="flex items-center justify-end gap-3 text-[9px] uppercase tracking-widest text-white/50">
              <span>{node.genre}</span>
              <span className="text-cine-gold">{node.rating}</span>
            </div>
          </div>
          <div className="w-12 h-16 shrink-0 rounded overflow-hidden">
            <img src={node.poster} alt={node.title} className="w-full h-full object-cover" />
          </div>
        </div>
      ))}
    </div>
  );
};
