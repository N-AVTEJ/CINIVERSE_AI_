export const VolumetricLight = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
      <div 
        className="absolute top-[-20%] left-[30%] w-[150vw] h-[150vh] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08)_0%,transparent_60%)] -rotate-12 blur-3xl opacity-50"
        style={{ transform: "translateZ(-2000px)" }} 
      />
      <div 
        className="absolute top-[20%] right-[-10%] w-[100vw] h-[100vh] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_50%)] blur-[100px] opacity-70"
        style={{ transform: "translateZ(-1000px)" }} 
      />
    </div>
  );
};
