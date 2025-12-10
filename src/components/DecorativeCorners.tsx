interface DecoративeCornersProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function DecorativeCorners({ size = 'md', color = '#D4A574' }: DecoративeCornersProps) {
  const getSize = () => {
    switch (size) {
      case 'sm': return 20;
      case 'md': return 30;
      case 'lg': return 40;
    }
  };

  const s = getSize();

  return (
    <>
      {/* Top Left */}
      <svg 
        className="absolute top-[-2px] left-[-2px] pointer-events-none" 
        width={s} 
        height={s}
        style={{ filter: 'drop-shadow(0 0 3px currentColor)' }}
      >
        <path 
          d={`M 0 ${s/2} Q 0 0 ${s/2} 0 L ${s} 0 M 0 ${s/2} L 0 ${s}`}
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
        <circle cx={s/4} cy={s/4} r="2" fill={color} />
      </svg>

      {/* Top Right */}
      <svg 
        className="absolute top-[-2px] right-[-2px] pointer-events-none" 
        width={s} 
        height={s}
        style={{ filter: 'drop-shadow(0 0 3px currentColor)' }}
      >
        <path 
          d={`M ${s} ${s/2} Q ${s} 0 ${s/2} 0 L 0 0 M ${s} ${s/2} L ${s} ${s}`}
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
        <circle cx={s*3/4} cy={s/4} r="2" fill={color} />
      </svg>

      {/* Bottom Left */}
      <svg 
        className="absolute bottom-[-2px] left-[-2px] pointer-events-none" 
        width={s} 
        height={s}
        style={{ filter: 'drop-shadow(0 0 3px currentColor)' }}
      >
        <path 
          d={`M 0 ${s/2} Q 0 ${s} ${s/2} ${s} L ${s} ${s} M 0 ${s/2} L 0 0`}
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
        <circle cx={s/4} cy={s*3/4} r="2" fill={color} />
      </svg>

      {/* Bottom Right */}
      <svg 
        className="absolute bottom-[-2px] right-[-2px] pointer-events-none" 
        width={s} 
        height={s}
        style={{ filter: 'drop-shadow(0 0 3px currentColor)' }}
      >
        <path 
          d={`M ${s} ${s/2} Q ${s} ${s} ${s/2} ${s} L 0 ${s} M ${s} ${s/2} L ${s} 0`}
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
        <circle cx={s*3/4} cy={s*3/4} r="2" fill={color} />
      </svg>
    </>
  );
}
