// src/components/LegalModals.tsx
import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';
import { APP_CONFIG } from '../config';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export const LegalModals: React.FC<ModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-amber-400">
            {type === 'privacy' ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
              {type === 'privacy' ? 'Política de Privacidade & Proteção de Dados' : 'Termos de Uso e Condições Gerais'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {type === 'privacy' ? (
          <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
            <p>
              A <strong>ROTA SEGURA - ENTREGAS EXPRESSAS</strong> preza pela segurança, confidencialidade e privacidade de todas as informações compartilhadas por clientes e parceiros corporativos.
            </p>
            <h4 className="font-bold text-white text-sm">1. Coleta e Finalidade dos Dados</h4>
            <p>
              Os dados coletados neste formulário comercial (nome, empresa, telefone, e-mail, pontos de origem e destino, volume e mercadoria) têm como finalidade exclusiva a análise da necessidade logística, elaboração de proposta comercial e contato direto via WhatsApp ou e-mail.
            </p>
            <h4 className="font-bold text-white text-sm">2. Compartilhamento e Sigilo</h4>
            <p>
              A Rota Segura não comercializa e não compartilha dados com terceiros para fins de marketing. O acesso aos dados é restrito à equipe operacional e comercial responsável pelo atendimento do pedido.
            </p>
            <h4 className="font-bold text-white text-sm">3. Direitos do Titular (LGPD)</h4>
            <p>
              Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), o titular tem o direito de solicitar a confirmação, correção ou exclusão de seus dados a qualquer momento através do nosso canal de atendimento: {APP_CONFIG.whatsappDisplay}.
            </p>
          </div>
        ) : (
          <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
            <p>
              Estes Termos regulam a utilização da plataforma digital de cotação e diagnóstico comercial da <strong>ROTA SEGURA - ENTREGAS EXPRESSAS</strong>.
            </p>
            <h4 className="font-bold text-white text-sm">1. Natureza da Plataforma</h4>
            <p>
              Este ambiente destina-se a realizar um diagnóstico operacional inicial e direcionar a demanda para atendimento humano direto da equipe Rota Segura. O preenchimento do formulário não configura celebração imediata de contrato sem prévia validação operacional mútua.
            </p>
            <h4 className="font-bold text-white text-sm">2. Limites de Carga e Cobertura</h4>
            <p>
              O atendimento padrão em modalidade expressa com moto compreende volumes com peso de até <strong>{APP_CONFIG.maxStandardWeightKg} kg</strong> com dimensões compatíveis com baú/mochila técnica. Volumes excedentes ou especiais demandam prévia análise operacional.
            </p>
            <p>
              A área de atuação primária compreende a <strong>{APP_CONFIG.coverageArea}</strong>.
            </p>
            <h4 className="font-bold text-white text-sm">3. Condições Comerciais e Operações Recorrentes</h4>
            <p>
              Condições de faturamento mensal, rotas fixas diárias ou semanais e acordos de nível de serviço (SLA) são estabelecidos formalmente em proposta comercial específica após o contato inicial.
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
