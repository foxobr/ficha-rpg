import { Character } from '../types/character';
import { OrnamentalCard } from './OrnamentalCard';
import { Coins, Zap, Beef, Droplets } from 'lucide-react';

interface ResourcesProps {
  character: Character;
  onChange: (updates: Partial<Character>) => void;
}

export function Resources({ character, onChange }: ResourcesProps) {
  const updateResource = (resource: keyof Character['resources'], amount: number) => {
    const newValue = Math.max(0, character.resources[resource] + amount);
    onChange({
      resources: {
        ...character.resources,
        [resource]: newValue
      }
    });
  };

  const ResourceItem = ({ 
    icon, 
    label, 
    current, 
    max, 
    resource, 
    increment, 
    decrement 
  }: { 
    icon: React.ReactNode;
    label: string;
    current: number;
    max?: number;
    resource: keyof Character['resources'];
    increment: number;
    decrement: number;
  }) => (
    <div className="relative bg-black/60 border-2 border-[#D4A574] p-4 backdrop-blur-sm group hover:border-[#ff6b35] transition-all">
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#00FF41]/40" />
      <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#00FF41]/40" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#00FF41]/40" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#00FF41]/40" />

      <div className="flex items-center gap-2 mb-2">
        <div className="text-[#D4A574]">{icon}</div>
        <div className="text-[#D4A574] text-sm uppercase tracking-wider">{label}</div>
      </div>

      <div className="flex justify-between items-center mb-3">
        <div className="text-4xl text-[#ff6b35]" style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}>
          {current}
        </div>
        {max !== undefined && (
          <span className="text-[#888]">/{max}</span>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => updateResource(resource, increment)}
          className="flex-1 px-3 py-2 bg-gradient-to-br from-[#00FF41]/80 to-[#00FF41]/60 text-black uppercase tracking-wide border border-[#00FF41] hover:shadow-[0_0_15px_rgba(0,255,65,0.6)] transition-all active:translate-y-0.5 relative overflow-hidden group"
        >
          <span className="relative z-10">+{increment === 1 ? '' : increment}</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
        </button>
        <button
          onClick={() => updateResource(resource, -Math.abs(decrement))}
          className="flex-1 px-3 py-2 bg-gradient-to-br from-[#8B0000]/80 to-[#8B0000]/60 text-white uppercase tracking-wide border border-[#ff6b35] hover:shadow-[0_0_15px_rgba(139,0,0,0.6)] transition-all active:translate-y-0.5 relative overflow-hidden group"
        >
          <span className="relative z-10">-{Math.abs(decrement) === 1 ? '' : Math.abs(decrement)}</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
        </button>
      </div>
    </div>
  );

  return (
    <OrnamentalCard title="Recursos" icon={<Coins />} className="animate-[fadeIn_1.3s_ease-out]">
      <div className="grid grid-cols-2 gap-4">
        <ResourceItem
          icon={<Zap size={20} />}
          label="Energia"
          current={character.resources.energy}
          max={character.resources.maxEnergy}
          resource="energy"
          increment={1}
          decrement={1}
        />
        
        <ResourceItem
          icon={<Coins size={20} />}
          label="Munição"
          current={character.resources.ammo}
          resource="ammo"
          increment={5}
          decrement={1}
        />
        
        <ResourceItem
          icon={<Beef size={20} />}
          label="Comida"
          current={character.resources.food}
          resource="food"
          increment={1}
          decrement={1}
        />
        
        <ResourceItem
          icon={<Droplets size={20} />}
          label="Água"
          current={character.resources.water}
          resource="water"
          increment={1}
          decrement={1}
        />
      </div>
    </OrnamentalCard>
  );
}