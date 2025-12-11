import { useState } from 'react';
import { OrnamentalCard } from './OrnamentalCard';
import { Users, Sparkles } from 'lucide-react';

const NPC_TRAITS = ['Corajoso', 'Cauteloso', 'Ganancioso', 'Nobre', 'Traidor', 'Leal', 'Misterioso', 'Amigável', 'Agressivo'];
const NPC_ROLES = ['Mercador', 'Soldado', 'Médico', 'Criminoso', 'Cientista', 'Diplomata', 'Guia', 'Sabotador'];

export function NPCGenerator() {
  const [npcData, setNpcData] = useState<any>(null);

  const generateNPC = () => {
    const name = `NPC_${Math.random().toString(36).substring(7)}`;
    const role = NPC_ROLES[Math.floor(Math.random() * NPC_ROLES.length)];
    const trait1 = NPC_TRAITS[Math.floor(Math.random() * NPC_TRAITS.length)];
    const trait2 = NPC_TRAITS[Math.floor(Math.random() * NPC_TRAITS.length)];
    const level = Math.floor(Math.random() * 5) + 1;
    const health = 10 + (level * 2);
    const armor = Math.floor(Math.random() * 4);

    setNpcData({
      name,
      role,
      traits: [trait1, trait2],
      level,
      health,
      armor
    });
  };

  return (
    <OrnamentalCard title="Gerador de NPC" icon={<Users />} variant="accent" className="animate-[fadeIn_1.5s_ease-out]">
      <p className="text-[#888] text-sm mb-6 text-center italic border-l-2 border-[#00FF41]/30 pl-3">
        Gera NPCs aleatórios com características e atributos para o seu jogo.
      </p>

      <button
        onClick={generateNPC}
        className="relative w-full px-6 py-3 bg-gradient-to-r from-[#00FF41]/80 to-[#00FF41]/60 text-black uppercase tracking-wider border-2 border-[#00FF41] transition-all hover:shadow-[0_0_20px_rgba(0,255,65,0.6)] active:translate-y-0.5 overflow-hidden group mb-4"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        
        {/* Button content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          <Sparkles size={18} />
          <span>Gerar NPC Aleatório</span>
        </span>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#00FF41]" />
        <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#00FF41]" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#00FF41]" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#00FF41]" />
      </button>

      {npcData && (
        <div className="relative border-2 border-[#00FF41] bg-gradient-to-br from-[#00FF41]/10 to-black/80 p-4 backdrop-blur-sm animate-[slideIn_0.3s_ease] overflow-hidden">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#D4A574]" />
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#D4A574]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#D4A574]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#D4A574]" />

          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/5 to-transparent pointer-events-none" />

          <div className="relative space-y-2">
            {/* Title */}
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#00FF41]/30">
              <Users size={20} className="text-[#00FF41]" />
              <span className="text-[#00FF41] uppercase tracking-wider">NPC Gerado</span>
            </div>

            {/* NPC Stats */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-[#D4A574] uppercase text-xs">Nome:</span>
                <span className="text-[#00FF41]">{npcData.name}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-[#D4A574] uppercase text-xs">Função:</span>
                <span className="text-[#00FF41]">{npcData.role}</span>
              </div>
              
              <div className="flex items-center gap-2 col-span-2">
                <span className="text-[#D4A574] uppercase text-xs">Características:</span>
                <span className="text-[#00FF41]">{npcData.traits.join(', ')}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-[#D4A574] uppercase text-xs">Nível:</span>
                <span className="text-[#ff6b35]">{npcData.level}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-[#D4A574] uppercase text-xs">PV:</span>
                <span className="text-[#ff6b35]">{npcData.health}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-[#D4A574] uppercase text-xs">Armadura:</span>
                <span className="text-[#ff6b35]">{npcData.armor}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </OrnamentalCard>
  );
}