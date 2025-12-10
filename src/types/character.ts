export interface Character {
  characterName: string;
  playerName: string;
  level: number;
  background: string;
  strength: number;
  agility: number;
  intelligence: number;
  charisma: number;
  vigor: number;
  characterClass: string;
  va: number;
  weapons: string;
  armor: string;
  items: string;
  skills: string[];
  activeConditions: string[];
  combatLog: CombatLogEntry[];
  resources: Resources;
  timestamp?: string;
  backupTimestamp?: string;
}

export interface CombatLogEntry {
  action: string;
  timestamp: string;
}

export interface Resources {
  energy: number;
  maxEnergy: number;
  ammo: number;
  food: number;
  water: number;
}

export interface ClassData {
  skills: string[];
  additionalPoints: number;
}

export interface Condition {
  icon: string;
  color: string;
}

export const CLASSES: Record<string, ClassData> = {
  'Explorador do Deserto': {
    skills: ['Rastreamento', 'Orientação por Estrelas', 'Construção de Abrigos'],
    additionalPoints: 3
  },
  'Mercenário de Elite': {
    skills: ['Lâminas Longas', 'Rifles', 'Combate com Escudos'],
    additionalPoints: 1
  },
  'Cientista': {
    skills: ['Ciências Naturais', 'Línguas Antigas', 'Farmacologia'],
    additionalPoints: 3
  },
  'Diplomata Astuto': {
    skills: ['Persuasão', 'Diplomacia', 'Enganação'],
    additionalPoints: 3
  },
  'Infiltrador Sombrio': {
    skills: ['Furtividade', 'Disfarce', 'Arrombamento'],
    additionalPoints: 2
  },
  'Médico de Campo': {
    skills: ['Primeiros Socorros', 'Cirurgia', 'Diagnóstico'],
    additionalPoints: 2
  },
  'Piloto Espacial': {
    skills: ['Pilotagem de Naves Espaciais', 'Manobras de Evasão', 'Corridas de Alta Velocidade'],
    additionalPoints: 2
  }
};

export const CONDITIONS: Record<string, Condition> = {
  'Envenenado': { icon: '☠️', color: '#8B0000' },
  'Queimado': { icon: '🔥', color: '#FF4500' },
  'Congelado': { icon: '❄️', color: '#00CED1' },
  'Paralizado': { icon: '⚡', color: '#FFD700' },
  'Cego': { icon: '🙈', color: '#696969' },
  'Surdo': { icon: '👂', color: '#4169E1' },
  'Assustado': { icon: '👻', color: '#9932CC' },
  'Sangrando': { icon: '🩸', color: '#DC143C' },
  'Fraco': { icon: '😰', color: '#FF69B4' },
  'Atordoado': { icon: '💫', color: '#FF8C00' }
};
