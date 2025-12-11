import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';
import { Progress } from './ui/progress';
import { Skull, Flame, Zap, AlertTriangle } from 'lucide-react';

interface Condition {
  type: 'bleeding' | 'burning' | 'electrified' | 'stunned';
  duration: number;
}

interface CharacterCardProps {
  name: string;
  avatar?: string;
  level: number;
  experience: number;
  maxExperience: number;
  health: number;
  maxHealth: number;
  conditions: Condition[];
  cycles: number;
}

const conditionIcons = {
  bleeding: <Skull className="h-3 w-3" />,
  burning: <Flame className="h-3 w-3" />,
  electrified: <Zap className="h-3 w-3" />,
  stunned: <AlertTriangle className="h-3 w-3" />
};

const conditionColors = {
  bleeding: 'bg-[#8B0000] text-white',
  burning: 'bg-[#FF4500] text-white',
  electrified: 'bg-[#00FF41] text-black',
  stunned: 'bg-[#D4A574] text-black'
};

export function CharacterCard({ 
  name, 
  avatar, 
  level, 
  experience, 
  maxExperience, 
  health, 
  maxHealth, 
  conditions, 
  cycles 
}: CharacterCardProps) {
  return (
    <Card className="bg-card/90 backdrop-blur-sm border-border glow-blue hover:glow-green transition-all duration-300 transform hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 ring-2 ring-[#00FF41]/50">
            <AvatarImage src={avatar} />
            <AvatarFallback className="bg-[#36454F] text-[#00FF41] font-orbitron">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-orbitron text-lg text-foreground">{name}</h3>
            <div className="flex items-center gap-2">
              <span className="font-source-code text-sm text-[#D4A574]">NÍVEL {level}</span>
              <span className="font-source-code text-xs text-muted-foreground">• CICLOS: {cycles}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Experiência */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-source-code text-xs text-muted-foreground">EXPERIÊNCIA</span>
            <span className="font-source-code text-xs text-[#00FF41]">
              {experience}/{maxExperience} XP
            </span>
          </div>
          <Progress 
            value={(experience / maxExperience) * 100} 
            className="h-2 bg-[#1C3A3A] [&>div]:bg-gradient-to-r [&>div]:from-[#00FF41] [&>div]:to-[#D4A574]"
          />
        </div>

        {/* Saúde */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-source-code text-xs text-muted-foreground">PONTOS DE VIDA</span>
            <span className="font-source-code text-xs text-[#8B0000]">
              {health}/{maxHealth} PV
            </span>
          </div>
          <Progress 
            value={(health / maxHealth) * 100} 
            className="h-2 bg-[#1C3A3A] [&>div]:bg-[#8B0000]"
          />
        </div>

        {/* Condições */}
        {conditions.length > 0 && (
          <div className="space-y-2">
            <span className="font-source-code text-xs text-muted-foreground">CONDIÇÕES ATIVAS</span>
            <div className="flex flex-wrap gap-1">
              {conditions.map((condition, index) => (
                <Badge 
                  key={index}
                  variant="secondary" 
                  className={`${conditionColors[condition.type]} font-source-code text-xs ${
                    condition.type === 'bleeding' ? 'pulse-energy' : ''
                  } ${
                    condition.type === 'electrified' ? 'glitch-effect' : ''
                  }`}
                >
                  {conditionIcons[condition.type]}
                  <span className="ml-1">{condition.duration}t</span>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}