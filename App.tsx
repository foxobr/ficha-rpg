import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './utils/supabase/info';
import { Login } from './components/Login';
import { AdminPanel } from './components/AdminPanel';
import { PlayerView } from './components/PlayerView';
import { SandParticles } from './components/SandParticles';
import { GlitchEffect } from './components/GlitchEffect';
import { ScanLines } from './components/ScanLines';
import { HolographicOverlay } from './components/HolographicOverlay';
import { SandStorm } from './components/SandStorm';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const supabase = createClient(
    `https://${projectId}.supabase.co`,
    publicAnonKey
  );

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (session) {
        setUser(session.user);
        setAccessToken(session.access_token);
        await loadUserInfo(session.access_token);
      }
    } catch (error) {
      console.error('Error checking session:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserInfo = async (token: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ace937eb/user`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setUserInfo(data.user);
      }
    } catch (error) {
      console.error('Error loading user info:', error);
    }
  };

  const handleLogin = async (userData: any, token: string) => {
    setUser(userData);
    setAccessToken(token);
    await loadUserInfo(token);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserInfo(null);
    setAccessToken('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-[#D4A574] text-xl uppercase tracking-wider animate-pulse">
          Carregando...
        </div>
      </div>
    );
  }

  if (!user || !userInfo) {
    return (
      <>
        <SandParticles />
        <ScanLines />
        <HolographicOverlay />
        <GlitchEffect />
        <SandStorm />
        <Login onLogin={handleLogin} />
      </>
    );
  }

  if (userInfo.role === 'admin') {
    return (
      <>
        <SandParticles />
        <ScanLines />
        <HolographicOverlay />
        <GlitchEffect />
        <SandStorm />
        <AdminPanel
          userId={user.id}
          accessToken={accessToken}
          onLogout={handleLogout}
        />
      </>
    );
  }

  // Player view
  return (
    <>
      <SandParticles />
      <ScanLines />
      <HolographicOverlay />
      <GlitchEffect />
      <SandStorm />
      <PlayerView
        userId={user.id}
        userName={userInfo.name || user.email}
        accessToken={accessToken}
        onLogout={handleLogout}
      />
    </>
  );
}