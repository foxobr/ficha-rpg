import { useState } from 'react';
import { OrnamentalCard } from './OrnamentalCard';
import { Swords, Sparkles } from 'lucide-react';

export function DamageCalculator() {
  const [numDice, setNumDice] = useState(1);
  const [diceType, setDiceType] = useState(6);
  const [baseDamage, setBaseDamage] = useState(0);
  const [modifier, setModifier] = useState(0);
  const [result, setResult] = useState('');

  const calculateDamage = () => {
    let total = 0;
    const rolls = [];
    
    for (let i = 0; i < numDice; i++) {
      const roll = Math.floor(Math.random() * diceType) + 1;
      rolls.push(roll);
      total += roll;
    }

    const finalDamage = total + baseDamage + modifier;
    const message = `
      💥 Dano Calculado
      Dados: [${rolls.join(', ')}] = ${total}
      Dano Base: ${baseDamage}
      Modificador: ${modifier > 0 ? '+' : ''}${modifier}
      TOTAL: ${finalDamage}
    `;
    
    setResult(message);
  };

  const OrnamentalInput = ({ label, value, min, max, onChange, children }: any) => (
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
        
        {children || (
          <input
            type="number"
            className="w-full p-3 bg-black/80 border-2 border-[#D4A574] text-[#e0e0e0] focus:outline-none focus:border-[#ff6b35] focus:shadow-[0_0_10px_rgba(255,107,53,0.3)] transition-all"
            value={value}
            min={min}
            max={max}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );

  return (
    <OrnamentalCard title="Calculadora de Dano" icon={<Swords />} variant="danger" className="animate-[fadeIn_1.2s_ease-out]">
      <OrnamentalInput
        label="Número de Dados"
        value={numDice}
        min={1}
        max={10}
        onChange={(e: any) => setNumDice(parseInt(e.target.value) || 1)}
      />

      <OrnamentalInput label="Tipo de Dado">
        <select
          className="w-full p-3 bg-black/80 border-2 border-[#D4A574] text-[#e0e0e0] focus:outline-none focus:border-[#ff6b35] focus:shadow-[0_0_10px_rgba(255,107,53,0.3)] transition-all cursor-pointer"
          value={diceType}
          onChange={(e) => setDiceType(parseInt(e.target.value))}
        >
          <option value="4">D4</option>
          <option value="6">D6</option>
          <option value="8">D8</option>
          <option value="10">D10</option>
          <option value="12">D12</option>
          <option value="20">D20</option>
        </select>
      </OrnamentalInput>

      <OrnamentalInput
        label="Dano Base (Arma)"
        value={baseDamage}
        min={0}
        max={50}
        onChange={(e: any) => setBaseDamage(parseInt(e.target.value) || 0)}
      />

      <OrnamentalInput
        label="Modificador (+STR, etc)"
        value={modifier}
        min={-10}
        max={10}
        onChange={(e: any) => setModifier(parseInt(e.target.value) || 0)}
      />

      <button
        onClick={calculateDamage}
        className="relative w-full px-6 py-3 bg-gradient-to-r from-[#ff6b35]/80 to-[#ff6b35]/60 text-white uppercase tracking-wider border-2 border-[#ff6b35] transition-all hover:shadow-[0_0_20px_rgba(255,107,53,0.6)] active:translate-y-0.5 overflow-hidden group mb-4"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        
        {/* Button content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          <Sparkles size={18} />
          <span>Calcular Dano</span>
        </span>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#ff6b35]" />
        <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#ff6b35]" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#ff6b35]" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#ff6b35]" />
      </button>

      {result && (
        <div className="relative border-2 border-[#ff6b35] bg-gradient-to-br from-[#ff6b35]/10 to-black/80 p-4 backdrop-blur-sm animate-[slideIn_0.3s_ease] overflow-hidden">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#D4A574]" />
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#D4A574]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#D4A574]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#D4A574]" />

          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/5 to-transparent pointer-events-none" />

          <div className="relative text-[#ff6b35] whitespace-pre-line text-center">
            {result}
          </div>
        </div>
      )}
    </OrnamentalCard>
  );
}