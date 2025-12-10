import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface BiotechInterfaceProps {
  symbioticLevel: number;
  organicIntegration: number;
  evolutionStage: number;
  children: React.ReactNode;
}

export function BiotechInterface({ 
  symbioticLevel, 
  organicIntegration, 
  evolutionStage, 
  children 
}: BiotechInterfaceProps) {
  const [pulseIntensity, setPulseIntensity] = useState(0);
  const [growthActive, setGrowthActive] = useState(false);
  const [breathingRate, setBreathingRate] = useState(3);

  useEffect(() => {
    // Intensidade do pulso baseada na integração orgânica
    setPulseIntensity(organicIntegration / 100);
    
    // Taxa de respiração baseada no nível simbiótico
    setBreathingRate(3 - (symbioticLevel / 50));
    
    // Crescimento ativo baseado no estágio de evolução
    setGrowthActive(evolutionStage > 5);
  }, [symbioticLevel, organicIntegration, evolutionStage]);

  return (
    <div className="relative">
      {/* Bio-Pulse Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          boxShadow: [
            `inset 0 0 0 0px rgba(0, 255, 65, ${pulseIntensity * 0.3})`,
            `inset 0 0 0 2px rgba(0, 255, 65, ${pulseIntensity * 0.6})`,
            `inset 0 0 0 0px rgba(0, 255, 65, ${pulseIntensity * 0.3})`,
          ],
        }}
        transition={{
          duration: breathingRate,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Organic Breathing Effect */}
      <motion.div
        className="relative"
        animate={{
          scale: [1, 1 + (pulseIntensity * 0.005), 1],
        }}
        transition={{
          duration: breathingRate,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>

      {/* Symbiotic Growth Tendrils */}
      {growthActive && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <motion.div
                className="w-1 bg-gradient-to-t from-[#00FF41]/40 to-transparent"
                animate={{
                  height: [0, Math.random() * 60 + 20, 0],
                  opacity: [0, 0.7, 0],
                  rotate: [0, Math.random() * 45 - 22.5],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Organic Circuit Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-20" viewBox="0 0 100 100">
          {[...Array(4)].map((_, i) => (
            <motion.path
              key={i}
              d={`M${Math.random() * 100},${Math.random() * 100} Q${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100}`}
              stroke="url(#bioGradient)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: symbioticLevel / 100 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.5,
              }}
            />
          ))}
          <defs>
            <linearGradient id="bioGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(0, 255, 65, 0.6)" />
              <stop offset="50%" stopColor="rgba(212, 165, 116, 0.4)" />
              <stop offset="100%" stopColor="rgba(0, 255, 65, 0.6)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Decay Progression */}
      {evolutionStage < 3 && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              'linear-gradient(45deg, transparent 98%, rgba(139, 69, 19, 0.2) 100%)',
              'linear-gradient(45deg, transparent 95%, rgba(139, 69, 19, 0.3) 100%)',
              'linear-gradient(45deg, transparent 98%, rgba(139, 69, 19, 0.2) 100%)',
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        />
      )}

      {/* Neural Network Visualization */}
      {organicIntegration > 60 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#00FF41]/40 rounded-full"
              style={{
                left: `${20 + (i % 3) * 30}%`,
                top: `${20 + Math.floor(i / 3) * 25}%`,
              }}
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
          
          {/* Neural Connections */}
          <svg className="w-full h-full opacity-30" viewBox="0 0 100 100">
            {[...Array(6)].map((_, i) => (
              <motion.line
                key={i}
                x1={20 + (i % 3) * 30}
                y1={20 + Math.floor(i / 3) * 25}
                x2={20 + ((i + 1) % 3) * 30}
                y2={20 + Math.floor((i + 1) / 3) * 25}
                stroke="rgba(0, 255, 65, 0.4)"
                strokeWidth="0.5"
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </svg>
        </div>
      )}

      {/* Metabolic Activity Indicators */}
      <div className="absolute bottom-2 right-2 pointer-events-none">
        <motion.div
          className="flex gap-1"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: breathingRate,
            repeat: Infinity,
          }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-[#00FF41]"
              animate={{
                height: [4, 8 + Math.random() * 4, 4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}