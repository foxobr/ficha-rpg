import { ReactNode } from 'react';
import { DecorativeCorners } from './DecorativeCorners';

interface OrnamentalCardProps {
  title?: string;
  children: ReactNode;
  icon?: ReactNode;
  variant?: 'default' | 'accent' | 'danger';
  className?: string;
  delay?: number;
}

export function OrnamentalCard({ title, children, icon, variant = 'default', className = '', delay = 0 }: OrnamentalCardProps) {
  const getVariantColors = () => {
    switch (variant) {
      case 'accent':
        return {
          border: '#00FF41',
          titleBg: 'from-[#00FF41]/20 to-[#00FF41]/5',
          titleText: '#00FF41',
          glow: 'rgba(0, 255, 65, 0.3)'
        };
      case 'danger':
        return {
          border: '#8B0000',
          titleBg: 'from-[#8B0000]/20 to-[#8B0000]/5',
          titleText: '#ff6b35',
          glow: 'rgba(139, 0, 0, 0.3)'
        };
      default:
        return {
          border: '#D4A574',
          titleBg: 'from-[#D4A574]/20 to-[#D4A574]/5',
          titleText: '#D4A574',
          glow: 'rgba(212, 165, 116, 0.3)'
        };
    }
  };

  const colors = getVariantColors();

  return (
    <div className={`relative bg-black/80 backdrop-blur-sm ${className}`}>
      {/* Decorative corners */}
      <DecorativeCorners size="md" color={colors.border} />
      
      {/* Main border */}
      <div 
        className="absolute inset-0 border-[2px] pointer-events-none" 
        style={{ 
          borderColor: colors.border,
          boxShadow: `0 0 15px ${colors.glow}`
        }}
      />
      
      {/* Inner border */}
      <div className="absolute inset-[6px] border border-[#ff6b35]/30 pointer-events-none" />

      {/* Ornamental title bar (only if title provided) */}
      {title && (
        <div className={`relative bg-gradient-to-r ${colors.titleBg} border-b-2 px-6 py-4 flex items-center gap-3`} style={{ borderBottomColor: colors.border }}>
          {/* Left decoration */}
          <svg width="20" height="20" className="opacity-60">
            <circle cx="10" cy="10" r="8" fill="none" stroke={colors.border} strokeWidth="1" />
            <circle cx="10" cy="10" r="4" fill={colors.border} opacity="0.3" />
          </svg>

          {icon && <div className="text-xl" style={{ color: colors.titleText }}>{icon}</div>}
          
          <h2 
            className="flex-1 uppercase tracking-widest"
            style={{ 
              color: colors.titleText,
              textShadow: `0 0 10px ${colors.glow}`
            }}
          >
            {title}
          </h2>

          {/* Right decoration */}
          <svg width="20" height="20" className="opacity-60">
            <circle cx="10" cy="10" r="8" fill="none" stroke={colors.border} strokeWidth="1" />
            <circle cx="10" cy="10" r="4" fill={colors.border} opacity="0.3" />
          </svg>

          {/* Title underline decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/50 to-transparent" />
        </div>
      )}

      {/* Content area */}
      <div className="relative p-6">
        {children}
      </div>

      {/* Hover effect */}
      <div 
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${colors.glow} 0%, transparent 70%)`
        }}
      />
    </div>
  );
}
