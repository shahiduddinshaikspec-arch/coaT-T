import React, { useEffect, useState } from 'react';
import { Square, Volume2 } from 'lucide-react';

interface Props {
  text: string;
  label?: string;
}

export const ReadAloudButton: React.FC<Props> = ({ text, label = 'Read this aloud' }) => {
  const supported =
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    typeof window.SpeechSynthesisUtterance !== 'undefined';

  const [speaking, setSpeaking] = useState(false);

  // Stop speaking if text changes or component unmounts
  useEffect(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text, supported]);

  if (!supported) return null;

  const handleToggle = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const cleaned = text
        .replace(/←/g, ' gets ')
        .replace(/→/g, ' leads to ')
        .replace(/⊕/g, ' XOR ')
        .replace(/∧/g, ' AND ')
        .replace(/∨/g, ' OR ')
        .replace(/\s+/g, ' ')
        .trim();

      const utterance = new window.SpeechSynthesisUtterance(cleaned);
      utterance.rate = 0.96;
      utterance.pitch = 1;
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);

      setSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } catch {
      setSpeaking(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={speaking}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
        speaking
          ? 'border-teal-500 bg-teal-700 text-white'
          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
      }`}
    >
      {speaking ? <Square className="h-3 w-3 fill-current" /> : <Volume2 className="h-3.5 w-3.5 text-teal-600" />}
      {speaking ? 'Stop reading' : label}
    </button>
  );
};
