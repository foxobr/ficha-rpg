import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface TemporalEchoesProps {
  cycleCount: number;
  memoryFragmentation: number;
  children: React.ReactNode;
}

interface EchoState {
  id: string;
  timestamp: number;
  data: any;
}

export function TemporalEchoes({ cycleCount, memoryFragmentation, children }: TemporalEchoesProps) {
  const [echoes, setEchoes] = useState<EchoState[]>([]);
  const [timelineGlitch, setTimelineGlitch] = useState(false);
  const [ghostingActive, setGhostingActive] = useState(false);

  useEffect(() => {
    // Timeline Glitches - ocorrem baseado na fragmentação da memória
    const glitchInterval = setInterval(() => {
      if (memoryFragmentation > 50 && Math.random() < 0.3) {
        setTimelineGlitch(true);
        setTimeout(() => setTimelineGlitch(false), 1000);
      }
    }, 5000);

    // Ghosting Effect - ativa durante altos níveis de ciclos
    const ghostingInterval = setInterval(() => {
      if (cycleCount > 10 && Math.random() < 0.2) {
        setGhostingActive(true);
        setTimeout(() => setGhostingActive(false), 2000);
      }
    }, 8000);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(ghostingInterval);
    };
  }, [cycleCount, memoryFragmentation]);

  return (
    <div className="relative">
      {/* Ghosting Effect */}
      {ghostingActive && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-30 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          style={{
            filter: 'blur(1px)',
            transform: 'translateX(4px) translateY(-2px)',
            mixBlendMode: 'screen',
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-[#00FF41]/20 to-[#D4A574]/20">
            {children}
          </div>
        </motion.div>
      )}

      {/* Timeline Glitch */}
      <motion.div
        className="relative"
        animate={{
          x: timelineGlitch ? [0, -2, 2, -1, 1, 0] : 0,
          filter: timelineGlitch ? 
            ['hue-rotate(0deg)', 'hue-rotate(180deg)', 'hue-rotate(0deg)'] : 
            'hue-rotate(0deg)',
        }}
        transition={{
          duration: timelineGlitch ? 0.5 : 0,
          repeat: timelineGlitch ? 2 : 0,
        }}
      >
        {children}
      </motion.div>

      {/* Memory Fragment Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(Math.floor(memoryFragmentation / 20))].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-4 bg-gradient-to-t from-[#2E0B3D] to-transparent opacity-60"
            animate={{
              y: ['100%', '-20px'],
              x: [0, Math.sin(Date.now() * 0.002 + i) * 20],
              opacity: [0, 0.6, 0],
              scaleY: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Temporal Distortion Overlay */}
      {cycleCount > 15 && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(46, 11, 61, 0) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, rgba(46, 11, 61, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 20%, rgba(46, 11, 61, 0) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
        />
      )}

      {/* Cycle Resonance Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          boxShadow: cycleCount > 20 ? [
            'inset 0 0 0 1px rgba(46, 11, 61, 0)',
            'inset 0 0 0 1px rgba(46, 11, 61, 0.3)',
            'inset 0 0 0 1px rgba(46, 11, 61, 0)',
          ] : 'inset 0 0 0 1px rgba(46, 11, 61, 0)',
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
    </div>
  );
}