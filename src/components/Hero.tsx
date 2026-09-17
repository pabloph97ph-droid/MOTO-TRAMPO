// src/components/Hero.tsx
import React from 'react';
import { APP_CONFIG } from '../config';
import {
  Shield,
  Navigation,
  ArrowRight,
  Clock,
  CheckCircle2,
  MapPin,
  Sparkles,
  Building2,
  ChevronDown
} from 'lucide-react';

interface HeroProps {
  onStartQuiz: () => void;
  onLearnMore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartQuiz, onLearnMore }) => {
  return (
    <section
      id="hero-section"
      className="relative pt-8 pb-16 sm:pt-16 sm:pb-24 overflow-hidden border-b border-slate-800/60"
    >
      {/* Background Decorative Tech Grid & Gold Radial Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[240px] h-[240px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {/* Coverage pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Atendimento para {APP_CONFIG.coverageArea}</span>
          </div>
        </div>

        {/* Headline matching the official flyer */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-['Outfit',sans-serif] text-white leading-[1.1]">
            Sua mercadoria.{' '}
            <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              Nossa responsabilidade.
            </span>
          </h1>

          {/* Subheadline matching flyer */}
          <p className="mt-5 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Entregas para empresas, escritórios e pessoas que precisam de segurança, pontualidade e confiança.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
            <button
              id="hero-primary-quote-cta"
              onClick={onStartQuiz}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-500/25 active:scale-[0.98] transition-all"
            >
              <span>QUERO COTAR MINHAS ENTREGAS</span>
              <ArrowRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            </button>

            <button
              id="hero-secondary-learn-cta"
              onClick={onLearnMore}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 text-slate-200 border border-slate-700/80 font-bold text-sm sm:text-base transition-colors"
            >
              <span>VER CARTÃO INSTITUCIONAL</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Diagnóstico comercial rápido em menos de 2 minutos • Atendimento humano no WhatsApp
          </p>
        </div>

        {/* Visual Route & Operational Confidence Card */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0B1222]/90 border border-amber-500/30 p-5 sm:p-7 shadow-2xl backdrop-blur-xl">
            {/* Top status bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="font-semibold text-slate-200">Operação Logística Ativa</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[11px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                <Shield className="w-3 h-3" />
                <span>PADRÃO CORPORATIVO</span>
              </div>
            </div>

            {/* Route Simulation Graphic */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              {/* Origin */}
              <div className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Coleta</span>
                  <span className="text-xs font-semibold text-white">Sua Empresa / Ponto</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Retirada ágil no local</span>
                </div>
              </div>

              {/* Waypoint / Route Vector */}
              <div className="flex sm:flex-col items-center justify-center gap-2 py-1 text-center">
                <div className="flex items-center gap-1 text-amber-400">
                  <span className="h-[2px] w-6 sm:w-12 bg-amber-500/50" />
                  <Navigation className="w-4 h-4 rotate-90 sm:rotate-45 text-amber-400 fill-amber-400" />
                  <span className="h-[2px] w-6 sm:w-12 bg-amber-500/50" />
                </div>
                <span className="text-[11px] font-mono text-slate-300">
                  Rota Segura Monitorada
                </span>
              </div>

              {/* Destination */}
              <div className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Destino</span>
                  <span className="text-xs font-semibold text-white">Cliente / Destinatário</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Entrega com comprovação</span>
                </div>
              </div>
            </div>

            {/* Quick trust metrics row */}
            <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <span className="block font-bold text-white text-sm">Direto</span>
                <span className="text-[11px] text-slate-400">Atendimento humano</span>
              </div>
              <div>
                <span className="block font-bold text-amber-400 text-sm">Até 20 kg</span>
                <span className="text-[11px] text-slate-400">Carga padrão moto</span>
              </div>
              <div>
                <span className="block font-bold text-white text-sm">Recorrente</span>
                <span className="text-[11px] text-slate-400">Opções de contrato</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
