import { useShallow } from 'zustand/react/shallow';
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePredictionEngine } from "../../hooks/usePredictionEngine";

export const ScanningWave = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { phase, progress } = usePredictionEngine(
    useShallow(s => ({ phase: s.phase, progress: s.progress }))
  );
  
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        opacity: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float opacity;
        varying vec2 vUv;
        
        void main() {
          // Circular wave
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(vUv, center);
          
          float wave = sin((dist - time * 0.5) * 20.0);
          float waveIntensity = smoothstep(0.8, 1.0, wave) * smoothstep(0.5, 0.0, dist);
          
          vec3 color = vec3(0.0, 0.8, 1.0);
          gl_FragColor = vec4(color, waveIntensity * opacity);
        }
      `
    });
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    shaderMaterial.uniforms.time.value = state.clock.elapsedTime;
    
    let targetOpacity = 0;
    if (phase === 'scanning') {
      const scanProgress = Math.max(0, Math.min(1, (progress - 0.2) / 0.3));
      targetOpacity = Math.sin(scanProgress * Math.PI) * 0.8; // Peak at middle of scanning
    }
    
    shaderMaterial.uniforms.opacity.value = THREE.MathUtils.lerp(
      shaderMaterial.uniforms.opacity.value,
      targetOpacity,
      delta * 5
    );
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.9, 0]}>
      <planeGeometry args={[60, 60]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};
