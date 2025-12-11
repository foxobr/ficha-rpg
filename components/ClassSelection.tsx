import { Character, CLASSES } from '../types/character';
import { useState } from 'react';
import { OrnamentalCard } from './OrnamentalCard';
import { Crown } from 'lucide-react';

interface ClassSelectionProps {
  character: Character;
  onChange: (updates: Partial<Character>) => void;
  onAddSkills: (skills: string[]) => void;
  showStatus: (message: string, type?: string) => void;
}

export function ClassSelection({ character, onChange, onAddSkills, showStatus }: ClassSelectionProps) {
  const [selectedClass, setSelectedClass] = useState(character.characterClass);

  const handleSelectClass = (className: string) => {
    if (character.level < 1) {
      showStatus('⚠️ Classe só pode ser selecionada no Nível 1 ou superior!', 'warning');
      return;
    }

    setSelectedClass(className);
    onChange({ characterClass: className });
    
    const classData = CLASSES[className];
    onAddSkills(classData.skills);
    
    showStatus(`✅ Classe "${className}" selecionada!`);
  };

  return (
    <OrnamentalCard title="Classe (Selecionável no Nível 1+)" icon={<Crown size={20} />} className="col-span-2 animate-[fadeIn_0.85s_ease-out]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
        {Object.entries(CLASSES).map(([className, classData]) => (
          <div
            key={className}
            onClick={() => handleSelectClass(className)}
            className={`relative p-4 border-2 cursor-pointer transition-all group ${
              selectedClass === className
                ? 'bg-gradient-to-br from-[#D4A574]/30 to-[#ff6b35]/20 border-[#00FF41] shadow-[0_0_20px_rgba(0,255,65,0.4)]'
                : 'bg-black/60 border-[#D4A574] hover:border-[#ff6b35] hover:shadow-[0_0_15px_rgba(255,107,53,0.3)]'
            }`}
          >
            {/* Corner decorations */}
            <div className={`absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 transition-colors ${
              selectedClass === className ? 'border-[#00FF41]' : 'border-[#ff6b35]'
            }`} />
            <div className={`absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 transition-colors ${
              selectedClass === className ? 'border-[#00FF41]' : 'border-[#ff6b35]'
            }`} />
            <div className={`absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 transition-colors ${
              selectedClass === className ? 'border-[#00FF41]' : 'border-[#ff6b35]'
            }`} />
            <div className={`absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 transition-colors ${
              selectedClass === className ? 'border-[#00FF41]' : 'border-[#ff6b35]'
            }`} />

            <div className={`text-center mb-2 uppercase tracking-wider transition-colors ${
              selectedClass === className ? 'text-[#00FF41]' : 'text-[#D4A574]'
            }`} style={{ textShadow: selectedClass === className ? '0 0 10px rgba(0, 255, 65, 0.5)' : 'none' }}>
              {className}
            </div>
            <div className="text-sm text-[#888] text-center">
              {classData.skills.join(', ')}
            </div>
            <div className="text-xs text-[#ff6b35] text-center mt-2">
              +{classData.additionalPoints} pts
            </div>

            {/* Selection indicator */}
            {selectedClass === className && (
              <div className="absolute top-2 right-2 w-3 h-3 bg-[#00FF41] rounded-full animate-pulse" />
            )}
          </div>
        ))}
      </div>

      {selectedClass && CLASSES[selectedClass] && (
        <div className="mt-6 p-4 bg-black/80 border-2 border-[#00FF41] relative">
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#ff6b35]" />
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#ff6b35]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#ff6b35]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#ff6b35]" />
          
          <div className="text-[#00FF41] text-center">
            <div className="text-lg mb-2 uppercase tracking-wider" style={{ textShadow: '0 0 10px rgba(0, 255, 65, 0.5)' }}>
              {selectedClass}
            </div>
            <div className="text-sm text-[#D4A574]">
              Subperícias Treinadas: {CLASSES[selectedClass].skills.join(', ')}
            </div>
            <div className="text-sm text-[#ff6b35] mt-1">
              Pontos Adicionais: {CLASSES[selectedClass].additionalPoints}
            </div>
          </div>
        </div>
      )}
    </OrnamentalCard>
  );
}