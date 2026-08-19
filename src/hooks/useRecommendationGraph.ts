import { create } from "zustand";
import { GraphNode, graphNodes } from "../lib/graphData";

interface RecommendationState {
  activeNode: GraphNode | null;
  recommendedNodes: GraphNode[];
  isThinking: boolean;
  triggerRecommendation: (nodeId: string) => void;
  reset: () => void;
}

export const useRecommendationGraph = create<RecommendationState>((set, get) => ({
  activeNode: null,
  recommendedNodes: [],
  isThinking: false,
  
  triggerRecommendation: (nodeId: string) => {
    const node = graphNodes.find(n => n.id === nodeId);
    if (!node) return;
    
    set({ activeNode: node, isThinking: true, recommendedNodes: [] });
    
    // Simulate AI thinking and propagating connections
    setTimeout(() => {
      const recommendations = graphNodes
        .filter(n => node.connections.includes(n.id))
        .slice(0, 4); // Pick top 4 connected
        
      set({ recommendedNodes: recommendations, isThinking: false });
    }, 2500); // 2.5s thinking time
  },
  
  reset: () => set({ activeNode: null, recommendedNodes: [], isThinking: false })
}));
