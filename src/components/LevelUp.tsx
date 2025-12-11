import { Character } from '../types/character';
import { useState } from 'react';
import { SKILL_CATEGORIES } from '../types/skills';
import { OrnamentalCard } from './OrnamentalCard';
import { TrendingUp, Heart, Award, X } from 'lucide-react';

interface LevelUpProps {
  character: Character;
  onChange: (updates: Partial<Character>) => void;
  showStatus: (message: string) => void;
}

export function LevelUp({ character, onChange, showStatus }: LevelUpProps) {
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [skillAction, setSkillAction] = useState<'new' | 'improve'>('new');

  const trainedSkills = character.trainedSkills || {};
  const existingSkills = Object.keys(trainedSkills);

  const handleLevelUp = () => {
    if (skillAction === 'new' && !selectedSkill) {
      showStatus('⚠️ Selecione uma nova perícia para treinar!');
      return;
    }

    if (skillAction === 'improve' && !selectedSkill) {
      showStatus('⚠️ Selecione uma perícia para melhorar!');
      return;
    }

    const newLevel = character.level + 1;
    const newMaxHP = character.maxHP + 5;
    const newCurrentHP = character.currentHP + 5; // Ganha os 5 HP também no HP atual
    
    const newTrainedSkills = { ...trainedSkills };

    if (skillAction === 'new') {
      newTrainedSkills[selectedSkill] = 3; // Nova perícia começa com +3
    } else {
      newTrainedSkills[selectedSkill] = (newTrainedSkills[selectedSkill] || 0) + 3; // Melhora +3
    }

    onChange({
      level: newLevel,
      maxHP: newMaxHP,
      currentHP: newCurrentHP,
      trainedSkills: newTrainedSkills,
    });

    showStatus(`🎉 Parabéns! Subiu para o nível ${newLevel}! +5 HP e perícia "${selectedSkill}" ${skillAction === 'new' ? 'treinada' : 'melhorada'}!`);
    
    setShowLevelUpModal(false);
    setSelectedCategory('');
    setSelectedSkill('');
    setSkillAction('new');
  };

  const allSkills: string[] = [];
  Object.values(SKILL_CATEGORIES).forEach(categorySkills => {
    categorySkills.forEach(skill => allSkills.push(skill.name));
  });

  const availableNewSkills = allSkills.filter(skill => !existingSkills.includes(skill));

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gradient-to-r from-[#D4A574]/20 to-transparent border-l-4 border-[#D4A574]">
        <div className="flex items-center justify-between">
          <div className="flex gap-8">
            <div>
              <div className="text-[#D4A574] uppercase tracking-wider text-sm mb-1">
                Nível Atual
              </div>
              <div className="text-4xl text-[#00FF41]">
                {character.level}
              </div>
            </div>
            <div>
              <div className="text-[#D4A574] uppercase tracking-wider text-sm mb-1">
                Pontos de Experiência
              </div>
              <div className="text-2xl text-[#e0e0e0]">
                {character.experiencePoints || 0} PE
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowLevelUpModal(true)}
            className="relative px-6 py-4 bg-gradient-to-r from-[#FFD700]/80 to-[#FFA500]/80 text-black uppercase tracking-wider border-2 border-[#FFD700] transition-all hover:shadow-[0_0_20px_rgba(255,215,0,0.6)] active:translate-y-0.5 overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              <TrendingUp size={20} />
              Subir de Nível
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>
      </div>

      {showLevelUpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/90">
          <div className="w-full max-w-2xl">
            <OrnamentalCard delay={0}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-[#D4A574] uppercase tracking-wider flex items-center gap-3">
                  <TrendingUp size={28} />
                  Subir para o Nível {character.level + 1}
                </h2>
                <button
                  onClick={() => setShowLevelUpModal(false)}
                  className="p-2 text-[#8B0000] hover:text-[#ff0000] hover:bg-[#8B0000]/20 border-2 border-transparent hover:border-[#8B0000] transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Benefícios */}
              <div className="mb-6 p-4 bg-[#00FF41]/10 border-2 border-[#00FF41]/50">
                <h3 className="text-[#00FF41] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Award size={20} />
                  Benefícios do Nível {character.level + 1}:
                </h3>
                <ul className="space-y-2 text-[#e0e0e0]">
                  <li className="flex items-center gap-2">
                    <Heart size={18} className="text-[#8B0000]" />
                    <span><span className="text-[#00FF41]">+5 HP</span> (Máximo: {character.maxHP} → {character.maxHP + 5})</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award size={18} className="text-[#FFD700]" />
                    <span><span className="text-[#00FF41]">+3</span> em uma perícia (nova ou existente)</span>
                  </li>
                </ul>
              </div>

              {/* Escolha de ação */}
              <div className="mb-6">
                <label className="block mb-3 text-[#D4A574] uppercase tracking-wider text-sm">
                  Escolha sua perícia:
                </label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    onClick={() => {
                      setSkillAction('new');
                      setSelectedSkill('');
                      setSelectedCategory('');
                    }}
                    className={`p-4 border-2 transition-all ${
                      skillAction === 'new'
                        ? 'border-[#00FF41] bg-[#00FF41]/10 text-[#00FF41]'
                        : 'border-[#D4A574]/40 bg-black/40 text-[#888] hover:border-[#D4A574]'
                    }`}
                  >
                    <Award className="mx-auto mb-2" size={24} />
                    <div className="text-sm uppercase tracking-wider">Treinar Nova</div>
                    <div className="text-xs mt-1 opacity-70">+3 inicial</div>
                  </button>
                  <button
                    onClick={() => {
                      setSkillAction('improve');
                      setSelectedSkill('');
                    }}
                    className={`p-4 border-2 transition-all ${
                      skillAction === 'improve'
                        ? 'border-[#00FF41] bg-[#00FF41]/10 text-[#00FF41]'
                        : 'border-[#D4A574]/40 bg-black/40 text-[#888] hover:border-[#D4A574]'
                    }`}
                  >
                    <TrendingUp className="mx-auto mb-2" size={24} />
                    <div className="text-sm uppercase tracking-wider">Melhorar Existente</div>
                    <div className="text-xs mt-1 opacity-70">+3 adicional</div>
                  </button>
                </div>
              </div>

              {/* Seleção de perícia */}
              {skillAction === 'new' ? (
                <div className="space-y-4 mb-6">
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
                        Nova Perícia:
                      </label>
                      <select
                        value={selectedSkill}
                        onChange={(e) => setSelectedSkill(e.target.value)}
                        className="w-full p-3 bg-black/60 border-2 border-[#D4A574] text-[#e0e0e0] focus:outline-none focus:border-[#00FF41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all"
                      >
                        <option value="">Selecione uma perícia</option>
                        {SKILL_CATEGORIES[selectedCategory as keyof typeof SKILL_CATEGORIES]
                          .filter(skill => !existingSkills.includes(skill.name))
                          .map(skill => (
                            <option key={skill.name} value={skill.name}>
                              {skill.name} ({skill.attributes.join('/')})
                            </option>
                          ))}
                      </select>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mb-6">
                  <label className="block mb-2 text-[#D4A574] uppercase tracking-wider text-sm">
                    Melhorar Perícia Existente:
                  </label>
                  <select
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    className="w-full p-3 bg-black/60 border-2 border-[#D4A574] text-[#e0e0e0] focus:outline-none focus:border-[#00FF41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all"
                  >
                    <option value="">Selecione uma perícia</option>
                    {existingSkills.map(skillName => (
                      <option key={skillName} value={skillName}>
                        {skillName} (atual: +{trainedSkills[skillName]} → novo: +{trainedSkills[skillName] + 3})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Botão de confirmação */}
              <button
                onClick={handleLevelUp}
                disabled={!selectedSkill}
                className="w-full relative px-6 py-4 bg-gradient-to-r from-[#FFD700]/80 to-[#FFA500]/80 text-black uppercase tracking-wider border-2 border-[#FFD700] transition-all hover:shadow-[0_0_20px_rgba(255,215,0,0.6)] active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <TrendingUp size={20} />
                  Confirmar Level Up
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </OrnamentalCard>
          </div>
        </div>
      )}
    </div>
  );
}
