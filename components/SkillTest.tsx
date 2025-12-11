import { useState } from 'react';
import { Character } from '../types/character';
import { OrnamentalCard } from './OrnamentalCard';
import { Target, Zap } from 'lucide-react';

interface SkillTestProps {
  onAddLog: (action: string) => void;
}

export function SkillTest({ onAddLog }: SkillTestProps) {
  const [attribute, setAttribute] = useState(1);
  const [modifier, setModifier] = useState(0);
  const [difficulty, setDifficulty] = useState(10);
  const [result, setResult] = useState('');

  const rollSkillTest = () => {
    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + attribute + modifier;
    const success = total >= difficulty;

    const resultColor = success ? '#66BB6A' : '#DC143C';
    const message = `
      ${success ? '✅ SUCESSO!' : '❌ FALHA!'}
      D20: ${d20}
      Atributo: ${attribute}
      Modificador: ${modifier > 0 ? '+' : ''}${modifier}
      Dificuldade: ${difficulty}
      Total: ${total}
    `;
    
    setResult(message);
    onAddLog(`Teste de perícia: ${success ? 'SUCESSO' : 'FALHA'} (${total} vs ${difficulty})`);
  };

  const OrnamentalInput = ({ label, value, min, max, onChange, step = 1 }: any) => (
    <div className="mb-4">
      <label className="block mb-2 text-[#D4A574] uppercase tracking-wider text-sm flex items-center gap-2">
        <div className="w-1 h-4 bg-gradient-to-b from-[#ff6b35] to-[#D4A574]" />
        {label}
      </label>
      <div className="relative">
        {/* Decorative border */}
        <div className="absolute -inset-[2px] border border-[#D4A574]/30 pointer-events-none">
          <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-[#ff6b35]" />
          <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-[#ff6b35]" />
        </div>
        
        <input
          type="number"
          className="w-full p-3 bg-black/80 border-2 border-[#D4A574] text-[#e0e0e0] focus:outline-none focus:border-[#ff6b35] focus:shadow-[0_0_10px_rgba(255,107,53,0.3)] transition-all"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
        />
      </div>
    </div>
  );

  return (
    <OrnamentalCard title="Teste de Perícia" icon={<Target />} className="animate-[fadeIn_1.1s_ease-out]">
      <OrnamentalInput
        label="Modificador de Atributo"
        value={attribute}
        min={-5}
        max={10}
        onChange={(e: any) => setAttribute(parseInt(e.target.value) || 0)}
      />

      <OrnamentalInput
        label="Modificador Adicional"
        value={modifier}
        min={-10}
        max={10}
        onChange={(e: any) => setModifier(parseInt(e.target.value) || 0)}
      />

      <OrnamentalInput
        label="Dificuldade (DT)"
        value={difficulty}
        min={1}
        max={30}
        onChange={(e: any) => setDifficulty(parseInt(e.target.value) || 10)}
      />

      <button
        onClick={rollSkillTest}
        className="relative w-full px-6 py-3 bg-gradient-to-r from-[#00FF41]/80 to-[#00FF41]/60 text-black uppercase tracking-wider border-2 border-[#00FF41] transition-all hover:shadow-[0_0_20px_rgba(0,255,65,0.6)] active:translate-y-0.5 overflow-hidden group mb-4"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        
        {/* Button content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          <Zap size={18} />
          <span>Fazer Teste</span>
        </span>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#00FF41]" />
        <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#00FF41]" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#00FF41]" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#00FF41]" />
      </button>

      {result && (
        <div className="relative border-2 border-[#00FF41] bg-gradient-to-br from-[#00FF41]/10 to-black/80 p-4 backdrop-blur-sm animate-[slideIn_0.3s_ease] overflow-hidden">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#D4A574]" />
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#D4A574]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#D4A574]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#D4A574]" />

          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/5 to-transparent pointer-events-none" />

          <div className="relative text-[#00FF41] whitespace-pre-line text-center">
            {result}
          </div>
        </div>
      )}
    </OrnamentalCard>
  );
}