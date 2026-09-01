import { useMemo } from 'react';
import { useMemoryHistory } from './useMemoryHistory';
import { analyzeTasteProfile } from '../lib/tasteAnalysis';

export const useTasteProfile = () => {
  const { memories } = useMemoryHistory();

  const tasteProfile = useMemo(() => {
    return analyzeTasteProfile(memories);
  }, [memories]);

  return tasteProfile;
};
