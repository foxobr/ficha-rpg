import { useState, useEffect } from 'react';
import { Character } from '../types/character';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { BasicInfo } from './BasicInfo';
import { Attributes } from './Attributes';
import { ClassSelection } from './ClassSelection';
import { Stats } from './Stats';
import { Equipment } from './Equipment';
import { TrainedSkills } from './TrainedSkills';
import { DiceRoller } from './DiceRoller';
import { SkillTest } from './SkillTest';
import { DamageCalculator } from './DamageCalculator';
import { Resources } from './Resources';
import { Conditions } from './Conditions';
import { CombatLog } from './CombatLog';
import { NPCGenerator } from './NPCGenerator';
import { LevelUp } from './LevelUp';
import { StatusBar } from './StatusBar';
import { OrnamentalHeader } from './OrnamentalHeader';
import { OrnamentalCard } from './OrnamentalCard';
import { LogIn, Save, User } from 'lucide-react';

interface PlayerViewProps {
  userId: string;
  userName: string;
  accessToken: string;
  onLogout: () => void;
}

export function PlayerView({ userId, userName, accessToken, onLogout }: PlayerViewProps) {
  const [sessionId, setSessionId] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [character, setCharacter] = useState<Character>({
    id: '',
    characterName: '',
    playerName: userName,
    level: 1,
    experiencePoints: 0,
    maxHP: 10,
    currentHP: 10,
    background: '',
    strength: 0,
    agility: 0,
    intelligence: 0,
    charisma: 0,
    vigor: 0,
    characterClass: '',
    va: 0,
    weapons: '',
    armor: '',
    items: '',
    skills: [],
    trainedSkills: {},
    activeConditions: [],
    combatLog: [],
    resources: {
      energy: 10,
      maxEnergy: 10,
      ammo: 0,
      food: 0,
      water: 0,
    },
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error' | 'warning'>('success');
  const [saving, setSaving] = useState(false);

  const showStatus = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setStatusMessage(message);
    setStatusType(type);
  };

  const updateCharacter = (updates: Partial<Character>) => {
    setCharacter(prev => ({ ...prev, ...updates }));
  };

  const joinSession = async () => {
    if (!sessionId.trim()) {
      showStatus('Digite o ID da sessão', 'error');
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ace937eb/session/${sessionId}/join`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao entrar na sessão');
      }

      setIsJoined(true);
      showStatus('Conectado à sessão!', 'success');
      
      // Tentar carregar personagem existente
      loadCharacter();
    } catch (err: any) {
      showStatus(err.message, 'error');
    }
  };

  const loadCharacter = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ace937eb/character/${sessionId}/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.character) {
        setCharacter(data.character);
      }
    } catch (err) {
      console.error('Error loading character:', err);
    }
  };

  const saveCharacter = async () => {
    setSaving(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ace937eb/character`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            sessionId,
            character,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao salvar personagem');
      }

      showStatus('✅ Personagem salvo!', 'success');
    } catch (err: any) {
      showStatus(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  // Auto-save a cada 30 segundos
  useEffect(() => {
    if (!isJoined) return;
    
    const interval = setInterval(() => {
      saveCharacter();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [isJoined, character]);

  const addCombatLog = (action: string) => {
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    updateCharacter({
      combatLog: [...character.combatLog, { action, timestamp }]
    });
  };

  const handleAddSkills = (skills: string[]) => {
    const uniqueSkills = [...new Set([...character.skills, ...skills])];
    updateCharacter({ skills: uniqueSkills });
  };

  if (!isJoined) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0a00] to-black" />
        
        <div className="relative z-10 w-full max-w-md">
          <OrnamentalCard delay={0}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-[#D4A574] to-[#8B7355] mb-4">
                <User size={40} className="text-black" />
              </div>
              <h1 className="text-3xl mb-2 text-[#D4A574] uppercase tracking-wider">
                Bem-vindo, {userName}!
              </h1>
              <p className="text-[#888] uppercase tracking-widest text-sm">
                Jogador - Sombras do Deserto
              </p>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-[#D4A574] uppercase tracking-wider text-sm">
                ID da Sessão:
              </label>
              <input
                type="text"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                className="w-full p-3 bg-black/60 border-2 border-[#D4A574] text-[#e0e0e0] focus:outline-none focus:border-[#00FF41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all"
                placeholder="Cole o ID da sessão aqui"
              />
              <p className="text-xs text-[#888] mt-2">
                Peça o ID da sessão ao Mestre para entrar
              </p>
            </div>

            <button
              onClick={joinSession}
              className="w-full relative px-6 py-4 bg-gradient-to-r from-[#4CAF50]/80 to-[#66BB6A]/80 text-white uppercase tracking-wider border-2 border-[#4CAF50] transition-all hover:shadow-[0_0_20px_rgba(76,175,80,0.5)] overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <LogIn size={20} />
                Entrar na Sessão
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>

            <div className="mt-6">
              <button
                onClick={onLogout}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#8B0000]/80 to-[#6d0000]/80 text-white uppercase tracking-wider border-2 border-[#8B0000] transition-all hover:shadow-[0_0_20px_rgba(139,0,0,0.5)]"
              >
                Sair
              </button>
            </div>
          </OrnamentalCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-5">
      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Header com botões */}
        <div className="flex items-center justify-between mb-6">
          <OrnamentalHeader 
            title="FICHA DE PERSONAGEM" 
            subtitle={`${userName} - ${character.characterName || 'Novo Personagem'}`}
          />
          <div className="flex gap-3">
            <button
              onClick={saveCharacter}
              disabled={saving}
              className="relative px-6 py-3 bg-gradient-to-r from-[#4CAF50]/80 to-[#66BB6A]/80 text-white uppercase tracking-wider border-2 border-[#4CAF50] transition-all hover:shadow-[0_0_20px_rgba(76,175,80,0.5)] disabled:opacity-50 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Save size={18} />
                {saving ? 'Salvando...' : 'Salvar'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
            <button
              onClick={onLogout}
              className="px-6 py-3 bg-gradient-to-r from-[#8B0000]/80 to-[#6d0000]/80 text-white uppercase tracking-wider border-2 border-[#8B0000] transition-all hover:shadow-[0_0_20px_rgba(139,0,0,0.5)]"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Level Up Component */}
        <div className="mb-8">
          <LevelUp
            character={character}
            onChange={updateCharacter}
            showStatus={showStatus}
          />
        </div>

        <div className="grid grid-cols-2 gap-5 mb-8">
          <BasicInfo character={character} onChange={updateCharacter} />
          <Attributes character={character} onChange={updateCharacter} />
          <ClassSelection
            character={character}
            onChange={updateCharacter}
            onAddSkills={handleAddSkills}
            showStatus={showStatus}
          />
          <Stats character={character} onChange={updateCharacter} />
          <Equipment character={character} onChange={updateCharacter} />
          <TrainedSkills
            character={character}
            onChange={updateCharacter}
            showStatus={showStatus}
          />
          <DiceRoller />
          <SkillTest onAddLog={addCombatLog} />
          <DamageCalculator />
          <Resources character={character} onChange={updateCharacter} />
          <Conditions
            character={character}
            onChange={updateCharacter}
            onAddLog={addCombatLog}
          />
          <NPCGenerator />
          <CombatLog character={character} onChange={updateCharacter} />
        </div>

        {statusMessage && (
          <StatusBar
            message={statusMessage}
            type={statusType}
            onHide={() => setStatusMessage('')}
          />
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .grid-cols-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
