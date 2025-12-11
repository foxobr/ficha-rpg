import { useEffect, useState } from 'react';

export function SandStorm() {
  const [isActive, setIsActive] = useState(false);
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    const triggerStorm = () => {
      setIsActive(true);
      setIntensity(Math.random() * 0.4 + 0.2);
      
      // Storm lasts 3-7 seconds
      const duration = Math.random() * 4000 + 3000;
      setTimeout(() => {
        setIsActive(false);
      }, duration);
    };

    // Random storm every 20-40 seconds
    const scheduleNextStorm = () => {
      const delay = Math.random() * 20000 + 20000;
      setTimeout(() => {
        triggerStorm();
        scheduleNextStorm();
      }, delay);
    };

    // First storm after 10 seconds
    setTimeout(() => {
      triggerStorm();
      scheduleNextStorm();
    }, 10000);
  }, []);

  if (!isActive) return null;

  return (
    <>
      <div 
        className="sandstorm-overlay"
        style={{ opacity: intensity }}
      />
      <style>{`
        .sandstorm-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 5;
          background: 
            linear-gradient(45deg, 
              transparent 0%, 
              rgba(212, 165, 116, 0.15) 25%, 
              transparent 50%,
              rgba(212, 165, 116, 0.15) 75%,
              transparent 100%
            );
          background-size: 200% 200%;
          animation: sandstorm-move 2s linear infinite;
          filter: blur(1px);
        }

        @keyframes sandstorm-move {
          0% {
            background-position: 0% 0%;
            filter: blur(1px);
          }
          50% {
            background-position: 100% 100%;
            filter: blur(2px);
          }
          100% {
            background-position: 0% 0%;
            filter: blur(1px);
          }
        }

        @media print {
          .sandstorm-overlay {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
