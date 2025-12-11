import { Character } from '../types/character';
import { OrnamentalCard } from './OrnamentalCard';
import { User } from 'lucide-react';

interface BasicInfoProps {
  character: Character;
  onChange: (updates: Partial<Character>) => void;
}

export function BasicInfo({ character, onChange }: BasicInfoProps) {
  return (
    <OrnamentalCard title="Informações Básicas" icon={<User size={20} />} className="animate-[fadeIn_0.6s_ease-out]">
      <div className="space-y-5">
        <div className="relative">
          <label className="block mb-2 text-[#D4A574] uppercase tracking-wider text-sm">
            Nome do Personagem:
          </label>
          <div className="relative">
            <input
              type="text"
              className="w-full p-3 bg-black/60 border-2 border-[#D4A574] text-[#e0e0e0] transition-all focus:outline-none focus:border-[#00FF41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] placeholder:text-[#666]"
              placeholder="Digite o nome do seu personagem"
              value={character.characterName}
              onChange={(e) => onChange({ characterName: e.target.value })}
            />
            <div className="absolute top-0 right-0 w-2 h-2 bg-[#00FF41] animate-pulse" />
          </div>
        </div>

        <div className="relative">
          <label className="block mb-2 text-[#D4A574] uppercase tracking-wider text-sm">
            Nome do Jogador:
          </label>
          <div className="relative">
            <input
              type="text"
              className="w-full p-3 bg-black/60 border-2 border-[#D4A574] text-[#e0e0e0] transition-all focus:outline-none focus:border-[#00FF41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] placeholder:text-[#666]"
              placeholder="Seu nome"
              value={character.playerName}
              onChange={(e) => onChange({ playerName: e.target.value })}
            />
            <div className="absolute top-0 right-0 w-2 h-2 bg-[#00FF41] animate-pulse" />
          </div>
        </div>

        <div className="relative">
          <label className="block mb-2 text-[#D4A574] uppercase tracking-wider text-sm">
            Nível:
          </label>
          <div className="relative">
            <input
              type="number"
              className="w-full p-3 bg-black/60 border-2 border-[#D4A574] text-[#e0e0e0] transition-all focus:outline-none focus:border-[#00FF41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)]"
              value={character.level}
              min="0"
              max="20"
              onChange={(e) => onChange({ level: parseInt(e.target.value) || 0 })}
            />
            <div className="absolute top-1/2 right-3 -translate-y-1/2 text-[#ff6b35] text-xl">
              ◆
            </div>
          </div>
        </div>

        <div className="relative">
          <label className="block mb-2 text-[#D4A574] uppercase tracking-wider text-sm">
            Background/Histórico:
          </label>
          <div className="relative">
            <textarea
              className="w-full p-3 bg-black/60 border-2 border-[#D4A574] text-[#e0e0e0] min-h-[100px] resize-y transition-all focus:outline-none focus:border-[#00FF41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] placeholder:text-[#666]"
              placeholder="Descreva a história de vida do seu personagem..."
              value={character.background}
              onChange={(e) => onChange({ background: e.target.value })}
            />
            <div className="absolute top-2 right-2 w-2 h-2 bg-[#00FF41] animate-pulse" />
          </div>
        </div>
      </div>
    </OrnamentalCard>
  );
}