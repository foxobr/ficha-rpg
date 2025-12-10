interface OrnamentalHeaderProps {
  title: string;
  subtitle?: string;
}

export function OrnamentalHeader({ title, subtitle }: OrnamentalHeaderProps) {
  return (
    <div className="relative py-8 mb-12">
      {/* Top ornamental line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A574] to-transparent" />
      
      {/* Main header container */}
      <div className="relative flex items-center justify-center gap-6">
        {/* Left ornamental symbol */}
        <svg width="80" height="80" className="opacity-70">
          {/* Ornamental design - desert emblem left */}
          <circle cx="40" cy="40" r="35" fill="none" stroke="#D4A574" strokeWidth="2" />
          <circle cx="40" cy="40" r="28" fill="none" stroke="#ff6b35" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M 40 15 L 45 35 L 65 40 L 45 45 L 40 65 L 35 45 L 15 40 L 35 35 Z" fill="#00FF41" opacity="0.3" />
          <circle cx="40" cy="40" r="8" fill="#8B0000" opacity="0.5" />
          {/* Decorative corners */}
          <path d="M 10 10 L 25 10 M 10 10 L 10 25" stroke="#D4A574" strokeWidth="2" />
          <path d="M 70 10 L 55 10 M 70 10 L 70 25" stroke="#D4A574" strokeWidth="2" />
          <path d="M 10 70 L 25 70 M 10 70 L 10 55" stroke="#D4A574" strokeWidth="2" />
          <path d="M 70 70 L 55 70 M 70 70 L 70 55" stroke="#D4A574" strokeWidth="2" />
        </svg>

        {/* Title section */}
        <div className="text-center">
          <h1 
            className="text-5xl tracking-[0.3em] uppercase text-[#D4A574] relative inline-block"
            style={{ 
              textShadow: '0 0 20px rgba(212, 165, 116, 0.5), 0 0 40px rgba(255, 107, 53, 0.3)',
              fontWeight: 900
            }}
          >
            {title}
            {/* Underline decoration */}
            <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-[#ff6b35] via-[#D4A574] to-[#ff6b35]" />
            <div className="absolute -bottom-3 left-[20%] right-[20%] h-[1px] bg-[#00FF41]/50" />
          </h1>
          {subtitle && (
            <p className="text-[#888] text-lg mt-4 tracking-widest uppercase" style={{ textShadow: '0 0 10px rgba(0, 255, 65, 0.3)' }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Right ornamental symbol */}
        <svg width="80" height="80" className="opacity-70">
          {/* Ornamental design - desert emblem right (mirrored) */}
          <circle cx="40" cy="40" r="35" fill="none" stroke="#D4A574" strokeWidth="2" />
          <circle cx="40" cy="40" r="28" fill="none" stroke="#ff6b35" strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_20s_linear_infinite_reverse]" />
          <path d="M 40 15 L 45 35 L 65 40 L 45 45 L 40 65 L 35 45 L 15 40 L 35 35 Z" fill="#00FF41" opacity="0.3" />
          <circle cx="40" cy="40" r="8" fill="#8B0000" opacity="0.5" />
          {/* Decorative corners */}
          <path d="M 10 10 L 25 10 M 10 10 L 10 25" stroke="#D4A574" strokeWidth="2" />
          <path d="M 70 10 L 55 10 M 70 10 L 70 25" stroke="#D4A574" strokeWidth="2" />
          <path d="M 10 70 L 25 70 M 10 70 L 10 55" stroke="#D4A574" strokeWidth="2" />
          <path d="M 70 70 L 55 70 M 70 70 L 70 55" stroke="#D4A574" strokeWidth="2" />
        </svg>
      </div>

      {/* Central decorative element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/30 to-transparent pointer-events-none" />

      {/* Bottom ornamental line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff6b35] to-transparent" />
      
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#D4A574]" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#D4A574]" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#D4A574]" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#D4A574]" />
    </div>
  );
}
