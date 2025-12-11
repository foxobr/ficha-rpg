import { Character, CONDITIONS } from '../types/character';
import { OrnamentalCard } from './OrnamentalCard';
import { AlertTriangle, X } from 'lucide-react';

interface ConditionsProps {
  character: Character;
  onChange: (updates: Partial<Character>) => void;
  onAddLog: (action: string) => void;
}

export function Conditions({ character, onChange, onAddLog }: ConditionsProps) {
  const addCondition = (condition: string) => {
    if (!character.activeConditions.includes(condition)) {
      onChange({ activeConditions: [...character.activeConditions, condition] });
      onAddLog(`+ Condição aplicada: ${condition}`);
    }
  };

  const removeCondition = (condition: string) => {
    onChange({ activeConditions: character.activeConditions.filter(c => c !== condition) });
    onAddLog(`- Condição removida: ${condition}`);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : '255,107,53';
  };

  return (
    <OrnamentalCard title="Condições Ativas" icon={<AlertTriangle />} variant="danger" className="col-span-2 animate-[fadeIn_1.4s_ease-out]">
      {/* Active Conditions Display */}
      <div className="mb-6 min-h-[80px]">
        {character.activeConditions.length === 0 ? (
          <div className="text-center py-6 text-[#888] italic border-2 border-dashed border-[#D4A574]/30 bg-black/40">
            Nenhuma condição ativa
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
            {character.activeConditions.map((condition) => {
              const data = CONDITIONS[condition] || { icon: '⚠️', color: '#ff6b35' };
              return (
                <div
                  key={condition}
                  className="relative group"
                >
                  {/* Ornamental frame for active condition */}
                  <div 
                    className="relative p-3 border-2 backdrop-blur-sm transition-all hover:scale-105"
                    style={{
                      borderColor: data.color,
                      background: `linear-gradient(135deg, rgba(${hexToRgb(data.color)}, 0.2) 0%, rgba(${hexToRgb(data.color)}, 0.05) 100%)`,
                      boxShadow: `0 0 10px rgba(${hexToRgb(data.color)}, 0.3)`
                    }}
                  >
                    {/* Inner decorative border */}
                    <div 
                      className="absolute inset-[4px] border pointer-events-none" 
                      style={{ borderColor: `rgba(${hexToRgb(data.color)}, 0.3)` }}
                    />
                    
                    <div className="flex items-center justify-between gap-2 relative z-10">
                      <span className="text-[#D4A574] uppercase tracking-wide text-sm flex items-center gap-2">
                        <span>{data.icon}</span>
                        <span>{condition}</span>
                      </span>
                      <button
                        onClick={() => removeCondition(condition)}
                        className="w-6 h-6 flex items-center justify-center rounded-full border-2 text-white hover:scale-110 transition-transform"
                        style={{ 
                          background: data.color,
                          borderColor: data.color
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#D4A574]/30" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-black px-4 text-[#D4A574] text-sm uppercase tracking-wider">
            Aplicar Condição
          </span>
        </div>
      </div>

      {/* Available Conditions */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
        {Object.entries(CONDITIONS).map(([name, data]) => (
          <button
            key={name}
            onClick={() => addCondition(name)}
            className="relative px-3 py-3 border-2 border-[#D4A574] bg-gradient-to-br from-black/80 to-[#1a1a1a]/80 text-[#D4A574] uppercase tracking-wide text-sm transition-all hover:border-[#ff6b35] hover:text-[#ff6b35] hover:shadow-[0_0_15px_rgba(212,165,116,0.4)] active:translate-y-0.5 overflow-hidden group"
          >
            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4A574]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-[#00FF41]/40" />
            <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-[#00FF41]/40" />
            
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>{data.icon}</span>
              <span>{name}</span>
            </span>
          </button>
        ))}
      </div>
    </OrnamentalCard>
  );
}