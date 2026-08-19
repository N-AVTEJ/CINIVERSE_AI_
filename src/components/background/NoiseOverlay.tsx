export const NoiseOverlay = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-30 mix-blend-overlay"
      style={{ backgroundImage: "var(--noise)" }}
    />
  );
};
