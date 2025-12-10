interface OrnamentalBorderProps {
  children: React.ReactNode;
  variant?: 'default' | 'header' | 'section' | 'attribute';
  className?: string;
}

export function OrnamentalBorder({ children, variant = 'default', className = '' }: OrnamentalBorderProps) {
  const getBorderStyle = () => {
    switch (variant) {
      case 'header':
        return 'border-[3px] border-[#D4A574] rounded-none relative before:content-[""] before:absolute before:top-[-6px] before:left-[-6px] before:right-[-6px] before:bottom-[-6px] before:border-[1px] before:border-[#ff6b35]/30 before:rounded-none after:content-[""] after:absolute after:top-[10px] after:left-[10px] after:right-[10px] after:bottom-[10px] after:border-[1px] after:border-[#00FF41]/20';
      case 'section':
        return 'border-[2px] border-[#ff6b35] relative before:content-[""] before:absolute before:top-[-4px] before:left-[-4px] before:right-[-4px] before:bottom-[-4px] before:border-[1px] before:border-[#D4A574]/40';
      case 'attribute':
        return 'border-[2px] border-[#D4A574] relative after:content-[""] after:absolute after:inset-0 after:border-[1px] after:border-[#00FF41]/30 after:m-[4px]';
      default:
        return 'border-[2px] border-[#ff6b35]';
    }
  };

  return (
    <div className={`${getBorderStyle()} bg-gradient-to-br from-black/90 to-[#1a1a1a]/90 backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
}
