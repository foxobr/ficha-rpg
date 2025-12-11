import { useState, useEffect } from 'react';
import { Session, SessionPlayer } from '../types/session';
import { CONDITIONS } from '../types/character';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { OrnamentalCard } from './OrnamentalCard';
import { Shield, Users, Plus, X, AlertCircle, Heart, TrendingUp, Award } from 'lucide-react';

interface AdminPanelProps {
  userId: string;
  accessToken: string;
  onLogout: () => void;
}

export function AdminPanel({ userId, accessToken, onLogout }: AdminPanelProps) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [newSessionName, setNewSessionName] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSessions();
    // Atualizar a cada 5 segundos
    const interval = setInterval(loadSessions, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadSessions = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ace937eb/admin/sessions`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setSessions(data.sessions || []);
      }
    } catch (err) {
      console.error('Error loading sessions:', err);
    }
  };

  const createSession = async () => {
    if (!newSessionName.trim()) {
      setError('Digite um nome para a sessão');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ace937eb/session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ name: newSessionName }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar sessão');
      }

      setNewSessionName('');
      setShowCreateModal(false);
      loadSessions();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadSessionDetails = async (sessionId: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ace937eb/session/${sessionId}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setSelectedSession(data.session);
      }
    } catch (err) {
      console.error('Error loading session:', err);
    }
  };

  const applyCondition = async (player: SessionPlayer, condition: string, action: 'add' | 'remove') => {
    if (!selectedSession) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ace937eb/admin/condition`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            sessionId: selectedSession.id,
            targetUserId: player.userId,
            condition,
            action,
          }),
        }
      );

      if (response.ok) {
        loadSessionDetails(selectedSession.id);
      }
    } catch (err) {
      console.error('Error applying condition:', err);
    }
  };

  return (
    <div className="min-h-screen p-5 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0a00] to-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#D4A574] to-[#8B7355] flex items-center justify-center">
              <Shield size={32} className="text-black" />
            </div>
            <div>
              <h1 className="text-3xl text-[#D4A574] uppercase tracking-wider">
                Painel do Mestre
              </h1>
              <p className="text-[#888] uppercase tracking-widest text-sm">
                Gerenciamento de Sessões
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="px-6 py-3 bg-gradient-to-r from-[#8B0000]/80 to-[#6d0000]/80 text-white uppercase tracking-wider border-2 border-[#8B0000] transition-all hover:shadow-[0_0_20px_rgba(139,0,0,0.5)]"
          >
            Sair
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Sessões */}
          <div className="lg:col-span-1">
            <OrnamentalCard delay={0}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-[#D4A574] uppercase tracking-wider flex items-center gap-2">
                  <Users size={24} />
                  Sessões
                </h2>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="p-2 bg-[#4CAF50]/80 text-white border-2 border-[#4CAF50] hover:shadow-[0_0_15px_rgba(76,175,80,0.5)] transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="space-y-3">
                {sessions.length === 0 ? (
                  <div className="text-center py-8 text-[#666] italic">
                    Nenhuma sessão criada
                  </div>
                ) : (
                  sessions.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => loadSessionDetails(session.id)}
                      className={`w-full text-left p-4 border-2 transition-all ${
                        selectedSession?.id === session.id
                          ? 'border-[#00FF41] bg-[#00FF41]/10'
                          : 'border-[#D4A574] bg-black/40 hover:border-[#D4A574]/80'
                      }`}
                    >
                      <div className="text-[#e0e0e0] uppercase tracking-wider mb-1">
                        {session.name}
                      </div>
                      <div className="text-xs text-[#888]">
                        {session.players.length} jogador(es)
                      </div>
                    </button>
                  ))
                )}
              </div>
            </OrnamentalCard>
          </div>

          {/* Detalhes da Sessão */}
          <div className="lg:col-span-2">
            {selectedSession ? (
              <OrnamentalCard delay={0.1}>
                <h2 className="text-2xl text-[#D4A574] uppercase tracking-wider mb-6">
                  {selectedSession.name}
                </h2>

                {selectedSession.players.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-[#D4A574]/30 bg-black/20">
                    <Users size={48} className="mx-auto mb-4 text-[#666]" />
                    <p className="text-[#666] italic">
                      Nenhum jogador conectado
                    </p>
                    <p className="text-xs text-[#888] mt-2">
                      ID da Sessão: <span className="text-[#D4A574]">{selectedSession.id}</span>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {selectedSession.players.map((player) => (
                      <div
                        key={player.userId}
                        className="p-6 bg-gradient-to-r from-black/80 to-black/40 border-2 border-[#D4A574]"
                      >
                        {/* Info do Jogador */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl text-[#00FF41] uppercase tracking-wider mb-1">
                              {player.userName}
                            </h3>
                            {player.character && (
                              <div className="text-[#D4A574]">
                                {player.character.characterName} - Nível {player.character.level}
                              </div>
                            )}
                            <div className={`text-xs mt-2 ${player.isOnline ? 'text-[#00FF41]' : 'text-[#888]'}`}>
                              {player.isOnline ? '● Online' : '○ Offline'}
                            </div>
                          </div>

                          {player.character && (
                            <div className="text-right">
                              <div className="flex items-center gap-2 text-[#8B0000]">
                                <Heart size={20} />
                                <span className="text-xl">
                                  {player.character.currentHP}/{player.character.maxHP}
                                </span>
                              </div>
                              <div className="text-xs text-[#888] mt-1">
                                Classe: {player.character.characterClass}
                              </div>
                            </div>
                          )}
                        </div>

                        {player.character && (
                          <>
                            {/* Condições Ativas */}
                            <div className="mb-4">
                              <div className="text-sm text-[#D4A574] uppercase tracking-wider mb-2">
                                Condições Ativas:
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {player.character.activeConditions.length === 0 ? (
                                  <span className="text-xs text-[#666] italic">Nenhuma</span>
                                ) : (
                                  player.character.activeConditions.map((cond) => {
                                    const condData = CONDITIONS[cond];
                                    return (
                                      <div
                                        key={cond}
                                        className="flex items-center gap-2 px-3 py-1 bg-black/60 border-2"
                                        style={{ borderColor: condData?.color || '#666' }}
                                      >
                                        <span>{condData?.icon}</span>
                                        <span className="text-sm">{cond}</span>
                                        <button
                                          onClick={() => applyCondition(player, cond, 'remove')}
                                          className="ml-2 text-[#8B0000] hover:text-[#ff0000]"
                                        >
                                          <X size={14} />
                                        </button>
                                      </div>
                                    );
                                  })
                                )}
                              </div>
                            </div>

                            {/* Aplicar Nova Condição */}
                            <div>
                              <div className="text-sm text-[#D4A574] uppercase tracking-wider mb-2">
                                Aplicar Condição:
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {Object.entries(CONDITIONS).map(([name, data]) => (
                                  <button
                                    key={name}
                                    onClick={() => applyCondition(player, name, 'add')}
                                    disabled={player.character.activeConditions.includes(name)}
                                    className="flex items-center gap-2 px-3 py-2 bg-black/60 border-2 hover:shadow-[0_0_15px] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                    style={{
                                      borderColor: data.color,
                                      ['--tw-shadow-color' as any]: data.color,
                                    }}
                                    title={name}
                                  >
                                    <span>{data.icon}</span>
                                    <span className="text-xs">{name}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        {!player.character && (
                          <div className="text-center py-4 text-[#666] italic border-2 border-dashed border-[#D4A574]/20">
                            Aguardando criação de personagem
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </OrnamentalCard>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-[#666] italic">
                  <AlertCircle size={64} className="mx-auto mb-4 opacity-30" />
                  <p>Selecione uma sessão para gerenciar</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal de Criação de Sessão */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/90">
            <div className="w-full max-w-md">
              <OrnamentalCard delay={0}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl text-[#D4A574] uppercase tracking-wider">
                    Nova Sessão
                  </h2>
                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      setError('');
                      setNewSessionName('');
                    }}
                    className="p-2 text-[#8B0000] hover:text-[#ff0000]"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="mb-6">
                  <label className="block mb-2 text-[#D4A574] uppercase tracking-wider text-sm">
                    Nome da Sessão:
                  </label>
                  <input
                    type="text"
                    value={newSessionName}
                    onChange={(e) => setNewSessionName(e.target.value)}
                    className="w-full p-3 bg-black/60 border-2 border-[#D4A574] text-[#e0e0e0] focus:outline-none focus:border-[#00FF41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all"
                    placeholder="Ex: Campanha Principal"
                    autoFocus
                  />
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-[#8B0000]/20 border-2 border-[#8B0000] text-[#ff4444]">
                    {error}
                  </div>
                )}

                <button
                  onClick={createSession}
                  disabled={loading}
                  className="w-full px-6 py-4 bg-gradient-to-r from-[#4CAF50]/80 to-[#66BB6A]/80 text-white uppercase tracking-wider border-2 border-[#4CAF50] transition-all hover:shadow-[0_0_20px_rgba(76,175,80,0.5)] disabled:opacity-50"
                >
                  {loading ? 'Criando...' : 'Criar Sessão'}
                </button>
              </OrnamentalCard>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
