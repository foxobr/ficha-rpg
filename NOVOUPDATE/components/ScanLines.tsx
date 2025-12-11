export function ScanLines() {
  return (
    <>
      <div className="scanlines" />
      <style>{`
        .scanlines {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
          background: linear-gradient(
            to bottom,
            rgba(255, 107, 53, 0.03) 50%,
            transparent 50%
          );
          background-size: 100% 4px;
          animation: scanline-move 8s linear infinite;
          opacity: 0.4;
        }

        @keyframes scanline-move {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 100%;
          }
        }

        @media print {
          .scanlines {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
