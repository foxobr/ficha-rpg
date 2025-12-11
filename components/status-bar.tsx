import { Battery, Shield, Zap, Heart, Brain, Sword } from 'lucide-react';
import { Progress } from './ui/progress';

interface StatusBarProps {
  energy: number;
  fatigue: number;
  health: number;
  memory: number;
  weaponDurability: number;
}

export function StatusBar({ energy, fatigue, health, memory, weaponDurability }: StatusBarProps) {
  return (
    <div className="bg-card/80 backdrop-blur-sm border border-border rounded p-4 metal-grid">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Energia */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#00FF41]" />
            <span className="font-source-code text-sm text-muted-foreground">ENERGIA</span>
          </div>
          <div className="space-y-1">
            <Progress 
              value={energy} 
              className="h-2 bg-[#1C3A3A] [&>div]:bg-[#00FF41] glow-green" 
            />
            <span className="font-source-code text-xs text-[#00FF41]">{energy}/100 PE</span>
          </div>
        </div>

        {/* Fadiga */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-[#8B0000]" />
            <span className="font-source-code text-sm text-muted-foreground">FADIGA</span>
          </div>
          <div className="space-y-1">
            <Progress 
              value={100 - fatigue} 
              className="h-2 bg-[#1C3A3A] [&>div]:bg-[#8B0000]" 
            />
            <span className="font-source-code text-xs text-[#8B0000]">{fatigue}/100 PF</span>
          </div>
        </div>

        {/* Saúde */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#D4A574]" />
            <span className="font-source-code text-sm text-muted-foreground">SAÚDE</span>
          </div>
          <div className="space-y-1">
            <Progress 
              value={health} 
              className="h-2 bg-[#1C3A3A] [&>div]:bg-[#D4A574]" 
            />
            <span className="font-source-code text-xs text-[#D4A574]">{health}/100</span>
          </div>
        </div>

        {/* Memória */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-[#2E0B3D]" />
            <span className="font-source-code text-sm text-muted-foreground">MEMÓRIA</span>
          </div>
          <div className="space-y-1">
            <div className="relative h-2 bg-[#1C3A3A] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#2E0B3D] to-[#00FF41] transition-all duration-300"
                style={{ width: `${memory}%` }}
              />
            </div>
            <span className="font-source-code text-xs text-[#2E0B3D]">{memory}% CARGA</span>
          </div>
        </div>

        {/* Arma */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sword className="h-4 w-4 text-[#FF4500]" />
            <span className="font-source-code text-sm text-muted-foreground">ARMA</span>
          </div>
          <div className="space-y-1">
            <Progress 
              value={weaponDurability} 
              className="h-2 bg-[#1C3A3A] [&>div]:bg-[#FF4500] glow-orange" 
            />
            <span className="font-source-code text-xs text-[#FF4500]">{weaponDurability}% DURABILIDADE</span>
          </div>
        </div>
      </div>
    </div>
  );
}