export const Letterbox = () => {
  return (
    <div className="fixed inset-0 z-40 pointer-events-none flex flex-col justify-between">
      <div className="letterbox-top w-full h-[12vh] bg-black origin-top scale-y-0"></div>
      <div className="letterbox-bottom w-full h-[12vh] bg-black origin-bottom scale-y-0"></div>
    </div>
  );
};
