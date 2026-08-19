export const getLightingColors = (preset: string) => {
  switch (preset) {
    case 'monochrome': return { main: '#ffffff', ambient: '#222222', fog: '#050505' };
    case 'golden': return { main: '#ffaa00', ambient: '#332200', fog: '#1a1000' };
    case 'desert': return { main: '#ff7700', ambient: '#331100', fog: '#1a0a00' };
    case 'watercolor': return { main: '#aaddff', ambient: '#224433', fog: '#051111' };
    case 'noir': return { main: '#ffffff', ambient: '#000000', fog: '#000000' };
    case 'neon-grit': return { main: '#ff0033', ambient: '#110022', fog: '#0a0011' };
    case 'retro-pop': return { main: '#ffcc00', ambient: '#441111', fog: '#110505' };
    case 'clinical': return { main: '#eeeeff', ambient: '#333344', fog: '#0a0a0f' };
    case 'pastel': return { main: '#ffbbcc', ambient: '#443344', fog: '#110a11' };
    case 'contrast-rain': return { main: '#55aaff', ambient: '#001122', fog: '#00050a' };
    case 'blue-steel': return { main: '#0055ff', ambient: '#001133', fog: '#000511' };
    case 'shafts-of-light': return { main: '#aabbcc', ambient: '#112222', fog: '#050a0a' };
    default: return { main: '#ffffff', ambient: '#111111', fog: '#050505' };
  }
};
