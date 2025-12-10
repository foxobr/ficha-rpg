import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Crosshair, AlertTriangle, Gem } from 'lucide-react';

interface MapLocation {
  id: string;
  name: string;
  type: 'settlement' | 'ruins' | 'danger' | 'resource';
  x: number;
  y: number;
  discovered: boolean;
  threat_level?: 'low' | 'medium' | 'high' | 'extreme';
}

interface TeracekMapProps {
  currentPosition: { x: number; y: number };
  locations: MapLocation[];
  selectedLocation?: string;
  onLocationSelect?: (locationId: string) => void;
}

const locationIcons = {
  settlement: MapPin,
  ruins: AlertTriangle,
  danger: Crosshair,
  resource: Gem
};

const locationColors = {
  settlement: 'text-[#00FF41]',
  ruins: 'text-[#D4A574]',
  danger: 'text-[#8B0000]',
  resource: 'text-[#FF4500]'
};

const threatColors = {
  low: 'bg-[#00FF41]',
  medium: 'bg-[#D4A574]',
  high: 'bg-[#FF4500]',
  extreme: 'bg-[#8B0000]'
};

export function TeracekMap({ currentPosition, locations, selectedLocation, onLocationSelect }: TeracekMapProps) {
  return (
    <Card className="bg-card/90 backdrop-blur-sm border-border sand-texture">
      <CardHeader>
        <CardTitle className="font-orbitron text-[#D4A574] flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          MAPA HOLOGRÁFICO - TERACEK
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-square bg-[#1C3A3A]/30 rounded border border-[#D4A574]/30 overflow-hidden">
          {/* Grid de fundo */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(212, 165, 116, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(212, 165, 116, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }} />
          </div>

          {/* Posição atual */}
          <div 
            className="absolute w-3 h-3 bg-[#00FF41] rounded-full pulse-energy border-2 border-[#0A0A0A] z-20"
            style={{
              left: `${currentPosition.x}%`,
              top: `${currentPosition.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          />

          {/* Círculo de alcance atual */}
          <div 
            className="absolute w-16 h-16 border border-[#00FF41]/30 rounded-full z-10"
            style={{
              left: `${currentPosition.x}%`,
              top: `${currentPosition.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          />

          {/* Localizações */}
          {locations.map((location) => {
            const Icon = locationIcons[location.type];
            const isSelected = selectedLocation === location.id;
            
            return (
              <div
                key={location.id}
                className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-15 ${
                  !location.discovered ? 'opacity-50' : ''
                }`}
                style={{
                  left: `${location.x}%`,
                  top: `${location.y}%`
                }}
                onClick={() => onLocationSelect?.(location.id)}
              >
                <div className={`
                  p-2 rounded-full border-2 transition-all duration-200
                  ${isSelected 
                    ? 'bg-[#00FF41]/20 border-[#00FF41] scale-125' 
                    : 'bg-card/80 border-border hover:border-[#D4A574]'
                  }
                `}>
                  <Icon className={`h-4 w-4 ${locationColors[location.type]}`} />
                </div>
                
                {location.discovered && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
                    <div className="bg-card/95 backdrop-blur-sm border border-border rounded px-2 py-1">
                      <div className="font-source-code text-xs text-foreground text-center">
                        {location.name}
                      </div>
                      {location.threat_level && (
                        <div className="flex justify-center mt-1">
                          <Badge 
                            variant="secondary" 
                            className={`${threatColors[location.threat_level]} text-white text-xs px-1 py-0`}
                          >
                            {location.threat_level.toUpperCase()}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Overlay de scan */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF41]/5 to-transparent animate-pulse" />
            </div>
          </div>
        </div>

        {/* Legenda */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#00FF41]" />
            <span className="font-source-code text-xs text-muted-foreground">Assentamentos</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-[#D4A574]" />
            <span className="font-source-code text-xs text-muted-foreground">Ruínas</span>
          </div>
          <div className="flex items-center gap-2">
            <Crosshair className="h-4 w-4 text-[#8B0000]" />
            <span className="font-source-code text-xs text-muted-foreground">Zonas de Perigo</span>
          </div>
          <div className="flex items-center gap-2">
            <Gem className="h-4 w-4 text-[#FF4500]" />
            <span className="font-source-code text-xs text-muted-foreground">Recursos</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}