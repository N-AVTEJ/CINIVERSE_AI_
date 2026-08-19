import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cinemaEras } from "../../lib/cinemaHistory";
import { useTimelineProgress } from "../../hooks/useTimelineProgress";
import { useEraTransition } from "../../hooks/useEraTransition";
import { EraScene } from "./EraScene";
import { TimelineRibbon } from "./TimelineRibbon";
import { TimeParticles } from "./TimeParticles";
import { EraTransition } from "./EraTransition";
import { calculateCameraPosition, getActiveEra } from "../../lib/timelineAnimation";

export const TimelineScene = () => {
  const { camera } = useThree();
  const progress = useTimelineProgress(s => s.progress);
  const setActiveEraId = useTimelineProgress(s => s.setActiveEraId);
  const triggerTransition = useEraTransition(s => s.triggerTransition);
  
  const prevEraId = useRef(cinemaEras[0].id);
  const maxZ = cinemaEras[cinemaEras.length - 1].position[2] - 50;
  
  useFrame((_, delta) => {
    // Camera movement
    const targetPos = calculateCameraPosition(progress, maxZ);
    
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetPos.z, delta * 3);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetPos.x, delta * 2);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetPos.y, delta * 2);
    
    camera.lookAt(camera.position.x * 0.5, camera.position.y * 0.5, camera.position.z - 40);

    // Era detection
    const currentEra = getActiveEra(camera.position.z, cinemaEras);
    
    if (currentEra.id !== prevEraId.current) {
      triggerTransition(currentEra.transitionStyle);
      prevEraId.current = currentEra.id;
      setActiveEraId(currentEra.id);
    }
  });

  return (
    <>
      <color attach="background" args={["#020202"]} />
      <fog attach="fog" args={["#020202", 10, 80]} />
      
      <ambientLight intensity={0.2} color="#ffffff" />
      
      {/* The continuous golden ribbon */}
      <TimelineRibbon />
      
      {/* Floating particles through time */}
      <TimeParticles />
      
      {/* Screen-space transition effect */}
      <EraTransition />

      {/* Render each era as a distinct scene module */}
      {cinemaEras.map((era) => (
        <EraScene key={era.id} era={era} />
      ))}
    </>
  );
};
