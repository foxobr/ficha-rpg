import { Character } from '../types/character';
import { OrnamentalCard } from './OrnamentalCard';
import { ScrollText, Trash2 } from 'lucide-react';

interface CombatLogProps {
  character: Character;
  onChange: (updates: Partial<Character>) => void;
}

export function CombatLog({ character, onChange }: CombatLogProps) {
  const clearLog = () => {
    if (confirm('Limpar o histórico de combate?')) {
      onChange({ combatLog: [] });
    }
  };

  return (
    <OrnamentalCard title="Histórico de Combate" icon={<ScrollText />} className="col-span-2 animate-[fadeIn_1.6s_ease-out]">
      {/* Ornamental log container */}
      <div className="relative mb-4">
        {/* Decorative frame */}
        <div className="absolute -inset-2 border-2 border-[#D4A574]/20 pointer-events-none">
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#ff6b35]" />
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#ff6b35]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#ff6b35]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#ff6b35]" />
        </div>

        <div className="bg-black/80 border-2 border-[#D4A574] p-4 max-h-[300px] overflow-y-auto backdrop-blur-sm relative scrollbar-thin scrollbar-track-black/50 scrollbar-thumb-[#D4A574]/50">
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#ff6b35]/5 to-transparent pointer-events-none" />
          
          {character.combatLog.length === 0 ? (
            <div className="text-center py-8 text-[#888] italic relative">
              <div className="text-4xl mb-2 opacity-20">📜</div>
              <div>Nenhuma ação registrada</div>
            </div>
          ) : (
            <div className="space-y-2 relative">
              {[...character.combatLog].reverse().map((entry, index) => (
                <div
                  key={index}
                  className="group relative"
                >
                  {/* Entry decoration */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#ff6b35] to-[#D4A574]" />
                  
                  <div className="pl-4 pr-2 py-2 bg-gradient-to-r from-[#ff6b35]/10 to-transparent border-l-2 border-[#ff6b35] hover:bg-[#ff6b35]/20 transition-all">
                    {/* Timestamp */}
                    <div className="flex items-start gap-2">
                      <span className="text-[#D4A574] text-xs uppercase tracking-wider opacity-60 shrink-0">
                        [{entry.timestamp}]
                      </span>
                      <span className="text-[#ffb366] text-sm flex-1">
                        {entry.action}
                      </span>
                    </div>
                    
                    {/* Decorative line */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-px bg-gradient-to-l from-[#D4A574]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Clear button with ornamental style */}
      <button
        onClick={clearLog}
        className="relative w-full px-6 py-3 bg-gradient-to-r from-[#8B0000]/80 to-[#8B0000]/60 text-white uppercase tracking-wider border-2 border-[#ff6b35] transition-all hover:shadow-[0_0_20px_rgba(139,0,0,0.5)] active:translate-y-0.5 overflow-hidden group"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        
        {/* Button content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          <Trash2 size={18} />
          <span>Limpar Histórico</span>
        </span>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#ff6b35] opacity-50" />
        <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#ff6b35] opacity-50" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#ff6b35] opacity-50" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#ff6b35] opacity-50" />
      </button>
    </OrnamentalCard>
  );
}