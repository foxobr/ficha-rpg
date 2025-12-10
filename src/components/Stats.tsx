import { Character } from '../types/character';
import { OrnamentalCard } from './OrnamentalCard';
import { Activity, Shield, Footprints, Wind } from 'lucide-react';

interface StatsProps {
  character: Character;
  onChange: (updates: Partial<Character>) => void;
}

export function Stats({ character, onChange }: StatsProps) {
  const pv = 10 + character.vigor;
  const movement = 6 + character.agility;
  const dodge = 10 + character.agility;

  const StatBox = ({ icon, label, value, formula, editable = false, onChange: onChangeValue }: {
    icon: React.ReactNode;
    label: string;
    value: number;
    formula: string;
    editable?: boolean;
    onChange?: (value: number) => void;
  }) => (
    <div className="relative bg-gradient-to-br from-black/80 to-[#1a1a1a]/60 border-2 border-[#D4A574] p-4 group hover:border-[#00FF41] transition-all">
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#ff6b35]" />
      <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#ff6b35]" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#ff6b35]" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#ff6b35]" />
      
      <div className="flex items-center gap-2 mb-2">
        <div className="text-[#D4A574]">{icon}</div>
        <div className="text-[#D4A574] text-sm uppercase tracking-wider">{label}</div>
      </div>
      
      {editable ? (
        <input
          type="number"
          className="w-full p-2 bg-black/60 border-2 border-[#ff6b35] text-[#ff6b35] text-center text-3xl focus:outline-none focus:border-[#00FF41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all"
          value={value}
          min="0"
          max="10"
          onChange={(e) => onChangeValue?.(parseInt(e.target.value) || 0)}
        />
      ) : (
        <div 
          className="text-4xl text-[#ff6b35] text-center py-2 relative"
          style={{ textShadow: '0 0 15px rgba(255, 107, 53, 0.6)' }}
        >
          {value}
          {/* Animated glow effect */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="text-4xl text-[#00FF41] animate-pulse">
              {value}
            </div>
          </div>
        </div>
      )}
      
      <div className="text-[#888] text-xs text-center mt-2 tracking-wide">{formula}</div>
      
      {/* Hover glow */}
      <div className="absolute inset-0 bg-[#00FF41]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );

  return (
    <OrnamentalCard title="Estatísticas Gerais" icon={<Activity size={20} />} className="animate-[fadeIn_0.8s_ease-out]">
      <div className="grid grid-cols-2 gap-4">
        <StatBox
          icon={<Activity size={18} />}
          label="Pontos de Vida (PV)"
          value={pv}
          formula="10 + Vigor"
        />
        <StatBox
          icon={<Shield size={18} />}
          label="Armadura (VA)"
          value={character.va}
          formula="Conforme equipamento"
          editable
          onChange={(value) => onChange({ va: value })}
        />
        <StatBox
          icon={<Footprints size={18} />}
          label="Deslocamento (m/turno)"
          value={movement}
          formula="6 + (Agi × 1)"
        />
        <StatBox
          icon={<Wind size={18} />}
          label="Esquiva"
          value={dodge}
          formula="10 + Agilidade"
        />
      </div>
    </OrnamentalCard>
  );
}