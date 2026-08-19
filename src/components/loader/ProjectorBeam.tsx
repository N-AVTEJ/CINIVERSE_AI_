export const ProjectorBeam = () => {
  return (
    <>
      {/* The main beam that widens */}
      <div className="projector-beam absolute top-1/2 left-1/2 h-[40vh] w-[150vw] -translate-x-1/2 -translate-y-1/2 opacity-0 origin-center scale-x-[0.1] blur-3xl mix-blend-screen pointer-events-none z-10 flex items-center justify-center">
        <div className="w-full h-full bg-[conic-gradient(from_90deg_at_50%_50%,rgba(212,175,55,0)_0%,rgba(212,175,55,0.15)_25%,rgba(255,255,255,0.3)_50%,rgba(212,175,55,0.15)_75%,rgba(212,175,55,0)_100%)]"></div>
      </div>
      
      {/* The final wash transition */}
      <div className="loader-beam-wash absolute inset-0 bg-white opacity-0 mix-blend-screen z-50 pointer-events-none"></div>
    </>
  );
};
