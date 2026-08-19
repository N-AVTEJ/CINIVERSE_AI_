import { useEffect, useState } from "react";
import { scrollDirector } from "../lib/scrollDirector";

export const useSceneProgress = (sceneId: string) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleProgress = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      setProgress(customEvent.detail);
    };

    window.addEventListener(`scene-progress-${sceneId}`, handleProgress);
    setProgress(scrollDirector.getSceneProgress(sceneId));

    return () => {
      window.removeEventListener(`scene-progress-${sceneId}`, handleProgress);
    };
  }, [sceneId]);

  return progress;
};
