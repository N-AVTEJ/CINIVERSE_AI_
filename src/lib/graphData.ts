export interface GraphNode {
  id: string;
  title: string;
  poster: string;
  genre: string;
  director: string;
  year: number;
  rating: number;
  position: [number, number, number];
  connections: string[];
}

export const generateGraphData = (): GraphNode[] => {
  const nodes: GraphNode[] = [];
  const genres = ["Sci-Fi", "Drama", "Thriller", "Action", "Mystery"];
  const directors = ["Nolan", "Villeneuve", "Fincher", "Scott", "Spielberg"];
  const titles = ["Nebula", "The Silent Echo", "Neon Dreams", "Abyss", "Quantum", "The Last Horizon", "Echoes of Time", "Mirage", "Solaris", "Vortex"];
  
  const totalNodes = 100;
  
  for (let i = 0; i < totalNodes; i++) {
    const phi = Math.acos(-1 + (2 * i) / totalNodes);
    const theta = Math.sqrt(totalNodes * Math.PI) * phi;
    
    // Golden spiral distribution on a sphere
    const radius = 15 + Math.random() * 5;
    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);
    
    const titleIdx = i % titles.length;
    const genreIdx = i % genres.length;
    const directorIdx = i % directors.length;
    
    nodes.push({
      id: `node-${i}`,
      title: `${titles[titleIdx]} ${i > titles.length ? i : ''}`.trim(),
      poster: `https://picsum.photos/id/${100 + i}/400/600`,
      genre: genres[genreIdx],
      director: directors[directorIdx],
      year: 2010 + (i % 15),
      rating: +(7.0 + (i % 25) * 0.1).toFixed(1),
      position: [x, y, z],
      connections: [], // Will populate below
    });
  }

  // Create connections based on distance and shared properties
  nodes.forEach((node, i) => {
    nodes.forEach((otherNode, j) => {
      if (i === j) return;
      
      const dx = node.position[0] - otherNode.position[0];
      const dy = node.position[1] - otherNode.position[1];
      const dz = node.position[2] - otherNode.position[2];
      const distSq = dx*dx + dy*dy + dz*dz;
      
      // Connect if close, or if they share genre/director (with some probability)
      if (distSq < 100 && node.connections.length < 5) {
        node.connections.push(otherNode.id);
      } else if ((node.genre === otherNode.genre || node.director === otherNode.director) && Math.random() > 0.9 && node.connections.length < 8) {
        node.connections.push(otherNode.id);
      }
    });
  });

  return nodes;
};

export const graphNodes = generateGraphData();
