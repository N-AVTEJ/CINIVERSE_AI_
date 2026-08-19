export interface PreferenceFragmentData {
  id: string;
  label: string;
  type: 'genre' | 'mood' | 'director' | 'attribute';
  initialPosition: [number, number, number];
  color: string;
}

export const preferenceFragmentsData: PreferenceFragmentData[] = [
  { id: 'p1', label: 'Sci-Fi', type: 'genre', initialPosition: [-10, 5, -20], color: '#00d2ff' },
  { id: 'p2', label: 'Mind-bending', type: 'mood', initialPosition: [12, 8, -15], color: '#ff0055' },
  { id: 'p3', label: 'Christopher Nolan', type: 'director', initialPosition: [-8, -4, -25], color: '#d4af37' },
  { id: 'p4', label: 'Epic Soundtrack', type: 'attribute', initialPosition: [15, -6, -18], color: '#00ff88' },
  { id: 'p5', label: 'Dark', type: 'mood', initialPosition: [0, 12, -30], color: '#7a00ff' },
  { id: 'p6', label: 'Emotional', type: 'attribute', initialPosition: [-15, 2, -15], color: '#ff4d94' },
];
