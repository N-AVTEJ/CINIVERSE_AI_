import { ReactNode } from "react";

interface DepthLayerProps {
  depth: number;
  children: ReactNode;
  className?: string;
}

export const DepthLayer = ({ depth, children, className = "" }: DepthLayerProps) => {
  const translateZ = -depth * 100;
  const scale = 1 + (depth * 0.1);

  return (
    <div 
      className={`depth-layer absolute inset-0 ${className}`}
      style={{
        transform: `translateZ(${translateZ}px) scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      {children}
    </div>
  );
};
