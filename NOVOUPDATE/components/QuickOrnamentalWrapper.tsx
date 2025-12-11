import { ReactNode } from 'react';

interface QuickOrnamentalWrapperProps {
  children: ReactNode;
  title: string;
  icon?: ReactNode;
  colSpan?: 1 | 2;
  delay?: number;
}

export function QuickOrnamentalWrapper({ 
  children, 
  title, 
  icon, 
  colSpan = 1,
  delay = 0 
}: QuickOrnamentalWrapperProps) {
  return (
    <div 
      className={`relative bg-black/80 backdrop-blur-sm border-2 border-[#D4A574] shadow-[0_0_20px_rgba(212,165,116,0.3)] ${
        colSpan === 2 ? 'col-span-2' : ''
      }`}
      style={{ animation: `fadeIn ${0.6 + delay}s ease-out` }}
    >
      {/* Decorative corners */}
      <div className="absolute top-[-2px] left-[-2px] w-8 h-8 pointer-events-none">
        <svg width="32" height="32">
          <path d="M 0 16 Q 0 0 16 0 L 32 0" stroke="#D4A574" strokeWidth="2" fill="none" />
          <circle cx="8" cy="8" r="2" fill="#ff6b35" />
        </svg>
      </div>
      <div className="absolute top-[-2px] right-[-2px] w-8 h-8 pointer-events-none">
        <svg width="32" height="32">
          <path d="M 32 16 Q 32 0 16 0 L 0 0" stroke="#D4A574" strokeWidth="2" fill="none" />
          <circle cx="24" cy="8" r="2" fill="#ff6b35" />
        </svg>
      </div>
      <div className="absolute bottom-[-2px] left-[-2px] w-8 h-8 pointer-events-none">
        <svg width="32" height="32">
          <path d="M 0 16 Q 0 32 16 32 L 32 32" stroke="#D4A574" strokeWidth="2" fill="none" />
          <circle cx="8" cy="24" r="2" fill="#ff6b35" />
        </svg>
      </div>
      <div className="absolute bottom-[-2px] right-[-2px] w-8 h-8 pointer-events-none">
        <svg width="32" height="32">
          <path d="M 32 16 Q 32 32 16 32 L 0 32" stroke="#D4A574" strokeWidth="2" fill="none" />
          <circle cx="24" cy="24" r="2" fill="#ff6b35" />
        </svg>
      </div>

      {/* Inner border */}
      <div className="absolute inset-[6px] border border-[#ff6b35]/30 pointer-events-none" />

      {/* Title bar */}
      <div className="relative bg-gradient-to-r from-[#D4A574]/20 to-[#D4A574]/5 border-b-2 border-[#D4A574] px-6 py-4 flex items-center gap-3">
        <svg width="20" height="20" className="opacity-60">
          <circle cx="10" cy="10" r="8" fill="none" stroke="#D4A574" strokeWidth="1" />
          <circle cx="10" cy="10" r="4" fill="#D4A574" opacity="0.3" />
        </svg>

        {icon && <div className="text-[#D4A574] text-xl">{icon}</div>}
        
        <h2 
          className="flex-1 uppercase tracking-widest text-[#D4A574]"
          style={{ textShadow: '0 0 10px rgba(212, 165, 116, 0.3)' }}
        >
          {title}
        </h2>

        <svg width="20" height="20" className="opacity-60">
          <circle cx="10" cy="10" r="8" fill="none" stroke="#D4A574" strokeWidth="1" />
          <circle cx="10" cy="10" r="4" fill="#D4A574" opacity="0.3" />
        </svg>

        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative p-6">
        {children}
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 bg-[#00FF41]/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}
