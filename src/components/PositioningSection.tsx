// src/components/PositioningSection.tsx
import React from 'react';
import {
  UserCheck,
  Radar,
  ShieldAlert,
  MessageSquareShare,
  FileCheck2,
  Clock3,
  Repeat,
  Sparkles
} from 'lucide-react';

interface PositioningSectionProps {
  onStartQuiz: () => void;
}

export const PositioningSection: React.FC<PositioningSectionProps> = ({ onStartQuiz }) => {
  const factors = [
    {
      icon: UserCheck,
      title: 'Quem está transportando',
      description: 'Profissionais alinhados com postura comercial e respeito à sua marca.'
    },
    {
      icon: Radar,
      title: 'Acompanhamento da operação',
      description: 'Você sabe em que fase está sua demanda do início ao fim.'
    },
    {
      icon: ShieldAlert,
      title: 'Responsabilidade sobre a mercadoria',
      description: 'Cuidado real com pacotes, documentos e materiais de alto valor.'
    },
    {
      icon: MessageSquareShare,
      title: 'Comunicação durante o percurso',
      description: 'Canal ágil para tirar dúvidas, alinhar horários e tratar imprevistos.'
    },
    {
      icon: FileCheck2,
      title: 'Confirmação da entrega',
      description: 'Registro e validação do recebimento conforme o padrão acordado.'
    },
    {
      icon: Clock3,
      title: 'Cumprimento de horários',
      description: 'Pontualidade para respeitar compromissos corporativos e prazos.'
    },
    {
      icon: Repeat,
      title: 'Capacidade para demandas recorrentes',
      description: 'Estrutura pronta para atender o fluxo diário ou semanal da sua empresa.'
    }
  ];

  return (
    <section id="positioning-section" className="py-16 sm:py-24 bg-[#070C16] border-b border-slate-800/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-amber-400 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Posicionamento Comercial
          </span>

          <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif] text-white leading-tight">
            Quando uma entrega é importante, confiança não pode ser improvisada.
          </h2>

          <div className="mt-6 p-4 sm:p-6 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-left sm:text-center max-w-2xl mx-auto">
            <p className="text-base sm:text-xl font-bold text-amber-200 leading-snug">
              &ldquo;Para uma entrega comum, você procura rapidez.<br />
              Para uma entrega importante, você procura confiança.&rdquo;
            </p>
          </div>

          <p className="mt-6 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Uma entrega profissional não envolve apenas velocidade. Envolve processos claros, responsabilidade com os ativos transportados e previsibilidade operacional tanto para demandas pontuais urgentes quanto para contratos recorrentes.
          </p>
        </div>

        {/* Factors Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {factors.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-colors flex flex-col justify-start"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-3.5 text-amber-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 font-['Outfit',sans-serif]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}

          {/* Recurrent CTA Card */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/50 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-wider text-amber-400 uppercase bg-amber-500/20 px-2 py-0.5 rounded">
                Pontual ou Recorrente
              </span>
              <h3 className="mt-2 text-base font-bold text-white font-['Outfit',sans-serif]">
                Estrutura sob medida para sua operação
              </h3>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                Atendemos desde uma necessidade urgente hoje até rotas fixas diárias para seu negócio.
              </p>
            </div>
            <button
              onClick={onStartQuiz}
              className="mt-4 w-full py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors text-center"
            >
              Fazer Diagnóstico Rápido
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
