// src/components/DifferentialsSection.tsx
import React from 'react';
import {
  ShieldCheck,
  Eye,
  PhoneCall,
  FileCheck,
  Clock,
  Lock,
  CheckCircle
} from 'lucide-react';

export const DifferentialsSection: React.FC = () => {
  const cards = [
    {
      icon: ShieldCheck,
      badge: 'Proteção',
      title: 'SEGURO',
      description: 'Possibilidade de cobertura para a mercadoria conforme as condições da operação.'
    },
    {
      icon: Eye,
      badge: 'Visibilidade',
      title: 'ACOMPANHAMENTO',
      description: 'Você acompanha a operação e mantém contato com a equipe responsável.'
    },
    {
      icon: PhoneCall,
      badge: 'Comunicação',
      title: 'CONTATO DIRETO',
      description: 'Atendimento direto com a equipe da Rota Segura.'
    },
    {
      icon: FileCheck,
      badge: 'Protocolo',
      title: 'ENTREGA COMPROVADA',
      description: 'Registro da entrega conforme o serviço contratado.'
    },
    {
      icon: Clock,
      badge: 'Flexibilidade',
      title: 'HORÁRIO MARCADO',
      description: 'Opções para entregas urgentes e horários programados.'
    },
    {
      icon: Lock,
      badge: 'Sigilo',
      title: 'DISCRIÇÃO E RESPONSABILIDADE',
      description: 'Tratamento responsável da mercadoria e das informações da operação.'
    }
  ];

  return (
    <section id="differentials-section" className="py-16 sm:py-24 bg-[#070B14] border-b border-slate-800/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <CheckCircle className="w-3.5 h-3.5" />
            Diferenciais Estruturados
          </span>

          <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif] text-white">
            Padrões que sustentam a nossa operação
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-300">
            Linguagem transparente e compromissos operacionais viáveis para o seu dia a dia.
          </p>
        </div>

        {/* 6 Differential Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-[#0A101D] border border-slate-800 hover:border-amber-500/50 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/50">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-white font-['Outfit',sans-serif] tracking-wide mb-2">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/50 flex items-center gap-1 text-[11px] text-amber-400/80 font-medium">
                  <span>Conforme condições acordadas</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
