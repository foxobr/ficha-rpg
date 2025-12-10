import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface MentalStateFilterProps {
  sanity: number;
  stress: number;
  exhaustion: number;
  children: React.ReactNode;
}

export function MentalStateFilter({ sanity, stress, exhaustion, children }: MentalStateFilterProps) {
  const [mentalBreakdown, setMentalBreakdown] = useState(false);
  const [panicAttack, setPanicAttack] = useState(false);
  const [deliriumActive, setDeliriumActive] = useState(false);

  useEffect(() => {
    // Mental Breakdown - quando sanidade está muito baixa
    if (sanity < 30) {
      const breakdownChance = Math.random() < 0.1;
      if (breakdownChance && !mentalBreakdown) {
        setMentalBreakdown(true);
        setTimeout(() => setMentalBreakdown(false), 5000);
      }
    }

    // Panic Attack - durante alto stress
    if (stress > 80) {
      const panicChance = Math.random() < 0.15;
      if (panicChance && !panicAttack) {
        setPanicAttack(true);
        setTimeout(() => setPanicAttack(false), 3000);
      }
    }

    // Delirium - com alta exaustão
    if (exhaustion > 85) {
      setDeliriumActive(true);
    } else {
      setDeliriumActive(false);
    }
  }, [sanity, stress, exhaustion, mentalBreakdown, panicAttack]);

  const getSanityFilter = () => {
    if (sanity > 70) return 'none';
    if (sanity > 50) return 'contrast(0.95) brightness(0.98)';
    if (sanity > 30) return 'contrast(0.9) brightness(0.95) saturate(0.8)';
    return 'contrast(0.8) brightness(0.85) saturate(0.6) hue-rotate(15deg)';
  };

  const getStressEffects = () => {
    if (stress < 50) return {};
    
    return {
      filter: `blur(${(stress - 50) * 0.02}px) brightness(${1 + (stress - 50) * 0.005})`,
      transform: panicAttack ? 'scale(1.02) rotate(0.5deg)' : 'none',
    };
  };

  const getExhaustionEffects = () => {
    if (exhaustion < 60) return {};
    
    const fade = (exhaustion - 60) / 40;
    return {
      opacity: 1 - (fade * 0.3),
      filter: `brightness(${1 - fade * 0.4}) contrast(${1 - fade * 0.2})`,
    };
  };

  return (
    <div className="relative">
      {/* Mental Breakdown Effect */}
      {mentalBreakdown && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 bg-[#8B0000]/20"
              animate={{
                clipPath: [
                  `polygon(${Math.random() * 100}% 0%, 100% 0%, 100% 100%, 0% 100%)`,
                  `polygon(${Math.random() * 100}% 0%, 100% ${Math.random() * 100}%, ${Math.random() * 100}% 100%, 0% ${Math.random() * 100}%)`,
                  `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
                ],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Panic Attack Shaking */}
      <motion.div
        animate={{
          x: panicAttack ? [0, -1, 1, -1, 1, 0] : 0,
          y: panicAttack ? [0, -1, 1, -1, 1, 0] : 0,
        }}
        transition={{
          duration: 0.1,
          repeat: panicAttack ? Infinity : 0,
        }}
      >
        {/* Delirium Hallucinations */}
        <motion.div
          className="relative"
          style={{
            ...getSanityFilter() !== 'none' ? { filter: getSanityFilter() } : {},
            ...getStressEffects(),
            ...getExhaustionEffects(),
          }}
        >
          {children}
          
          {/* Delirium Phantoms */}
          {deliriumActive && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-8 h-8 border border-[#2E0B3D]/30 rounded-full"
                  animate={{
                    x: [
                      Math.random() * window.innerWidth,
                      Math.random() * window.innerWidth,
                      Math.random() * window.innerWidth,
                    ],
                    y: [
                      Math.random() * window.innerHeight,
                      Math.random() * window.innerHeight,
                      Math.random() * window.innerHeight,
                    ],
                    opacity: [0, 0.4, 0],
                    scale: [0.5, 1.5, 0.5],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Stress Vignette */}
      {stress > 60 && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: `radial-gradient(circle at center, transparent ${100 - (stress - 60)}%, rgba(139, 0, 0, ${(stress - 60) * 0.005}) 100%)`,
          }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Exhaustion Overlay */}
      {exhaustion > 70 && (
        <motion.div
          className="absolute inset-0 pointer-events-none bg-[#0A0A0A]/20"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />
      )}

      {/* False Interface Elements (Paranoia) */}
      {sanity < 40 && Math.random() < 0.05 && (
        <motion.div
          className="absolute top-4 right-4 bg-[#8B0000]/80 text-white px-2 py-1 rounded font-source-code text-xs z-40"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onAnimationComplete={() => {
            setTimeout(() => {
              // Remove after showing
            }, 2000);
          }}
        >
          ALERTA: VIOLAÇÃO DE SISTEMA
        </motion.div>
      )}
    </div>
  );
}