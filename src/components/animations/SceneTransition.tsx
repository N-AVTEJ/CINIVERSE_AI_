import { ReactNode } from "react";

interface SceneTransitionProps {
  type?: "lightSweep" | "depthDissolve" | "lensFocus" | "fogTransition" | "parallaxCrossover";
  children: ReactNode;
}

export const SceneTransition = ({ type = "depthDissolve", children }: SceneTransitionProps) => {
  return (
    <div className={`scene-transition transition-${type} relative w-full h-full`}>
      {children}
      <div className="transition-overlay absolute inset-0 pointer-events-none z-50 mix-blend-screen opacity-0" />
    </div>
  );
};
