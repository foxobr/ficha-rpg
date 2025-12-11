import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface ShadowInfluenceProps {
  memoryLoad: number;
  stressLevel: number;
  children: React.ReactNode;
}

export function ShadowInfluence({ memoryLoad, stressLevel, children }: ShadowInfluenceProps) {
  const [shadowCreep, setShadowCreep] = useState(0);
  const [realityDistortion, setRealityDistortion] = useState(0);
  const [whisperText, setWhisperText] = useState<string | null>(null);

  const ancientWhispers = [
    "ᚦᛖ ᛊᚺᚨᛞᚮᚹᛊ ᚱᛖᛗᛖᛗᛒᛖᚱ", // "The shadows remember"
    "ᚷᚺᛟᛊᛏᛊ ᛟᚠ ᛏᛖᚱᚨᚳᛖᚲ", // "Ghosts of Teracek"
    "ᛏᚺᛖ ᚳᚤᚳᛚᛖ ᛒᚱᛖᚨᚲᛊ", // "The cycle breaks"
    "ᚹᛖ ᚨᚱᛖ ᛖᚾᛞᛚᛖᛊᛊ", // "We are endless"
    "ᛗᛖᛗᛟᚱᚤ ᛁᛊ ᚨ ᛚᛁᛖ" // "Memory is a lie"
  ];

  useEffect(() => {
    // Shadow Creep - bordas escuras crescem com alta carga de memória
    setShadowCreep(Math.min(memoryLoad * 0.8, 60));
    
    // Reality Distortion - elementos se distorcem com stress
    setRealityDistortion(stressLevel * 0.6);

    // Whisper Text - aparece aleatoriamente durante alta influência
    if (memoryLoad > 80 && Math.random() < 0.1) {
      const randomWhisper = ancientWhispers[Math.floor(Math.random() * ancientWhispers.length)];
      setWhisperText(randomWhisper);
      
      setTimeout(() => {
        setWhisperText(null);
      }, 3000);
    }
  }, [memoryLoad, stressLevel]);

  return (
    <div className="relative">
      {/* Shadow Creep Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-50"
        style={{
          background: `radial-gradient(circle at center, transparent ${100 - shadowCreep}%, rgba(46, 11, 61, 0.4) 100%)`,
        }}
        animate={{
          opacity: shadowCreep > 20 ? 1 : 0,
        }}
        transition={{ duration: 2 }}
      />

      {/* Reality Distortion */}
      <motion.div
        className="relative"
        animate={{
          filter: `hue-rotate(${realityDistortion * 2}deg) contrast(${1 + realityDistortion * 0.01})`,
          transform: `perspective(1000px) rotateX(${realityDistortion * 0.1}deg) rotateY(${Math.sin(Date.now() * 0.001) * realityDistortion * 0.05}deg)`,
        }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>

      {/* Whisper Text */}
      {whisperText && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 1 }}
        >
          <div className="text-[#2E0B3D] font-orbitron text-4xl font-bold text-center">
            <motion.span
              className="inline-block"
              animate={{
                textShadow: [
                  '0 0 5px rgba(46, 11, 61, 0.8)',
                  '0 0 20px rgba(46, 11, 61, 1)',
                  '0 0 5px rgba(46, 11, 61, 0.8)'
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {whisperText}
            </motion.span>
          </div>
        </motion.div>
      )}

      {/* Temporal Echoes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#2E0B3D]/30 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}