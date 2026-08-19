import { useEffect, useState } from "react";
import { cinematicEngine } from "../lib/cinematicEngine";
import gsap from "gsap";

export const useScrollVelocity = () => {
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    const updateVelocity = () => {
      setVelocity(cinematicEngine.getVelocity());
    };
    
    gsap.ticker.add(updateVelocity);
    
    return () => {
      gsap.ticker.remove(updateVelocity);
    };
  }, []);

  return velocity;
};
