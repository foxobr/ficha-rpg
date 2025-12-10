import { DecorativeCorners } from './DecorativeCorners';

interface AttributeCircleProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  maxValue?: number;
}

export function AttributeCircle({ label, value, onChange, maxValue = 10 }: AttributeCircleProps) {
  return (
    <div className="flex flex-col items-center gap-2 relative group">
      {/* Ornamental Circle Container */}
      <div className="relative">
        {/* Outer decorative ring */}
        <svg width="120" height="120" className="absolute inset-0 opacity-30">
          <circle 
            cx="60" 
            cy="60" 
            r="55" 
            fill="none" 
            stroke="#D4A574"
            strokeWidth="1"
            strokeDasharray="4 4"
            className="animate-[spin_20s_linear_infinite]"
          />
        </svg>

        {/* Middle gear-like ring */}
        <svg width="120" height="120" className="absolute inset-0 opacity-50">
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const x1 = 60 + Math.cos(angle) * 50;
            const y1 = 60 + Math.sin(angle) * 50;
            const x2 = 60 + Math.cos(angle) * 45;
            const y2 = 60 + Math.sin(angle) * 45;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#ff6b35"
                strokeWidth="2"
              />
            );
          })}
          <circle cx="60" cy="60" r="48" fill="none" stroke="#ff6b35" strokeWidth="1" />
        </svg>

        {/* Main attribute circle */}
        <div className="relative w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a] border-[3px] border-[#D4A574] flex flex-col items-center justify-center shadow-[0_0_20px_rgba(212,165,116,0.3)] group-hover:shadow-[0_0_30px_rgba(212,165,116,0.5)] transition-all">
          {/* Inner glow ring */}
          <div className="absolute inset-[8px] rounded-full border border-[#00FF41]/30" />
          
          {/* Label */}
          <div className="text-[#D4A574] text-xs tracking-widest uppercase mb-1 relative z-10">
            {label}
          </div>
          
          {/* Value display */}
          <div className="text-[#ff6b35] text-4xl relative z-10 group-hover:scale-110 transition-transform" style={{ textShadow: '0 0 10px rgba(255, 107, 53, 0.5)' }}>
            {value}
          </div>

          {/* Small decorative elements */}
          <div className="absolute top-[10px] w-2 h-2 rounded-full bg-[#00FF41] opacity-50" />
          <div className="absolute bottom-[10px] w-2 h-2 rounded-full bg-[#00FF41] opacity-50" />
        </div>
      </div>

      {/* Input control */}
      <div className="relative w-full max-w-[100px]">
        <DecorativeCorners size="sm" color="#ff6b35" />
        <input
          type="number"
          className="w-full text-center bg-black/80 border-[2px] border-[#ff6b35] text-[#e0e0e0] text-lg rounded-none p-2 focus:outline-none focus:border-[#D4A574] focus:shadow-[0_0_10px_rgba(212,165,116,0.4)] transition-all relative z-10"
          value={value}
          min="1"
          max={maxValue}
          onChange={(e) => onChange(parseInt(e.target.value) || 1)}
        />
      </div>
    </div>
  );
}
