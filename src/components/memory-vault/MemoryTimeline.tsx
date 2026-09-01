import { Html } from '@react-three/drei';
import { VAULT_LAYERS } from '../../lib/memoryModel';

export const MemoryTimeline = () => {
  return (
    <group>
      {VAULT_LAYERS.map((layer) => (
        <group key={`layer-${layer.level}`} position={[-14, 4, layer.zDepth]}>
          <Html position={[0, 0, 0]} distanceFactor={22} zIndexRange={[50, 0]}>
            <div className="p-3 rounded-xl bg-slate-950/70 backdrop-blur-md border border-sky-500/20 text-left pointer-events-none max-w-xs">
              <span className="font-mono text-[9px] text-sky-400 uppercase tracking-widest block">
                Vault Layer 0{layer.level}
              </span>
              <h5 className="font-heading text-xs font-semibold text-white tracking-wide mt-0.5 uppercase">
                {layer.title}
              </h5>
              <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                {layer.description}
              </p>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
};
