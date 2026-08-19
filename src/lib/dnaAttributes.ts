export type DNAAnimationType = 'golden-light' | 'color-gradient' | 'circular-orbit' | 'wave' | 'constellation' | 'glass-shards' | 'portraits' | 'pulse' | 'ripple' | 'expanding-halo';

export interface DNAAttribute {
  id: string;
  name: string;
  value: string;
  importance: number;
  confidence: number;
  colorTheme: string;
  animationType: DNAAnimationType;
  description: string;
  positionY: number; // Position along the DNA helix (Z or Y axis depending on orientation)
}

export const dnaAttributesData: DNAAttribute[] = [
  {
    id: 'dna1',
    name: 'Genre Alignment',
    value: 'Science Fiction',
    importance: 95,
    confidence: 99,
    colorTheme: '#d4af37',
    animationType: 'golden-light',
    description: 'Matches your historical preference for high-concept sci-fi.',
    positionY: 0
  },
  {
    id: 'dna2',
    name: 'Atmospheric Mood',
    value: 'Mind-bending',
    importance: 90,
    confidence: 94,
    colorTheme: '#ff0055',
    animationType: 'color-gradient',
    description: 'Aligns perfectly with your recent watch history of cerebral thrillers.',
    positionY: -15
  },
  {
    id: 'dna3',
    name: 'Director Signature',
    value: 'Christopher Nolan',
    importance: 88,
    confidence: 92,
    colorTheme: '#00d2ff',
    animationType: 'circular-orbit',
    description: 'You have rated 4 films by this director above 9/10.',
    positionY: -30
  },
  {
    id: 'dna4',
    name: 'Audio Profile',
    value: 'Epic Soundtrack',
    importance: 82,
    confidence: 89,
    colorTheme: '#00ff88',
    animationType: 'wave',
    description: 'Hans Zimmer score matches your acoustic intensity preferences.',
    positionY: -45
  },
  {
    id: 'dna5',
    name: 'Narrative Structure',
    value: 'Non-linear',
    importance: 85,
    confidence: 85,
    colorTheme: '#7a00ff',
    animationType: 'constellation',
    description: 'Complex timeline mechanics match your engagement patterns.',
    positionY: -60
  },
  {
    id: 'dna6',
    name: 'Pacing',
    value: 'Slow Build',
    importance: 75,
    confidence: 80,
    colorTheme: '#ff4d94',
    animationType: 'pulse',
    description: 'Patient storytelling matches your typical evening viewing habits.',
    positionY: -75
  },
  {
    id: 'dna7',
    name: 'Overall Confidence',
    value: '98%',
    importance: 100,
    confidence: 98,
    colorTheme: '#ffffff',
    animationType: 'expanding-halo',
    description: 'Highest match probability in our entire cinematic database.',
    positionY: -90
  }
];
