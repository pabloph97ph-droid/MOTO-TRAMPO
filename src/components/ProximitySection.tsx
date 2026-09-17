// src/components/ProximitySection.tsx
import React from 'react';
import {
  MapPin,
  Zap,
  PhoneCall,
  Compass,
  Eye,
  LifeBuoy,
  Handshake,
  CalendarCheck
} from 'lucide-react';

export const ProximitySection: React.FC = () => {
  const points = [
    {
      icon: Zap,
      title: 'Retirada mais rápida',
      desc: 'Tempo de deslocamento reduzido até o ponto de coleta da sua mercadoria.'
    },
    {
      icon: PhoneCall,
      title: 'Comunicação direta',
      desc: 'Sem call centers impessoais: contato direto com a equipe operacional.'
    },
    {
      icon: Compass,
      title: 'Conhecimento das rotas locais',
      desc: 'Domínio dos acessos, horários de pico e particularidades da malha viária regional.'
    },
    {
      icon: Eye,
      title: 'Acompanhamento da operação',
      desc: 'Visibilidade e facilidade de alinhamento em cada etapa do trajeto.'
    },
    {
      icon: LifeBuoy,
      title: 'Resolução mais rápida de imprevistos',
      desc: 'Capacidade de agir com presteza caso ocorra qualquer mudança de rota ou instrução.'
    },
    {
      icon: Handshake,
      title: 'Criação de relacionamento comercial',
      desc: 'Construção de parceria duradoura com confiança e entendimento do seu negócio.'
    },
    {
      icon: CalendarCheck,
      title: 'Possibilidade de atendimento recorrente',
      desc: 'Planejamento de rotas diárias ou semanais alinhadas ao calendário da sua empresa.'
    }
  ];

  return (
    <section id="proximity-section" className="py-16 sm:py-24 bg-[#060A12] border-b border-slate-800/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Title area */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Presença Regional</span>
          </div>

          <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif] text-white">
            Por que trabalhar com uma operação próxima da sua empresa?
          </h2>

          {/* Mature Philosophy Quote Card */}
          <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#0F172A] border-l-4 border-amber-500 border-y border-r border-slate-800 text-left">
            <p className="text-sm sm:text-base font-semibold text-slate-200 leading-relaxed italic">
              &ldquo;Proximidade não substitui profissionalismo. Ela facilita a operação quando existe uma empresa preparada por trás.&rdquo;
            </p>
            <span className="block mt-2 text-xs text-amber-400 font-medium">
              — Princípio Operacional Rota Segura
            </span>
          </div>

          <p className="mt-6 text-sm sm:text-base text-slate-300 leading-relaxed">
            Ter uma base logística que conhece a Grande São Paulo e os eixos do interior traz vantagens práticas para o fluxo diário, minimizando atritos e garantindo alinhamento imediato.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {points.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/90 hover:border-slate-700 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3 text-amber-400">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white font-['Outfit',sans-serif] mb-1">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
