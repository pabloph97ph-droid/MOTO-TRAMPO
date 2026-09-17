// src/components/TechLightningIntro.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';
import {
  Zap,
  Shield,
  Gauge,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Phone,
  Radar,
  Lock,
  Layers,
  Repeat
} from 'lucide-react';

interface TechLightningIntroProps {
  onComplete: () => void;
}

export const TechLightningIntro: React.FC<TechLightningIntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<1 | 2>(1);
  const [energyLevel, setEnergyLevel] = useState<number>(0);
  const [isAccelerating, setIsAccelerating] = useState<boolean>(false);
  const [selectedPreset, setSelectedPreset] = useState<'express' | 'contract'>('express');
  const [lightningFlash, setLightningFlash] = useState<boolean>(false);
  const animFrameRef = useRef<number | null>(null);

  // Auto charge progression or interactive hold
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (stage === 1 && !isAccelerating && energyLevel < 85) {
      interval = setInterval(() => {
        setEnergyLevel(prev => {
          if (prev >= 90) return prev;
          return prev + 1;
        });
      }, 40);
    }
    return () => clearInterval(interval);
  }, [stage, isAccelerating, energyLevel]);

  // Handle Lightning Pulse Trigger
  const triggerLightningPulse = () => {
    setLightningFlash(true);
    setEnergyLevel(100);
    setTimeout(() => {
      setLightningFlash(false);
      setStage(2);
    }, 450);
  };

  const handleChargeHoldStart = () => {
    setIsAccelerating(true);
    let current = energyLevel;
    const step = () => {
      current = Math.min(100, current + 4);
      setEnergyLevel(current);
      if (current < 100) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        triggerLightningPulse();
      }
    };
    animFrameRef.current = requestAnimationFrame(step);
  };

  const handleChargeHoldEnd = () => {
    setIsAccelerating(false);
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
  };

  return (
    <div
      id="lightning-intro-container"
      className="fixed inset-0 z-50 bg-[#050811] text-white flex flex-col justify-between overflow-hidden select-none font-['Outfit',sans-serif]"
    >
      {/* Dynamic Lightning Flash overlay */}
      <div
        className={`pointer-events-none fixed inset-0 bg-amber-400/30 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          lightningFlash ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Cyber Grid & Glowing Particle Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b08_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b08_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-amber-500/15 via-amber-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar with Brand and Skip action */}
      <header className="relative z-20 px-6 sm:px-12 py-6 flex items-center justify-between">
        <Logo size="md" />

        <div className="flex items-center gap-3">
          {/* Stage indicators */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full text-xs font-mono text-slate-400">
            <span
              className={`w-2 h-2 rounded-full ${
                stage === 1 ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'
              }`}
            />
            <span>ETAPA {stage} DE 2</span>
          </div>

          <button
            id="skip-intro-button"
            onClick={onComplete}
            className="px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-amber-400 border border-slate-700/80 transition-all flex items-center gap-1.5"
          >
            <span>Pular Apresentação</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Interactive Stage Body */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-8">
        <AnimatePresence mode="wait">
          {/* ============================================================ */}
          {/* ETAPA 1: O RAIO DOURADO DE VELOCIDADE & ATIVAÇÃO TECNOLÓGICA */}
          {/* ============================================================ */}
          {stage === 1 ? (
            <motion.div
              key="intro-stage-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl w-full text-center space-y-6"
            >
              {/* Electric Tech Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs font-mono uppercase tracking-widest shadow-lg shadow-amber-500/10">
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
                <span>Protocolo de Prontidão Imediata</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                  Velocidade não é pressa.{' '}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.4)]">
                    É precisão e tecnologia.
                  </span>
                </h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
                  Para empresas, escritórios e pessoas que não podem arriscar mercadorias vitais.
                  Um sistema expresso que une agilidade e rastreio em tempo real na Grande SP e Interior.
                </p>
              </div>

              {/* Central Electric Lightning Ray Animation & Interactive Reactor */}
              <div className="relative py-4">
                {/* SVG Lightning Ray Path */}
                <div className="relative mx-auto w-full max-w-md h-36 flex items-center justify-center">
                  <svg
                    viewBox="0 0 400 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-[0_0_16px_rgba(245,158,11,0.6)]"
                  >
                    <defs>
                      <linearGradient id="goldLightningGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="25%" stopColor="#FDE047" />
                        <stop offset="70%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#D97706" />
                      </linearGradient>
                      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="glow" />
                        <feComposite in="SourceGraphic" in2="glow" operator="over" />
                      </filter>
                    </defs>

                    {/* Circuit Track Ground */}
                    <path
                      d="M20 60 L120 60 L160 30 L220 90 L260 40 L380 60"
                      stroke="#1e293b"
                      strokeWidth="3"
                      strokeDasharray="4 4"
                    />

                    {/* Animated High Voltage Lightning Ray */}
                    <path
                      d="M20 60 L130 58 L160 26 L195 72 L230 42 L260 88 L300 50 L380 60"
                      stroke="url(#goldLightningGrad)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#glow)"
                      className="animate-pulse"
                      style={{
                        strokeDasharray: '400',
                        strokeDashoffset: `${400 - (energyLevel / 100) * 400}`
                      }}
                    />

                    {/* Secondary Sparks */}
                    {energyLevel > 50 && (
                      <>
                        <line x1="160" y1="26" x2="175" y2="15" stroke="#FDE047" strokeWidth="1.5" />
                        <line x1="260" y1="88" x2="275" y2="98" stroke="#FBBF24" strokeWidth="1.5" />
                        <line x1="300" y1="50" x2="310" y2="35" stroke="#F59E0B" strokeWidth="1.5" />
                      </>
                    )}

                    {/* Origin Waypoint Pin */}
                    <circle cx="20" cy="60" r="6" fill="#F59E0B" />
                    <circle cx="20" cy="60" r="10" stroke="#F59E0B" strokeOpacity="0.4" strokeWidth="2" />

                    {/* Destination Waypoint Pin */}
                    <circle cx="380" cy="60" r="6" fill="#10B981" />
                    <circle cx="380" cy="60" r="12" stroke="#10B981" strokeOpacity="0.4" strokeWidth="2" />
                  </svg>

                  {/* Lightning Icon Over Spark */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-slate-950/90 border-2 border-amber-400 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                    <Zap className="w-8 h-8 text-amber-400 fill-amber-400 animate-bounce" />
                  </div>
                </div>

                {/* Telemetry Progress Bar */}
                <div className="max-w-sm mx-auto mt-2 bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Gauge className="w-3.5 h-3.5 text-amber-400" />
                      Potência da Rota
                    </span>
                    <span className="text-amber-400 font-bold">{energyLevel}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 transition-all duration-150 rounded-full shadow-[0_0_10px_#F59E0B]"
                      style={{ width: `${energyLevel}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
                <button
                  id="trigger-lightning-step1"
                  onClick={triggerLightningPulse}
                  onMouseDown={handleChargeHoldStart}
                  onMouseUp={handleChargeHoldEnd}
                  onTouchStart={handleChargeHoldStart}
                  onTouchEnd={handleChargeHoldEnd}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(245,158,11,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
                  <span>DISPARAR RAIO DE VELOCIDADE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <span className="text-[11px] text-slate-400 block font-mono">
                Pressione para acelerar a rota ou avance para conhecer a blindagem da operação
              </span>
            </motion.div>
          ) : (
            /* ============================================================ */
            /* ETAPA 2: A TECNOLOGIA DE BLINDAGEM & INFRAESTRUTURA CORPORATIVA */
            /* ============================================================ */
            <motion.div
              key="intro-stage-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl w-full text-center space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-mono uppercase tracking-widest">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Etapa 2 • Infraestrutura & Confiança</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  Para uma entrega comum, rapidez.{' '}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                    Para uma entrega importante, confiança.
                  </span>
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                  Conheça a estrutura que garante que sua mercadoria chegue com segurança em toda a Grande São Paulo e Interior.
                </p>
              </div>

              {/* 3 Interactive Tech Capability Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-left pt-2">
                {/* 1. Telemetria e Trajeto */}
                <div
                  onClick={() => setSelectedPreset('express')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedPreset === 'express'
                      ? 'bg-slate-900/95 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                    <Radar className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-sm">Acompanhamento Contínuo</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Você acompanha a entrega do início ao destino com contato direto com a equipe.
                  </p>
                  <span className="inline-block mt-3 text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    SEM ROBÔS TRAVANDO
                  </span>
                </div>

                {/* 2. Seguro & Proteção */}
                <div
                  onClick={() => setSelectedPreset('contract')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedPreset === 'contract'
                      ? 'bg-slate-900/95 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-sm">Com Seguro e Proteção</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Cobertura de até 80% do valor da mercadoria (conforme apólice contratada).
                  </p>
                  <span className="inline-block mt-3 text-[10px] font-mono text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    ATÉ 20 KG (BAÚ/BAG)
                  </span>
                </div>

                {/* 3. Comprovação Instantânea */}
                <div className="p-4 rounded-2xl border bg-slate-950/70 border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-sm">Entrega Comprovada</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Registro de foto e assinatura imediata no recebimento da carga.
                  </p>
                  <span className="inline-block mt-3 text-[10px] font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    HORÁRIO MARCADO
                  </span>
                </div>
              </div>

              {/* Call to Enter Main Hub */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
                <button
                  id="finish-intro-enter-site"
                  onClick={onComplete}
                  className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(245,158,11,0.5)] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
                  <span>ENTRAR NA PLATAFORMA COMPLETA</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setStage(1)}
                  className="w-full sm:w-auto py-3 px-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Voltar ao Raio
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 text-xs text-slate-400 font-mono pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  Grande SP e Interior
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Atendimento Ágil
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  Total Discrição
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation Bar */}
      <footer className="relative z-20 px-6 sm:px-12 py-4 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-between text-xs text-slate-500 font-mono">
        <span>ROTA SEGURA • LOGÍSTICA DE CONFIANÇA</span>
        <span>TECNOLOGIA & VELOCIDADE OPERACIONAL</span>
      </footer>
    </div>
  );
};
