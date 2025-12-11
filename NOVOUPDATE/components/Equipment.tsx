import { Character } from '../types/character';
import { OrnamentalCard } from './OrnamentalCard';
import { Sword, Shield, Package } from 'lucide-react';

interface EquipmentProps {
  character: Character;
  onChange: (updates: Partial<Character>) => void;
}

export function Equipment({ character, onChange }: EquipmentProps) {
  return (
    <OrnamentalCard title="Equipamentos e Recursos" icon={<Package size={20} />} className="animate-[fadeIn_0.9s_ease-out]">
      <div className="space-y-5">
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Sword size={18} className="text-[#D4A574]" />
            <label className="text-[#D4A574] uppercase tracking-wider text-sm">
              Armas:
            </label>
          </div>
          <div className="relative">
            <textarea
              className="w-full p-3 bg-black/60 border-2 border-[#D4A574] text-[#e0e0e0] min-h-[100px] resize-y transition-all focus:outline-none focus:border-[#00FF41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] placeholder:text-[#666]"
              placeholder="Ex: Faca (d4), Pistola (d6)..."
              value={character.weapons}
              onChange={(e) => onChange({ weapons: e.target.value })}
            />
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-[#ff6b35]" />
            <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-[#ff6b35]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-[#ff6b35]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-[#ff6b35]" />
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={18} className="text-[#D4A574]" />
            <label className="text-[#D4A574] uppercase tracking-wider text-sm">
              Armadura:
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              className="w-full p-3 bg-black/60 border-2 border-[#D4A574] text-[#e0e0e0] transition-all focus:outline-none focus:border-[#00FF41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] placeholder:text-[#666]"
              placeholder="Ex: Jaqueta de Couro (VA +1)"
              value={character.armor}
              onChange={(e) => onChange({ armor: e.target.value })}
            />
            <div className="absolute top-1/2 right-3 -translate-y-1/2 text-[#ff6b35] opacity-50">
              ◆
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Package size={18} className="text-[#D4A574]" />
            <label className="text-[#D4A574] uppercase tracking-wider text-sm">
              Itens e Suprimentos:
            </label>
          </div>
          <div className="relative">
            <textarea
              className="w-full p-3 bg-black/60 border-2 border-[#D4A574] text-[#e0e0e0] min-h-[100px] resize-y transition-all focus:outline-none focus:border-[#00FF41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] placeholder:text-[#666]"
              placeholder="Agua, Comida, Sucata, etc..."
              value={character.items}
              onChange={(e) => onChange({ items: e.target.value })}
            />
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-[#ff6b35]" />
            <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-[#ff6b35]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-[#ff6b35]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-[#ff6b35]" />
          </div>
        </div>
      </div>
    </OrnamentalCard>
  );
}