import { useEffect, useState } from 'react';

export function GlitchEffect() {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    };

    // Random glitch every 5-15 seconds
    const scheduleNextGlitch = () => {
      const delay = Math.random() * 10000 + 5000;
      setTimeout(() => {
        triggerGlitch();
        scheduleNextGlitch();
      }, delay);
    };

    scheduleNextGlitch();
  }, []);

  if (!isGlitching) return null;

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[100] glitch-overlay" />
      <style>{`
        .glitch-overlay {
          background: 
            linear-gradient(to right, transparent 0%, rgba(255, 107, 53, 0.1) 50%, transparent 100%);
          animation: glitch-anim 0.2s infinite;
        }

        @keyframes glitch-anim {
          0% {
            transform: translate(0);
            opacity: 1;
          }
          20% {
            transform: translate(-2px, 2px);
            opacity: 0.8;
          }
          40% {
            transform: translate(-2px, -2px);
            opacity: 0.6;
          }
          60% {
            transform: translate(2px, 2px);
            opacity: 0.8;
          }
          80% {
            transform: translate(2px, -2px);
            opacity: 0.9;
          }
          100% {
            transform: translate(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
