import { Satellite, MapPin, Radio, Settings, Menu, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface HudHeaderProps {
  location: string;
  coordinates: string;
  timeOfDay: string;
  weatherCondition: string;
  communicationStatus: 'online' | 'offline' | 'unstable';
  emergencyAlerts: number;
}

export function HudHeader({ 
  location, 
  coordinates, 
  timeOfDay, 
  weatherCondition, 
  communicationStatus, 
  emergencyAlerts 
}: HudHeaderProps) {
  const getCommStatusColor = () => {
    switch (communicationStatus) {
      case 'online': return 'text-[#00FF41]';
      case 'offline': return 'text-[#8B0000]';
      case 'unstable': return 'text-[#FF4500]';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-border metal-grid">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Título */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <Satellite className="h-6 w-6 text-[#00FF41] pulse-energy" />
              <div>
                <h1 className="font-orbitron text-xl text-foreground">ASTRID INTERFACE</h1>
                <p className="font-source-code text-xs text-muted-foreground">v2.1.7 - SISTEMA OPERACIONAL</p>
              </div>
            </div>
          </div>

          {/* Informações Centrais */}
          <div className="hidden md:flex items-center gap-8">
            <div className="text-center">
              <div className="flex items-center gap-2 justify-center">
                <MapPin className="h-4 w-4 text-[#D4A574]" />
                <span className="font-source-code text-sm text-foreground">{location}</span>
              </div>
              <span className="font-source-code text-xs text-muted-foreground">{coordinates}</span>
            </div>
            
            <div className="text-center">
              <div className="font-source-code text-sm text-foreground">{timeOfDay}</div>
              <span className="font-source-code text-xs text-muted-foreground">{weatherCondition}</span>
            </div>
            
            <div className="text-center">
              <div className="flex items-center gap-2 justify-center">
                <Radio className={`h-4 w-4 ${getCommStatusColor()}`} />
                <span className={`font-source-code text-sm ${getCommStatusColor()}`}>
                  {communicationStatus.toUpperCase()}
                </span>
              </div>
              <span className="font-source-code text-xs text-muted-foreground">COMMS</span>
            </div>
          </div>

          {/* Controles e Alertas */}
          <div className="flex items-center gap-3">
            {emergencyAlerts > 0 && (
              <Badge variant="destructive" className="font-source-code pulse-energy">
                <AlertCircle className="h-3 w-3 mr-1" />
                {emergencyAlerts}
              </Badge>
            )}
            
            <Button variant="ghost" size="icon" className="hover:bg-[#36454F]">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}