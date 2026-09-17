// src/components/Header.tsx
import React from 'react';
import { Logo } from './Logo';
import { APP_CONFIG } from '../config';
import { buildDirectWhatsAppUrl } from '../utils/whatsapp';
import { Phone, ShieldCheck, MapPin, LockKeyhole, Zap } from 'lucide-react';

interface HeaderProps {
  onOpenAdmin: () => void;
  onStartQuiz: () => void;
  onReplayIntro?: () => void;
  isAdminOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAdmin,
  onStartQuiz,
  onReplayIntro,
  isAdminOpen
}) => {
  return (
    <header
      id="main-navigation-header"
      className="sticky top-0 z-40 w-full bg-[#070B14]/90 backdrop-blur-md border-b border-slate-800/80 transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <Logo
          size="md"
          onClick={() => {
            if (isAdminOpen) {
              onOpenAdmin(); // closes admin
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Replay Tech Lightning Intro Button */}
          {onReplayIntro && (
            <button
              id="header-replay-intro-button"
              onClick={onReplayIntro}
              title="Rever Apresentação Tecnológica"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="hidden sm:inline">Intro Tecnológica</span>
            </button>
          )}

          {/* Coverage Badge (Desktop / Tablet) */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{APP_CONFIG.coverageArea}</span>
          </div>

          {/* Quick WhatsApp Link */}
          <a
            id="header-whatsapp-cta"
            href={buildDirectWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 text-xs font-semibold hover:bg-emerald-900/40 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>{APP_CONFIG.whatsappDisplay}</span>
          </a>

          {/* Quote Button (Direct into Quiz) */}
          <button
            id="header-quote-button"
            onClick={onStartQuiz}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/10 active:scale-95 transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-slate-950" />
            <span>Cotar Agora</span>
          </button>

          {/* Admin Toggle Button */}
          <button
            id="header-admin-toggle-button"
            onClick={onOpenAdmin}
            title={isAdminOpen ? 'Voltar para o site' : 'Painel Comercial / Leads'}
            className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
              isAdminOpen
                ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <LockKeyhole className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
