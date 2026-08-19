export const DepthFog = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
      {/* Deep Fog */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0)_0%,rgba(5,5,5,0.9)_80%)]"
        style={{ transform: "translateZ(500px)" }} 
      />
      
      {/* Mid Fog */}
      <div 
        className="absolute top-1/4 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-transparent"
        style={{ transform: "translateZ(-1000px)" }} 
      />
      
      {/* Far Fog */}
      <div 
        className="absolute inset-0 bg-[#020202]"
        style={{ transform: "translateZ(-4000px)" }} 
      />
    </div>
  );
};
