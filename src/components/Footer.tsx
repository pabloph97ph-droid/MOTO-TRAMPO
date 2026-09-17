// src/components/Footer.tsx
import React, { useState } from 'react';
import { Logo } from './Logo';
import { APP_CONFIG } from '../config';
import { buildDirectWhatsAppUrl } from '../utils/whatsapp';
import { LegalModals } from './LegalModals';
import { Phone, MapPin, ShieldCheck, LockKeyhole } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onStartQuiz: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onStartQuiz }) => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer id="main-footer" className="bg-[#050810] border-t border-slate-800/80 pt-12 pb-24 sm:pb-12 text-slate-400 text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-slate-800/60">
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-3">
            <Logo size="md" />
            <p className="text-slate-300 font-medium text-sm">
              Entregas para empresas, escritórios e pessoas.
            </p>
            <p className="text-slate-400 text-xs flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{APP_CONFIG.coverageArea}.</span>
            </p>
          </div>

          {/* Col 2: Contato & Atendimento */}
          <div className="space-y-2">
            <h4 className="text-white font-bold font-['Outfit',sans-serif] text-sm uppercase tracking-wider">
              Contato & WhatsApp
            </h4>
            <p className="text-xs text-slate-400">
              Atendimento direto com a equipe operacional:
            </p>
            <a
              href={buildDirectWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold text-sm transition-colors py-1"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp: {APP_CONFIG.whatsappDisplay}</span>
            </a>
            <p className="text-[11px] text-slate-500 mt-1">
              {APP_CONFIG.businessHours}
            </p>
          </div>

          {/* Col 3: Links Institucionais & Gestão */}
          <div className="space-y-2">
            <h4 className="text-white font-bold font-['Outfit',sans-serif] text-sm uppercase tracking-wider">
              Institucional
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={onStartQuiz}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Cotação Expressa de Entregas
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('privacy')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Política de Privacidade
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('terms')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Termos de Uso
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-amber-400 transition-colors"
                >
                  <LockKeyhole className="w-3 h-3" />
                  <span>Área Comercial / Gestão de Leads</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3 text-center sm:text-left">
          <span>
            © {new Date().getFullYear()} {APP_CONFIG.companyName} - {APP_CONFIG.subtitle}. Todos os direitos reservados.
          </span>
          <span className="flex items-center gap-1.5 text-amber-500/80">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Transporte com responsabilidade operacional</span>
          </span>
        </div>
      </div>

      {/* Legal Modals */}
      <LegalModals
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        type={activeModal || 'privacy'}
      />
    </footer>
  );
};
