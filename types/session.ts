import { Character } from './character';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'player' | 'admin';
  sessionId?: string;
}

export interface Session {
  id: string;
  name: string;
  adminId: string;
  createdAt: string;
  players: SessionPlayer[];
}

export interface SessionPlayer {
  userId: string;
  userName: string;
  character: Character;
  isOnline: boolean;
  lastActive: string;
}

export interface LevelUpRequest {
  characterId: string;
  newLevel: number;
  selectedSkill: string;
  timestamp: string;
  approved: boolean;
}
