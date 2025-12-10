import { Character } from '../types/character';
import { useState } from 'react';
import { QuickOrnamentalWrapper } from './QuickOrnamentalWrapper';
import { OrnamentalList } from './OrnamentalList';
import { BookOpen, Plus } from 'lucide-react';

interface SkillsProps {
  character: Character;
  onChange: (updates: Partial<Character>) => void;
  showStatus: (message: string) => void;
}

export function Skills({ character, onChange, showStatus }: SkillsProps) {
  const [customSkill, setCustomSkill] = useState('');

  const addSkill = (skillName: string) => {
    if (character.skills.includes(skillName)) {
      return; // Avoid duplicates
    }
    onChange({ skills: [...character.skills, skillName] });
  };

  const removeSkill = (index: number) => {
    const newSkills = [...character.skills];
    newSkills.splice(index, 1);
    onChange({ skills: newSkills });
  };

  const handleAddCustomSkill = () => {
    const skill = customSkill.trim();
    if (!skill) {
      showStatus('⚠️ Digite o nome da subperícia!');
      return;
    }
    addSkill(skill);
    setCustomSkill('');
    showStatus(`✅ Subperícia "${skill}" adicionada!`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddCustomSkill();
    }
  };

  return (
    <QuickOrnamentalWrapper title="Subperícias Treinadas" icon={<BookOpen size={20} />} colSpan={2} delay={0.35}>
      <div className="mb-6">
        <label className="block mb-3 text-[#D4A574] uppercase tracking-wider text-sm">
          Adicionar Nova Subperícia:
        </label>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              className="w-full p-3 bg-black/60 border-2 border-[#D4A574] text-[#e0e0e0] focus:outline-none focus:border-[#00FF41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all placeholder:text-[#666]"
              placeholder="Ex: Medicina, Tecnologia..."
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="absolute top-0 right-0 w-2 h-2 bg-[#00FF41] animate-pulse" />
          </div>
          <button
            onClick={handleAddCustomSkill}
            className="relative px-6 py-3 bg-gradient-to-r from-[#4CAF50]/80 to-[#66BB6A]/80 text-white uppercase tracking-wider border-2 border-[#4CAF50] transition-all hover:shadow-[0_0_20px_rgba(76,175,80,0.5)] active:translate-y-0.5 overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Plus size={18} />
              Adicionar
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>
      </div>

      <OrnamentalList
        items={character.skills}
        onRemove={removeSkill}
        emptyMessage="Nenhuma subperícia adicionada"
      />
    </QuickOrnamentalWrapper>
  );
}