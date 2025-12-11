import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Brain, Sparkles, RotateCcw, Lock, Unlock } from 'lucide-react';
import { motion } from 'motion/react';

interface MemoryFragment {
  id: string;
  title: string;
  description: string;
  completionPercentage: number;
  type: 'combat' | 'technical' | 'social' | 'survival';
  unlocked: boolean;
  cycleRequired?: number;
}

interface MemoryFragmentsProps {
  fragments: MemoryFragment[];
  currentCycle: number;
  totalMemoryLoad: number;
}

const typeColors = {
  combat: 'text-[#8B0000] bg-[#8B0000]/20',
  technical: 'text-[#00FF41] bg-[#00FF41]/20', 
  social: 'text-[#D4A574] bg-[#D4A574]/20',
  survival: 'text-[#FF4500] bg-[#FF4500]/20'
};

const typeIcons = {
  combat: '⚔️',
  technical: '🔧',
  social: '🤝',
  survival: '🏜️'
};

export function MemoryFragments({ fragments, currentCycle, totalMemoryLoad }: MemoryFragmentsProps) {
  const unlockedFragments = fragments.filter(f => f.unlocked);
  const lockedFragments = fragments.filter(f => !f.unlocked);

  return (
    <Card className="bg-card/90 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle className="font-orbitron text-[#2E0B3D] flex items-center gap-2">
          <Brain className="h-5 w-5" />
          FRAGMENTOS DE MEMÓRIA
        </CardTitle>
        <div className="flex items-center justify-between">
          <span className="font-source-code text-sm text-muted-foreground">
            Ciclo Atual: {currentCycle}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-source-code text-xs text-muted-foreground">Carga Total:</span>
            <Progress 
              value={totalMemoryLoad} 
              className="w-24 h-2 bg-[#1C3A3A] [&>div]:bg-gradient-to-r [&>div]:from-[#2E0B3D] [&>div]:to-[#00FF41]" 
            />
            <span className="font-source-code text-xs text-[#2E0B3D]">{totalMemoryLoad}%</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 max-h-80 overflow-y-auto">
        {/* Fragmentos Desbloqueados */}
        <div className="space-y-3">
          <h4 className="font-source-code text-sm text-[#00FF41] flex items-center gap-2">
            <Unlock className="h-4 w-4" />
            MEMÓRIAS ATIVAS ({unlockedFragments.length})
          </h4>
          
          {unlockedFragments.map((fragment, index) => (
            <motion.div
              key={fragment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#36454F]/50 border border-[#2E0B3D]/30 rounded p-3 space-y-2"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{typeIcons[fragment.type]}</span>
                    <h5 className="font-source-code text-sm text-foreground">{fragment.title}</h5>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{fragment.description}</p>
                </div>
                <Badge variant="secondary" className={typeColors[fragment.type]}>
                  {fragment.type.toUpperCase()}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-source-code text-xs text-muted-foreground">INTEGRIDADE</span>
                  <span className="font-source-code text-xs text-[#00FF41]">
                    {fragment.completionPercentage}%
                  </span>
                </div>
                <Progress 
                  value={fragment.completionPercentage} 
                  className="h-1 bg-[#1C3A3A] [&>div]:bg-[#00FF41]" 
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fragmentos Bloqueados */}
        {lockedFragments.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-source-code text-sm text-[#8B0000] flex items-center gap-2">
              <Lock className="h-4 w-4" />
              MEMÓRIAS FRAGMENTADAS ({lockedFragments.length})
            </h4>
            
            {lockedFragments.map((fragment, index) => (
              <div
                key={fragment.id}
                className="bg-[#8B0000]/10 border border-[#8B0000]/30 rounded p-3 space-y-2 opacity-75"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg opacity-50">{typeIcons[fragment.type]}</span>
                      <h5 className="font-source-code text-sm text-muted-foreground">???</h5>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Fragmento corrompido - requer regeneração</p>
                  </div>
                  {fragment.cycleRequired && (
                    <div className="flex items-center gap-1">
                      <RotateCcw className="h-3 w-3 text-[#8B0000]" />
                      <span className="font-source-code text-xs text-[#8B0000]">
                        Ciclo {fragment.cycleRequired}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-source-code text-xs text-muted-foreground">CORRUPÇÃO</span>
                    <span className="font-source-code text-xs text-[#8B0000]">
                      {100 - fragment.completionPercentage}%
                    </span>
                  </div>
                  <Progress 
                    value={100 - fragment.completionPercentage} 
                    className="h-1 bg-[#1C3A3A] [&>div]:bg-[#8B0000]" 
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Partículas flutuantes para efeito */}
        <div className="relative">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#2E0B3D] rounded-full"
              animate={{
                y: [-10, -30, -10],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: '50%'
              }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}