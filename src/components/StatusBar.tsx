import { useEffect, useState } from 'react';

interface StatusBarProps {
  message: string;
  type?: 'success' | 'error' | 'warning';
  duration?: number;
  onHide?: () => void;
}

export function StatusBar({ message, type = 'success', duration = 3000, onHide }: StatusBarProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      if (onHide) {
        onHide();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onHide]);

  if (!visible || !message) return null;

  const bgColor = type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#ff6b35';

  return (
    <div
      className="mt-5 p-4 rounded border animate-[slideIn_0.3s_ease]"
      style={{
        background: bgColor,
        borderColor: bgColor,
        color: type === 'warning' ? '#1a1a1a' : '#fff'
      }}
    >
      {message}
    </div>
  );
}
