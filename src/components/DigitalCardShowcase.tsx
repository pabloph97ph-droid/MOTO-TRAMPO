// src/components/DigitalCardShowcase.tsx
import React, { useState } from 'react';
import { Logo } from './Logo';
import { APP_CONFIG } from '../config';
import { buildDirectWhatsAppUrl } from '../utils/whatsapp';
import {
  Shield,
  Radar,
  Phone,
  Camera,
  Clock,
  Handshake,
  Package,
  MapPin,
  ShieldCheck,
  PhoneCall,
  ExternalLink,
  RotateCw,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface DigitalCardShowcaseProps {
  onStartQuiz: () => void;
}

export const DigitalCardShowcase: React.FC<DigitalCardShowcaseProps> = ({ onStartQuiz }) => {
  const [activeSide, setActiveSide] = useState<'frente' | 'verso'>('frente');

  return (
    <section id="card-showcase-section" className="py-16 sm:py-24 bg-[#050811] border-b border-slate-800/80 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Material Oficial Rota Segura</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Outfit',sans-serif]">
            Cartão Institucional de Apresentação
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Veja a identidade original da Rota Segura com todos os padrões operacionais, cobertura e canal direto.
          </p>

          {/* Toggle buttons Frente / Verso */}
          <div className="mt-6 inline-flex items-center p-1.5 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-xl">
            <button
              id="toggle-card-frente"
              onClick={() => setActiveSide('frente')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeSide === 'frente'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>FRENTE (POSICIONAMENTO)</span>
            </button>
            <button
              id="toggle-card-verso"
              onClick={() => setActiveSide('verso')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeSide === 'verso'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>VERSO (COBERTURA & CONTATO)</span>
            </button>
          </div>
        </div>

        {/* Card Display Container */}
        <div className="max-w-5xl mx-auto transition-all duration-300">
          {/* ======================================================== */}
          {/* FRENTE DO CARTÃO (IDÊNTICO À FOTO DO USUÁRIO) */}
          {/* ======================================================== */}
          {activeSide === 'frente' ? (
            <div
              id="card-frente-view"
              className="relative rounded-3xl bg-[#080E1A] border-2 border-amber-500/50 shadow-2xl overflow-hidden transition-all"
            >
              {/* Top Golden accent corner stripe */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-amber-500/20 via-transparent to-transparent pointer-events-none" />

              <div className="p-6 sm:p-10 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Brand & Copy */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* Brand Logo */}
                    <div className="flex items-center gap-4">
                      {/* Big Shield Logo */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 relative">
                        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full drop-shadow-md">
                          <path
                            d="M24 3L8 9V22C8 32.5 15 42 24 45C33 42 40 32.5 40 22V9L24 3Z"
                            fill="#090F1B"
                            stroke="#F59E0B"
                            strokeWidth="2.8"
                          />
                          <path
                            d="M13 36 C15 28, 20 20, 34 14 L36 18 C25 24, 20 32, 19 39 Z"
                            fill="#FFFFFF"
                          />
                          <path
                            d="M17 38 C18.5 31, 23 23, 35 16.5"
                            stroke="#090F1B"
                            strokeWidth="1.2"
                            strokeDasharray="2 2"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <div className="text-2xl sm:text-3xl font-black font-['Outfit',sans-serif] tracking-wider leading-none text-white">
                          ROTA <span className="text-amber-400">SEGURA</span>
                        </div>
                        <div className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-slate-300 mt-1 uppercase">
                          ENTREGAS EXPRESSAS
                        </div>
                      </div>
                    </div>

                    {/* Gold underline accent */}
                    <div className="w-16 h-1 bg-amber-400 rounded-full" />

                    {/* Headline */}
                    <div className="space-y-1">
                      <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-['Outfit',sans-serif] leading-tight">
                        Sua mercadoria.
                      </h3>
                      <h3 className="text-2xl sm:text-4xl font-extrabold text-amber-400 font-['Outfit',sans-serif] leading-tight">
                        Nossa responsabilidade.
                      </h3>
                    </div>

                    {/* Subheadline */}
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-lg">
                      Entregas para empresas, escritórios e pessoas que precisam de segurança, pontualidade e confiança.
                    </p>

                    {/* Quick CTA inside card */}
                    <div className="pt-2 flex flex-wrap gap-3">
                      <button
                        onClick={onStartQuiz}
                        className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-1.5"
                      >
                        <span>Fazer Cotação Agora</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setActiveSide('verso')}
                        className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
                      >
                        <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                        <span>Ver Verso do Cartão</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Motorcycle Courier Visual with Bag and Logo */}
                  <div className="lg:col-span-5 relative flex items-center justify-center">
                    {/* Golden diagonal division beam */}
                    <div className="w-full max-w-sm rounded-2xl bg-gradient-to-br from-[#0c1424] to-[#060A12] border border-amber-500/40 p-4 shadow-xl overflow-hidden relative">
                      {/* Ambient sunset sky gradient simulation */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-amber-900/30 opacity-90" />
                      
                      {/* Skyscraper bokeh lights */}
                      <div className="absolute top-4 left-6 w-3 h-3 rounded-full bg-amber-400/40 blur-xs" />
                      <div className="absolute top-8 right-12 w-4 h-4 rounded-full bg-amber-300/30 blur-xs" />
                      <div className="absolute top-12 left-20 w-2 h-2 rounded-full bg-white/50 blur-2xs" />
                      <div className="absolute top-16 right-20 w-3 h-3 rounded-full bg-orange-400/30 blur-xs" />

                      {/* City skyline silhouettes */}
                      <div className="relative z-10 flex flex-col items-center justify-center pt-4 pb-2">
                        {/* Courier Graphic Illustration (Motorcycle Driver from behind with Bag) */}
                        <div className="relative w-48 h-56 flex flex-col items-center justify-end">
                          {/* Motorcycle Helmet */}
                          <div className="w-16 h-14 rounded-t-full bg-gradient-to-b from-slate-700 via-slate-900 to-slate-950 border border-slate-600 relative z-20 shadow-md flex items-center justify-center">
                            <div className="w-12 h-3.5 bg-slate-950 rounded-full border border-slate-700" />
                          </div>

                          {/* Black Rider Jacket Shoulders */}
                          <div className="w-32 h-10 bg-slate-900 rounded-t-2xl border-t border-slate-700 relative z-10 -mt-2" />

                          {/* Branded Delivery Box / Thermal Bag with Gold Shield & Text */}
                          <div className="w-40 h-32 rounded-xl bg-gradient-to-b from-[#111622] to-[#0A0D15] border-2 border-slate-700 shadow-2xl relative z-10 p-3 flex flex-col items-center justify-center -mt-3">
                            {/* Shield Logo on Bag in Golden Yellow */}
                            <div className="w-9 h-9 relative mb-1">
                              <svg viewBox="0 0 48 48" fill="none" className="w-full h-full drop-shadow">
                                <path
                                  d="M24 3L8 9V22C8 32.5 15 42 24 45C33 42 40 32.5 40 22V9L24 3Z"
                                  fill="#090F1B"
                                  stroke="#F59E0B"
                                  strokeWidth="2.5"
                                />
                                <path
                                  d="M13 36 C15 28, 20 20, 34 14 L36 18 C25 24, 20 32, 19 39 Z"
                                  fill="#F59E0B"
                                />
                              </svg>
                            </div>
                            <span className="font-extrabold text-[11px] text-amber-400 font-['Outfit',sans-serif] tracking-wider leading-none">
                              ROTA SEGURA
                            </span>
                            <span className="text-[7px] text-slate-400 uppercase tracking-widest mt-0.5">
                              ENTREGAS EXPRESSAS
                            </span>
                          </div>

                          {/* Motorcycle Tail Light in Ruby Red Glow */}
                          <div className="w-16 h-4 bg-red-600 rounded-full shadow-[0_0_15px_#dc2626] border border-red-500/80 -mt-1 relative z-20 flex items-center justify-center">
                            <div className="w-6 h-1.5 bg-red-200 rounded-full" />
                          </div>
                        </div>

                        <div className="mt-2 text-center">
                          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                            Piloto Equipado & Baú Lacrado
                          </span>
                          <span className="text-xs text-slate-400">
                            Padrão executivo de transporte urbano
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar: 6 Exact Pillars from the flyer */}
                <div className="mt-10 pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-left">
                  {/* 1. SEGURO */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-400">
                      <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="font-extrabold text-xs text-white tracking-wide">SEGURO</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Cobertura para a mercadoria
                    </p>
                  </div>

                  {/* 2. ACOMPANHAMENTO */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-400">
                      <Radar className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="font-extrabold text-xs text-white tracking-wide">EM TEMPO REAL</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Você acompanha do início ao destino
                    </p>
                  </div>

                  {/* 3. CONTATO DIRETO */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-400">
                      <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="font-extrabold text-xs text-white tracking-wide">CONTATO DIRETO</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Fale diretamente com o profissional
                    </p>
                  </div>

                  {/* 4. ENTREGA COMPROVADA */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-400">
                      <Camera className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="font-extrabold text-xs text-white tracking-wide">COMPROVADA</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Foto e assinatura no recebimento
                    </p>
                  </div>

                  {/* 5. PRIORIDADE */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-400">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="font-extrabold text-xs text-white tracking-wide">PRIORIDADE</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Opções para entregas e horário marcado
                    </p>
                  </div>

                  {/* 6. DISCRIÇÃO */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-400">
                      <Handshake className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="font-extrabold text-xs text-white tracking-wide">DISCRIÇÃO</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Respeito total e responsabilidade
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ======================================================== */
            /* VERSO DO CARTÃO (IDÊNTICO À FOTO DO USUÁRIO) */
            /* ======================================================== */
            <div
              id="card-verso-view"
              className="relative rounded-3xl bg-[#070C18] border-2 border-amber-500/50 shadow-2xl overflow-hidden transition-all"
            >
              {/* Skyline & Estaiada Bridge artistic vector backdrop */}
              <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20 pointer-events-none">
                <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="w-full h-full fill-blue-500">
                  <path d="M0 120 L80 120 L80 90 L100 90 L100 70 L140 70 L140 120 L240 120 L280 20 L300 20 L340 120 L400 120 L400 60 L450 60 L450 120 L550 120 L600 80 L650 80 L650 120 L800 120 L850 50 L900 50 L900 120 L1000 120 Z" />
                  {/* Cable stays of bridge */}
                  <line x1="290" y1="20" x2="220" y2="120" stroke="#F59E0B" strokeWidth="1" />
                  <line x1="290" y1="20" x2="250" y2="120" stroke="#F59E0B" strokeWidth="1" />
                  <line x1="290" y1="20" x2="330" y2="120" stroke="#F59E0B" strokeWidth="1" />
                  <line x1="290" y1="20" x2="360" y2="120" stroke="#F59E0B" strokeWidth="1" />
                </svg>
              </div>

              <div className="p-6 sm:p-10 lg:p-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  {/* Left Side: Headline & 4 Pillars */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                    {/* Verso Headline */}
                    <div className="space-y-1">
                      <p className="text-lg sm:text-2xl text-slate-200 font-sans italic">
                        Para uma entrega comum, você procura rapidez.
                      </p>
                      <p className="text-xl sm:text-3xl font-extrabold text-amber-400 font-['Outfit',sans-serif] leading-tight">
                        Para uma entrega importante, você procura confiança.
                      </p>
                    </div>

                    {/* 4 Feature Icons Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                      {/* 1. ATÉ 20 KG */}
                      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                        <Package className="w-5 h-5 text-amber-400 mb-1" />
                        <span className="block font-bold text-white text-xs">ATÉ 20 KG</span>
                        <span className="text-[11px] text-slate-400 block">Baú ou bag</span>
                      </div>

                      {/* 2. GRANDE SÃO PAULO */}
                      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                        <MapPin className="w-5 h-5 text-amber-400 mb-1" />
                        <span className="block font-bold text-white text-xs">GRANDE SP E INTERIOR</span>
                        <span className="text-[11px] text-slate-400 block">Toda a região</span>
                      </div>

                      {/* 3. COM SEGURO */}
                      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                        <ShieldCheck className="w-5 h-5 text-amber-400 mb-1" />
                        <span className="block font-bold text-white text-xs">COM SEGURO</span>
                        <span className="text-[11px] text-slate-400 block leading-tight">
                          Até 80% do valor da mercadoria (conforme apólice)
                        </span>
                      </div>

                      {/* 4. HORÁRIO MARCADO */}
                      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                        <Clock className="w-5 h-5 text-amber-400 mb-1" />
                        <span className="block font-bold text-white text-xs">HORÁRIO MARCADO</span>
                        <span className="text-[11px] text-slate-400 block leading-tight">
                          E entregas urgentes com prioridade
                        </span>
                      </div>
                    </div>

                    {/* Bottom brand sign */}
                    <div className="text-xs font-mono tracking-widest text-slate-400 pt-4 border-t border-slate-800/60">
                      ROTA SEGURA &nbsp;/&nbsp; ENTREGAS EXPRESSAS
                    </div>
                  </div>

                  {/* Right Side: Direct Contact Box with Golden Angle */}
                  <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0c1424] border-2 border-amber-500/40 relative shadow-2xl space-y-4">
                    {/* Top Callout */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                        <PhoneCall className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] uppercase tracking-wider font-bold text-amber-400 font-mono block">
                          Atendimento Oficial
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-white">
                          FALE DIRETAMENTE COM A ROTA SEGURA
                        </span>
                      </div>
                    </div>

                    {/* Big Yellow WhatsApp Button */}
                    <a
                      id="card-whatsapp-button"
                      href={buildDirectWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/30 active:scale-98 transition-all flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4 fill-slate-950 text-slate-950" />
                      <span>WHATSAPP &gt;</span>
                    </a>

                    {/* Question Callout */}
                    <div className="text-left pt-1">
                      <p className="text-xs text-slate-300">
                        Precisa enviar algo que não pode ficar na mão de qualquer pessoa?
                      </p>
                      <p className="text-sm font-black text-amber-400 mt-1 uppercase">
                        FALE COM A NOSSA EQUIPE.
                      </p>
                    </div>

                    {/* Diagonal Cut Corner with Coverage Banner */}
                    <div className="pt-2">
                      <div className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 p-2.5 font-black text-xs flex items-center justify-between shadow-md">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-950 fill-slate-950" />
                          <span>GRANDE SÃO PAULO E INTERIOR</span>
                        </div>
                        <span className="text-[10px] bg-slate-950 text-amber-400 px-2 py-0.5 rounded font-mono font-bold">
                          SP
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
