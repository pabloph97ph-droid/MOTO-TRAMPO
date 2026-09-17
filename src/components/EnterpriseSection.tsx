// src/components/EnterpriseSection.tsx
import React from 'react';
import {
  Building2,
  CalendarDays,
  CalendarRange,
  Zap,
  Route,
  Clock4,
  Briefcase,
  FileSignature,
  ArrowRight
} from 'lucide-react';

interface EnterpriseSectionProps {
  onStartEnterpriseQuiz: () => void;
}

export const EnterpriseSection: React.FC<EnterpriseSectionProps> = ({
  onStartEnterpriseQuiz
}) => {
  const possibilities = [
    {
      icon: CalendarDays,
      title: 'Entregas diárias',
      desc: 'Rotinas matutinas e vespertinas com horário fixo de coleta.'
    },
    {
      icon: CalendarRange,
      title: 'Entregas semanais',
      desc: 'Dias específicos para faturamento, malotes ou reposição de mercadoria.'
    },
    {
      icon: Zap,
      title: 'Entregas sob demanda',
      desc: 'Chamados imediatos prioritários quando surge uma urgência comercial.'
    },
    {
      icon: Route,
      title: 'Rotas programadas',
      desc: 'Otimização de múltiplos pontos em um único circuito logístico.'
    },
    {
      icon: Clock4,
      title: 'Horários específicos',
      desc: 'Alinhamento fino para entregas antes da abertura de lojas ou fechamento de escritórios.'
    },
    {
      icon: Briefcase,
      title: 'Atendimento empresarial',
      desc: 'Canal exclusivo direto com a equipe operacional da Rota Segura.'
    },
    {
      icon: FileSignature,
      title: 'Possibilidade de contrato recorrente',
      desc: 'Previsibilidade de faturamento e tabela comercial personalizada conforme volume.'
    }
  ];

  return (
    <section id="enterprise-section" className="py-16 sm:py-24 bg-[#080E1B] border-b border-slate-800/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-[#0B1325] to-[#080E1A] border border-amber-500/30 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Heading */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Soluções B2B & Corporativas</span>
            </div>

            <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif] text-white leading-tight">
              Quantas entregas sua empresa faz por semana?
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-200 font-medium">
              Se sua empresa realiza entregas com frequência, talvez você não precise contratar uma solução diferente a cada pedido.
            </p>

            <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
              Podemos estruturar uma operação recorrente de acordo com a sua necessidade, garantindo padrão de atendimento, pontualidade e previsibilidade para a sua rotina.
            </p>
          </div>

          {/* Possibilities Grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {possibilities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/90 hover:border-amber-500/30 transition-colors flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white font-['Outfit',sans-serif]">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Box */}
          <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-sm font-bold text-white block">
                Pronto para profissionalizar as rotas do seu negócio?
              </span>
              <span className="text-xs text-slate-400">
                Apresentamos propostas operacionais alinhadas ao seu volume semanal ou mensal.
              </span>
            </div>

            <button
              id="enterprise-cta-button"
              onClick={onStartEnterpriseQuiz}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm shadow-md active:scale-95 transition-all whitespace-nowrap"
            >
              <span>QUERO CONHECER UMA SOLUÇÃO PARA MINHA EMPRESA</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
