// src/components/FloatingMobileBar.tsx
import React from 'react';
import { APP_CONFIG } from '../config';
import { buildDirectWhatsAppUrl } from '../utils/whatsapp';
import { Phone, ShieldCheck } from 'lucide-react';

interface FloatingMobileBarProps {
  onStartQuiz: () => void;
  isVisible: boolean;
}

export const FloatingMobileBar: React.FC<FloatingMobileBarProps> = ({
  onStartQuiz,
  isVisible
}) => {
  if (!isVisible) return null;

  return (
    <div
      id="floating-mobile-bar"
      className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#070B14]/95 backdrop-blur-lg border-t border-slate-800 sm:hidden transition-transform duration-200"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* WhatsApp Direct Icon Button */}
        <a
          id="mobile-direct-whatsapp-btn"
          href={buildDirectWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600/30 active:scale-95 transition-all flex items-center justify-center shrink-0"
          aria-label="Falar no WhatsApp"
        >
          <Phone className="w-5 h-5 text-emerald-400" />
        </a>

        {/* Big Quote Button */}
        <button
          id="mobile-start-quiz-btn"
          onClick={onStartQuiz}
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs tracking-wide shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-4 h-4 text-slate-950" />
          <span>COTAR MINHAS ENTREGAS</span>
        </button>
      </div>
    </div>
  );
};
