export function HolographicOverlay() {
  return (
    <>
      <div className="holographic-overlay" />
      <div className="corner-decorations">
        <div className="corner top-left" />
        <div className="corner top-right" />
        <div className="corner bottom-left" />
        <div className="corner bottom-right" />
      </div>
      <style>{`
        .holographic-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 3;
          background: 
            radial-gradient(circle at 20% 50%, rgba(0, 255, 65, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(255, 107, 53, 0.03) 0%, transparent 50%);
          animation: hologram-pulse 4s ease-in-out infinite;
        }

        @keyframes hologram-pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        .corner-decorations {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 4;
        }

        .corner {
          position: absolute;
          width: 40px;
          height: 40px;
          border: 2px solid rgba(255, 107, 53, 0.4);
          animation: corner-glow 2s ease-in-out infinite;
        }

        .corner.top-left {
          top: 20px;
          left: 20px;
          border-right: none;
          border-bottom: none;
        }

        .corner.top-right {
          top: 20px;
          right: 20px;
          border-left: none;
          border-bottom: none;
        }

        .corner.bottom-left {
          bottom: 20px;
          left: 20px;
          border-right: none;
          border-top: none;
        }

        .corner.bottom-right {
          bottom: 20px;
          right: 20px;
          border-left: none;
          border-top: none;
        }

        @keyframes corner-glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(255, 107, 53, 0.3);
            opacity: 0.6;
          }
          50% {
            box-shadow: 0 0 15px rgba(255, 107, 53, 0.6);
            opacity: 1;
          }
        }

        @media print {
          .holographic-overlay,
          .corner-decorations {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .corner {
            width: 25px;
            height: 25px;
          }
          
          .corner.top-left,
          .corner.top-right {
            top: 10px;
          }
          
          .corner.bottom-left,
          .corner.bottom-right {
            bottom: 10px;
          }
          
          .corner.top-left,
          .corner.bottom-left {
            left: 10px;
          }
          
          .corner.top-right,
          .corner.bottom-right {
            right: 10px;
          }
        }
      `}</style>
    </>
  );
}
