import { useMemo } from 'react';
import { useMemoryHistory } from './useMemoryHistory';
import { calculateTasteEvolution } from '../lib/tasteEvolution';

export const useTasteEvolution = () => {
  const { memories } = useMemoryHistory();

  const evolutionData = useMemo(() => {
    return calculateTasteEvolution(memories);
  }, [memories]);

  return evolutionData;
};
