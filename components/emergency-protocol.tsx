import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Skull, Zap, Flame, Shield } from 'lucide-react';
import { Badge } from './ui/badge';

interface EmergencyProtocolProps {
  criticalHealth: boolean;
  combatActive: boolean;
  systemFailure: boolean;
  environmentalHazard: 'none' | 'radiation' | 'sandstorm' | 'toxic' | 'extreme_heat';
  children: React.ReactNode;
}

const hazardEffects = {
  none: { filter: 'none', overlay: 'transparent' },
  radiation: { 
    filter: 'hue-rotate(90deg) contrast(1.2)',
    overlay: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 255, 65, 0.1) 2px, rgba(0, 255, 65, 0.1) 4px)'
  },
  sandstorm: { 
    filter: 'sepia(0.3) contrast(0.8)',
    overlay: 'radial-gradient(circle at 30% 70%, rgba(212, 165, 116, 0.2) 0%, transparent 50%)'
  },
  toxic: { 
    filter: 'hue-rotate(270deg) saturate(1.3)',
    overlay: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(46, 11, 61, 0.1) 8px, rgba(46, 11, 61, 0.1) 12px)'
  },
  extreme_heat: { 
    filter: 'hue-rotate(15deg) brightness(1.1)',
    overlay: 'linear-gradient(0deg, rgba(255, 69, 0, 0.1) 0%, transparent 100%)'
  }
};

const hazardIcons = {
  none: null,
  radiation: <Zap className="h-4 w-4" />,
  sandstorm: <AlertTriangle className="h-4 w-4" />,
  toxic: <Skull className="h-4 w-4" />,
  extreme_heat: <Flame className="h-4 w-4" />
};

export function EmergencyProtocol({ 
  criticalHealth, 
  combatActive, 
  systemFailure, 
  environmentalHazard,
  children 
}: EmergencyProtocolProps) {
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [countdownActive, setCountdownActive] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const isEmergency = criticalHealth || systemFailure || combatActive;
    setEmergencyMode(isEmergency);

    if (criticalHealth && !countdownActive) {
      setCountdownActive(true);
      setCountdown(30); // 30 segundos para estabilizar
      
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setCountdownActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [criticalHealth, systemFailure, combatActive, countdownActive]);

  return (
    <div className="relative">
      {/* Emergency Warning Overlay */}
      {emergencyMode && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-40"
          animate={{
            boxShadow: [
              'inset 0 0 0 2px rgba(139, 0, 0, 0)',
              'inset 0 0 0 2px rgba(139, 0, 0, 0.8)',
              'inset 0 0 0 2px rgba(139, 0, 0, 0)',
            ],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />
      )}

      {/* Critical Health Countdown */}
      {countdownActive && (
        <motion.div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <div className="bg-[#8B0000]/90 backdrop-blur-sm border-2 border-[#FF4500] rounded-lg p-6 text-center">
            <h2 className="font-orbitron text-2xl text-white mb-2">PROTOCOLO DE EMERGÊNCIA</h2>
            <div className="font-source-code text-6xl text-[#FF4500] mb-2">
              {countdown.toString().padStart(2, '0')}
            </div>
            <p className="font-source-code text-sm text-white">ESTABILIZAÇÃO REQUERIDA</p>
          </div>
        </motion.div>
      )}

      {/* Environmental Hazard Effects */}
      <motion.div
        className="relative"
        style={{
          filter: hazardEffects[environmentalHazard].filter,
        }}
      >
        {/* Environmental Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: hazardEffects[environmentalHazard].overlay,
          }}
        />

        {/* Combat Mode Interface */}
        {combatActive && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-30"
            animate={{
              background: [
                'linear-gradient(90deg, rgba(255, 69, 0, 0) 0%, rgba(255, 69, 0, 0.1) 50%, rgba(255, 69, 0, 0) 100%)',
                'linear-gradient(90deg, rgba(255, 69, 0, 0.1) 0%, rgba(255, 69, 0, 0) 50%, rgba(255, 69, 0, 0.1) 100%)',
              ],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        )}

        {/* System Failure Glitch */}
        {systemFailure && (
          <motion.div
            className="relative"
            animate={{
              filter: [
                'none',
                'invert(1) hue-rotate(180deg)',
                'none',
              ],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            {children}
          </motion.div>
        )}

        {!systemFailure && children}
      </motion.div>

      {/* Environmental Hazard Indicator */}
      {environmentalHazard !== 'none' && (
        <motion.div
          className="absolute top-4 left-4 z-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge variant="destructive" className="font-source-code text-xs pulse-energy">
            {hazardIcons[environmentalHazard]}
            <span className="ml-2">{environmentalHazard.toUpperCase().replace('_', ' ')}</span>
          </Badge>
        </motion.div>
      )}

      {/* Emergency Status Bar */}
      {emergencyMode && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-[#8B0000]/90 backdrop-blur-sm border-t border-[#FF4500] p-2 z-40"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#FF4500]" />
              <span className="font-orbitron text-sm text-white">PROTOCOLO DE EMERGÊNCIA ATIVO</span>
            </div>
            <div className="flex gap-2">
              {criticalHealth && (
                <Badge variant="destructive" className="font-source-code text-xs">
                  SAÚDE CRÍTICA
                </Badge>
              )}
              {combatActive && (
                <Badge className="bg-[#FF4500] text-white font-source-code text-xs">
                  COMBATE
                </Badge>
              )}
              {systemFailure && (
                <Badge variant="destructive" className="font-source-code text-xs">
                  FALHA DO SISTEMA
                </Badge>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Static/Interference Effect for System Failure */}
      {systemFailure && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-0.5 bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
                scaleX: [0, 1, 0],
              }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                delay: Math.random() * 0.5,
                repeatDelay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}