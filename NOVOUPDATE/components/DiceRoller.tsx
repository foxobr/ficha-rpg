import { useState } from 'react';
import { OrnamentalCard } from './OrnamentalCard';
import { Dices } from 'lucide-react';

export function DiceRoller() {
  const [diceResult, setDiceResult] = useState('');
  const [customResult, setCustomResult] = useState('');
  const [customDice, setCustomDice] = useState('');
  const [rolling, setRolling] = useState(false);

  const rollDice = (sides: number) => {
    setRolling(true);
    setTimeout(() => {
      const result = Math.floor(Math.random() * sides) + 1;
      setDiceResult(`D${sides}: ${result}`);
      setRolling(false);
    }, 300);
  };

  const rollCustomDice = () => {
    const input = customDice.trim();
    if (!input) {
      setCustomResult('⚠️ Digite a rolagem (Ex: 2d6, 3d20+5)');
      return;
    }

    const regex = /^(\d+)d(\d+)([\+\-]\d+)?$/i;
    const match = input.match(regex);

    if (!match) {
      setCustomResult('⚠️ Formato inválido! Use: NdM ou NdM+X (Ex: 2d6+3)');
      return;
    }

    const numDice = parseInt(match[1]);
    const diceSize = parseInt(match[2]);
    const modifier = match[3] ? parseInt(match[3]) : 0;

    if (numDice > 20 || diceSize > 100) {
      setCustomResult('⚠️ Valores muito altos!');
      return;
    }

    setRolling(true);
    setTimeout(() => {
      let total = 0;
      const rolls = [];
      for (let i = 0; i < numDice; i++) {
        const roll = Math.floor(Math.random() * diceSize) + 1;
        rolls.push(roll);
        total += roll;
      }

      const finalTotal = total + modifier;
      const modifierText = modifier !== 0 ? (modifier > 0 ? ` + ${modifier}` : ` ${modifier}`) : '';
      setCustomResult(`${input}\nDados: [${rolls.join(', ')}]${modifierText}\nTotal: ${finalTotal}`);
      setRolling(false);
    }, 300);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      rollCustomDice();
    }
  };

  const clearResults = () => {
    setDiceResult('');
    setCustomResult('');
  };

  return (
    <OrnamentalCard title="Rolagem de Dados" icon={<Dices size={20} />} className="col-span-2 animate-[fadeIn_1s_ease-out]">
      {/* Dice buttons */}
      <div className="grid grid-cols-6 gap-3 mb-6">
        {[4, 6, 8, 10, 12, 20].map((sides) => (
          <button
            key={sides}
            onClick={() => rollDice(sides)}
            disabled={rolling}
            className="relative group aspect-square"
          >
            {/* Decorative frame */}
            <div className="absolute inset-0 border-2 border-[#D4A574] bg-gradient-to-br from-[#1a1a1a] to-black transition-all group-hover:border-[#00FF41] group-hover:shadow-[0_0_20px_rgba(0,255,65,0.4)]">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-[#ff6b35]" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-[#ff6b35]" />
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#ff6b35]" />
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#ff6b35]" />
              
              {/* Dice icon */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Dices size={24} className="text-[#D4A574] mb-1 group-hover:text-[#00FF41] transition-colors" />
                <span className="text-[#ff6b35] text-xl group-hover:text-[#00FF41] transition-colors" style={{ textShadow: '0 0 10px currentColor' }}>
                  D{sides}
                </span>
              </div>
              
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </button>
        ))}
      </div>

      {/* Custom dice roller */}
      <div className="mb-6">
        <label className="block mb-3 text-[#D4A574] uppercase tracking-wider text-sm">
          Rolar Múltiplos Dados (Ex: 2d6, 3d20):
        </label>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              className="w-full p-3 bg-black/60 border-2 border-[#D4A574] text-[#e0e0e0] focus:outline-none focus:border-[#00FF41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all placeholder:text-[#666]"
              placeholder="Ex: 2d6+3"
              value={customDice}
              onChange={(e) => setCustomDice(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="absolute top-0 right-0 w-2 h-2 bg-[#00FF41] animate-pulse" />
          </div>
          <button
            onClick={rollCustomDice}
            disabled={rolling}
            className="relative px-6 py-3 bg-gradient-to-r from-[#4CAF50]/80 to-[#66BB6A]/80 text-white uppercase tracking-wider border-2 border-[#4CAF50] transition-all hover:shadow-[0_0_20px_rgba(76,175,80,0.5)] active:translate-y-0.5 overflow-hidden group disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Dices size={18} />
              Rolar
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>
      </div>

      {/* Results */}
      {diceResult && (
        <div className="mb-4 p-4 bg-black/80 border-2 border-[#00FF41] relative overflow-hidden animate-[slideIn_0.3s_ease]">
          <div className="absolute inset-0 bg-[#00FF41]/10" />
          <div className="relative z-10 text-center">
            <div className="text-sm text-[#D4A574] mb-1 uppercase tracking-widest">Resultado</div>
            <div className="text-3xl text-[#00FF41]" style={{ textShadow: '0 0 20px rgba(0, 255, 65, 0.6)' }}>
              {diceResult}
            </div>
          </div>
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#ff6b35]" />
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#ff6b35]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#ff6b35]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#ff6b35]" />
        </div>
      )}

      {customResult && (
        <div className="mb-4 p-4 bg-black/80 border-2 border-[#00FF41] relative overflow-hidden animate-[slideIn_0.3s_ease]">
          <div className="absolute inset-0 bg-[#00FF41]/10" />
          <div className="relative z-10">
            <div className="text-[#00FF41] whitespace-pre-line" style={{ textShadow: '0 0 10px rgba(0, 255, 65, 0.4)' }}>
              {customResult}
            </div>
          </div>
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#ff6b35]" />
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#ff6b35]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#ff6b35]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#ff6b35]" />
        </div>
      )}

      <button
        onClick={clearResults}
        className="relative w-full px-6 py-3 bg-gradient-to-r from-[#2196F3]/80 to-[#42A5F5]/80 text-white uppercase tracking-wider border-2 border-[#2196F3] transition-all hover:shadow-[0_0_20px_rgba(33,150,243,0.5)] active:translate-y-0.5 overflow-hidden group"
      >
        <span className="relative z-10">Limpar Resultados</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </button>
    </OrnamentalCard>
  );
}