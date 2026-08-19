import { ReactNode } from "react";

interface ParallaxGroupProps {
  children: ReactNode;
  className?: string;
}

export const ParallaxGroup = ({ children, className = "" }: ParallaxGroupProps) => {
  return (
    <div className={`parallax-group relative w-full h-full ${className}`} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
};
