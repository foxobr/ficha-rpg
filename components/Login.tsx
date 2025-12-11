import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { OrnamentalCard } from './OrnamentalCard';
import { LogIn, UserPlus, Shield, User } from 'lucide-react';

interface LoginProps {
  onLogin: (user: any, accessToken: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'player' | 'admin'>('player');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const supabase = createClient(
    `https://${projectId}.supabase.co`,
    publicAnonKey
  );

  const handleSignUp = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ace937eb/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ email, password, name, role }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar conta');
      }

      // Auto login after signup
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;

      onLogin(loginData.user, loginData.session.access_token);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;

      onLogin(data.user, data.session.access_token);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0a00] to-black" />
      
      <div className="relative z-10 w-full max-w-md">
        <OrnamentalCard delay={0}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-[#D4A574] to-[#8B7355] mb-4 relative overflow-hidden">
              <Shield size={40} className="text-black relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <h1 className="text-3xl mb-2 text-[#D4A574] uppercase tracking-wider">
              Sombras do Deserto
            </h1>
            <p className="text-[#888] uppercase tracking-widest text-sm">
              Sistema de Fichas RPG
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <div>
                <label className="block mb-2 text-[#D4A574] uppercase tracking-wider text-sm">
                  Nome
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-black/60 border-2 border-[#D4A574] text-[#e0e0e0] focus:outline-none focus:border-[#00FF41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all"
                  required={mode === 'signup'}
                  placeholder="Seu nome"
                />
              </div>
            )}

            <div>
              <label className="block mb-2 text-[#D4A574] uppercase tracking-wider text-sm">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-black/60 border-2 border-[#D4A574] text-[#e0e0e0] focus:outline-none focus:border-[#00FF41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all"
                required
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block mb-2 text-[#D4A574] uppercase tracking-wider text-sm">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-black/60 border-2 border-[#D4A574] text-[#e0e0e0] focus:outline-none focus:border-[#00FF41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all"
                required
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block mb-3 text-[#D4A574] uppercase tracking-wider text-sm">
                  Tipo de Conta
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('player')}
                    className={`p-4 border-2 transition-all ${
                      role === 'player'
                        ? 'border-[#00FF41] bg-[#00FF41]/10 text-[#00FF41]'
                        : 'border-[#D4A574]/40 bg-black/40 text-[#888] hover:border-[#D4A574]'
                    }`}
                  >
                    <User className="mx-auto mb-2" size={24} />
                    <div className="text-sm uppercase tracking-wider">Jogador</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`p-4 border-2 transition-all ${
                      role === 'admin'
                        ? 'border-[#00FF41] bg-[#00FF41]/10 text-[#00FF41]'
                        : 'border-[#D4A574]/40 bg-black/40 text-[#888] hover:border-[#D4A574]'
                    }`}
                  >
                    <Shield className="mx-auto mb-2" size={24} />
                    <div className="text-sm uppercase tracking-wider">Mestre</div>
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 bg-[#8B0000]/20 border-2 border-[#8B0000] text-[#ff4444]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full relative px-6 py-4 bg-gradient-to-r from-[#4CAF50]/80 to-[#66BB6A]/80 text-white uppercase tracking-wider border-2 border-[#4CAF50] transition-all hover:shadow-[0_0_20px_rgba(76,175,80,0.5)] active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  'Processando...'
                ) : mode === 'login' ? (
                  <>
                    <LogIn size={20} />
                    Entrar
                  </>
                ) : (
                  <>
                    <UserPlus size={20} />
                    Criar Conta
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-[#D4A574] hover:text-[#00FF41] transition-colors uppercase tracking-wider text-sm"
            >
              {mode === 'login' ? 'Criar nova conta' : 'Já tenho conta'}
            </button>
          </div>
        </OrnamentalCard>

        <div className="mt-8 text-center text-[#666] text-sm">
          <p className="mb-2">Sistema de gerenciamento de fichas e sessões</p>
          <p className="text-xs">Universo Sombras do Deserto © 2024</p>
        </div>
      </div>
    </div>
  );
}
