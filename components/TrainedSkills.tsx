import { Character } from '../types/character';
import { useState } from 'react';
import { SKILL_CATEGORIES, getSkillByName } from '../types/skills';
import { QuickOrnamentalWrapper } from './QuickOrnamentalWrapper';
import { BookOpen, Plus, Award, X } from 'lucide-react';

interface TrainedSkillsProps {
  character: Character;
  onChange: (updates: Partial<Character>) => void;
  showStatus: (message: string) => void;
}

export function TrainedSkills({ character, onChange, showStatus }: TrainedSkillsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);

  const trainedSkills = character.trainedSkills || {};

  const addTrainedSkill = (skillName: string) => {
    if (trainedSkills[skillName]) {
      showStatus('⚠️ Esta perícia já está treinada!');
      return;
    }

    const newTrainedSkills = {
      ...trainedSkills,
      [skillName]: 3, // Nível 1 sempre começa com +3
    };

    onChange({ trainedSkills: newTrainedSkills });
    showStatus(`✅ Perícia "${skillName}" treinada (+3)!`);
    setShowAddModal(false);
    setSelectedCategory('');
    setSelectedSkill('');
  };

  const removeTrainedSkill = (skillName: string) => {
    const newTrainedSkills = { ...trainedSkills };
    delete newTrainedSkills[skillName];
    onChange({ trainedSkills: newTrainedSkills });
    showStatus(`❌ Perícia "${skillName}" removida`);
  };

  const updateSkillLevel = (skillName: string, newLevel: number) => {
    if (newLevel < 0) return;
    
    const newTrainedSkills = {
      ...trainedSkills,
      [skillName]: newLevel,
    };

    onChange({ trainedSkills: newTrainedSkills });
  };

  return (
    <QuickOrnamentalWrapper 
      title="Perícias Treinadas" 
      icon={<BookOpen size={20} />} 
      colSpan={2} 
      delay={0.35}
    >
      <div className="mb-6">
        <button
          onClick={() => setShowAddModal(!showAddModal)}
          className="relative px-6 py-3 bg-gradient-to-r from-[#4CAF50]/80 to-[#66BB6A]/80 text-white uppercase tracking-wider border-2 border-[#4CAF50] transition-all hover:shadow-[0_0_20px_rgba(76,175,80,0.5)] active:translate-y-0.5 overflow-hidden group"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Plus size={18} />
            Adicionar Perícia Treinada
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </button>
      </div>

      {showAddModal && (
        <div className="mb-6 p-6 bg-black/80 border-2 border-[#D4A574]">
          <h3 className="text-[#D4A574] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Award size={20} />
            Selecionar Perícia
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-[#D4A574] uppercase tracking-wider text-sm">
                Categoria:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSkill('');
                }}
                className="w-full p-3 bg-black/60 border-2 border-[#D4A574] text-[#e0e0e0] focus:outline-none focus:border-[#00FF41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all"
              >
                <option value="">Selecione uma categoria</option>
                {Object.keys(SKILL_CATEGORIES).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {selectedCategory && (
              <div>
                <label className="block mb-2 text-[#D4A574] uppercase tracking-wider text-sm">
                  Perícia:
                </label>
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="w-full p-3 bg-black/60 border-2 border-[#D4A574] text-[#e0e0e0] focus:outline-none focus:border-[#00FF41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all"
                >
                  <option value="">Selecione uma perícia</option>
                  {SKILL_CATEGORIES[selectedCategory as keyof typeof SKILL_CATEGORIES].map(skill => (
                    <option key={skill.name} value={skill.name}>
                      {skill.name} ({skill.attributes.join('/')})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => selectedSkill && addTrainedSkill(selectedSkill)}
                disabled={!selectedSkill}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#4CAF50]/80 to-[#66BB6A]/80 text-white uppercase tracking-wider border-2 border-[#4CAF50] transition-all hover:shadow-[0_0_20px_rgba(76,175,80,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Adicionar
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setSelectedCategory('');
                  setSelectedSkill('');
                }}
                className="px-6 py-3 bg-gradient-to-r from-[#8B0000]/80 to-[#6d0000]/80 text-white uppercase tracking-wider border-2 border-[#8B0000] transition-all hover:shadow-[0_0_20px_rgba(139,0,0,0.5)]"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de perícias treinadas */}
      <div className="space-y-3">
        {Object.keys(trainedSkills).length === 0 ? (
          <div className="text-center py-8 text-[#666] italic border-2 border-dashed border-[#D4A574]/30 bg-black/20">
            Nenhuma perícia treinada. Use o botão acima para adicionar.
          </div>
        ) : (
          Object.entries(trainedSkills).map(([skillName, level]) => {
            const skillInfo = getSkillByName(skillName);
            return (
              <div
                key={skillName}
                className="relative flex items-center justify-between p-4 bg-gradient-to-r from-black/60 to-black/40 border-2 border-[#D4A574] hover:border-[#00FF41] transition-all group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <Award size={18} className="text-[#D4A574]" />
                    <div>
                      <div className="text-[#e0e0e0] uppercase tracking-wider">
                        {skillName}
                      </div>
                      {skillInfo && (
                        <div className="text-xs text-[#888] mt-1">
                          {skillInfo.category} • {skillInfo.attributes.join('/')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-[#D4A574] text-sm uppercase tracking-wider">
                      Bônus:
                    </label>
                    <input
                      type="number"
                      value={level}
                      onChange={(e) => updateSkillLevel(skillName, parseInt(e.target.value) || 0)}
                      className="w-20 p-2 bg-black/60 border-2 border-[#D4A574] text-[#00FF41] text-center focus:outline-none focus:border-[#00FF41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all"
                      min="0"
                      step="3"
                    />
                    <span className="text-[#00FF41] text-xl">+{level}</span>
                  </div>

                  <button
                    onClick={() => removeTrainedSkill(skillName)}
                    className="p-2 text-[#8B0000] hover:text-[#ff0000] hover:bg-[#8B0000]/20 border-2 border-transparent hover:border-[#8B0000] transition-all"
                    title="Remover perícia"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00FF41] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00FF41] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })
        )}
      </div>

      {/* Info sobre o sistema */}
      <div className="mt-6 p-4 bg-[#D4A574]/10 border-2 border-[#D4A574]/30 text-[#D4A574] text-sm">
        <div className="mb-2 uppercase tracking-wider">📚 Sistema de Treinamento:</div>
        <ul className="space-y-1 text-xs">
          <li>• Nível 1: Todas as perícias treinadas começam com <span className="text-[#00FF41]">+3</span></li>
          <li>• A cada nível, você ganha <span className="text-[#00FF41]">+3</span> em uma perícia existente ou treina uma nova</li>
          <li>• Você pode ajustar manualmente o bônus de cada perícia</li>
        </ul>
      </div>
    </QuickOrnamentalWrapper>
  );
}
