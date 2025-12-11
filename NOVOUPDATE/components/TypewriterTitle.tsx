import { useState, useEffect } from 'react';

interface TypewriterTitleProps {
  text: string;
  speed?: number;
}

export function TypewriterTitle({ text, speed = 100 }: TypewriterTitleProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <h1 className="text-[#ff6b35] text-5xl mb-1.5 drop-shadow-[0_0_10px_rgba(255,107,53,0.5)] relative">
      {displayedText}
      <span className="animate-pulse">|</span>
    </h1>
  );
}
