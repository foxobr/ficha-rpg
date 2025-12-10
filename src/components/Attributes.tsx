import { Character } from '../types/character';
import { useState, useEffect } from 'react';
import { OrnamentalCard } from './OrnamentalCard';
import { AttributeCircle } from './AttributeCircle';

interface AttributesProps {
  character: Character;
  onChange: (updates: Partial<Character>) => void;
}

export function Attributes({ character, onChange }: AttributesProps) {
  const [showWarning, setShowWarning] = useState(false);

  const maxAttr = character.level === 0 ? 3 : 5;

  useEffect(() => {
    const hasExceeded = 
      character.strength > maxAttr ||
      character.agility > maxAttr ||
      character.intelligence > maxAttr ||
      character.charisma > maxAttr ||
      character.vigor > maxAttr;
    
    setShowWarning(hasExceeded && character.level === 0);
  }, [character, maxAttr]);

  const resetAttributes = () => {
    onChange({
      strength: 1,
      agility: 1,
      intelligence: 1,
      charisma: 1,
      vigor: 1
    });
  };

  const attributes = [
    { key: 'strength', label: 'FOR', fullLabel: 'Força', value: character.strength },
    { key: 'agility', label: 'AGI', fullLabel: 'Agilidade', value: character.agility },
    { key: 'intelligence', label: 'INT', fullLabel: 'Inteligência', value: character.intelligence },
    { key: 'charisma', label: 'CAR', fullLabel: 'Carisma', value: character.charisma },
    { key: 'vigor', label: 'VIG', fullLabel: 'Vigor', value: character.vigor }
  ];

  return (
    <OrnamentalCard title="Atributos (Base 1)" className="animate-[fadeIn_0.7s_ease-out]">
      <p className="text-[#888] text-sm mb-6 text-center">
        Distribua 4 pontos adicionais (Máx: 3 por atributo em nível 0)
      </p>

      {/* Circular attribute layout */}
      <div className="relative mb-8">
        {/* Central ornamental design */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] pointer-events-none">
          <svg width="280" height="280" className="opacity-20">
            {/* Connecting lines between attributes */}
            {[0, 72, 144, 216, 288].map((angle, i) => {
              const nextAngle = (angle + 72) % 360;
              const rad1 = (angle * Math.PI) / 180;
              const rad2 = (nextAngle * Math.PI) / 180;
              const x1 = 140 + Math.cos(rad1) * 120;
              const y1 = 140 + Math.sin(rad1) * 120;
              const x2 = 140 + Math.cos(rad2) * 120;
              const y2 = 140 + Math.sin(rad2) * 120;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#ff6b35"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              );
            })}
            <circle cx="140" cy="140" r="120" fill="none" stroke="#D4A574" strokeWidth="1" strokeDasharray="8 8" />
            <circle cx="140" cy="140" r="100" fill="none" stroke="#00FF41" strokeWidth="1" opacity="0.3" />
          </svg>
        </div>

        {/* Attributes arranged in pentagon */}
        <div className="grid grid-cols-5 gap-4">
          {attributes.map((attr) => (
            <AttributeCircle
              key={attr.key}
              label={attr.label}
              value={attr.value}
              onChange={(value) => onChange({ [attr.key]: value })}
              maxValue={10}
            />
          ))}
        </div>
      </div>

      <button
        onClick={resetAttributes}
        className="relative w-full px-6 py-3 bg-gradient-to-r from-[#2196F3]/80 to-[#42A5F5]/80 text-white uppercase tracking-wider border-2 border-[#2196F3] transition-all hover:shadow-[0_0_20px_rgba(33,150,243,0.5)] active:translate-y-0.5 overflow-hidden group"
      >
        <span className="relative z-10">Resetar Atributos</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </button>

      {showWarning && (
        <div className="mt-4 p-3 bg-[#8B0000]/80 border-2 border-[#ff6b35] text-[#ffb366] text-center uppercase tracking-wide relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMCAwaDQwTDAgNDB6TTQwIDBMMCA0MGgzOXoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-20" />
          <span className="relative z-10">⚠️ Máximo 3 por atributo em nível 0!</span>
        </div>
      )}
    </OrnamentalCard>
  );
}