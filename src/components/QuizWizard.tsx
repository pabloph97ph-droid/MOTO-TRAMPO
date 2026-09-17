// src/components/QuizWizard.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuizAnswers, LeadContact, Lead } from '../types';
import { LeadStorageService } from '../services/leadStorage';
import { buildClientQuoteWhatsAppUrl } from '../utils/whatsapp';
import { APP_CONFIG } from '../config';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Building2,
  Store,
  Briefcase,
  User,
  Package,
  Layers,
  Repeat,
  Scale,
  Clock,
  MapPin,
  Send,
  Sparkles,
  AlertCircle,
  FileCheck2,
  Check,
  Phone,
  FileSignature
} from 'lucide-react';

interface QuizWizardProps {
  initialAnswers?: Partial<QuizAnswers>;
  onLeadCreated?: (lead: Lead) => void;
  onClose?: () => void;
}

const DEFAULT_QUIZ: QuizAnswers = {
  tipoCliente: '',
  quantidadeEntregas: '',
  frequencia: '',
  peso: '',
  tipoMercadoria: '',
  horario: '',
  origemCidade: 'São Paulo',
  origemBairro: '',
  destinoCidade: 'São Paulo',
  destinoBairro: '',
  necessidade: '',
  interesseContrato: ''
};

const DEFAULT_CONTACT: LeadContact = {
  nome: '',
  empresa: '',
  telefone: '',
  email: '',
  cidade: 'São Paulo',
  bairro: '',
  cargo: '',
  instagramOuSite: '',
  observacoes: '',
  consentimento: true
};

export const QuizWizard: React.FC<QuizWizardProps> = ({
  initialAnswers,
  onLeadCreated,
  onClose
}) => {
  // Steps: 1..10 (Questions), 11 (Contact Info), 12 (Personalized Result & WhatsApp)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    ...DEFAULT_QUIZ,
    ...initialAnswers
  });
  const [contact, setContact] = useState<LeadContact>(DEFAULT_CONTACT);
  const [createdLead, setCreatedLead] = useState<Lead | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isContractHighlight, setIsContractHighlight] = useState<boolean>(false);

  // Helper to check if the volume/profile indicates recurrent operations
  const isRecurrentNeed =
    answers.quantidadeEntregas === '21 a 50 por mês' ||
    answers.quantidadeEntregas === '51 a 100 por mês' ||
    answers.quantidadeEntregas === 'Mais de 100 por mês' ||
    answers.frequencia === 'Todos os dias' ||
    answers.frequencia === 'Várias vezes por semana' ||
    answers.frequencia === 'Várias vezes por dia' ||
    answers.necessidade === 'Preciso toda semana' ||
    answers.necessidade === 'Preciso todos os dias' ||
    answers.necessidade === 'Estou procurando um parceiro logístico' ||
    answers.interesseContrato === 'Sim, quero conhecer';

  const handleSelectOption = (field: keyof QuizAnswers, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    // Automatically advance after a brief tactile moment for single clicks
    setTimeout(() => {
      if (currentStep < 10) {
        setCurrentStep(prev => prev + 1);
      }
    }, 180);
  };

  const handleNext = () => {
    if (currentStep === 7) {
      if (!answers.origemCidade.trim()) {
        setErrors({ origemCidade: 'Por favor, informe a cidade de origem.' });
        return;
      }
      setErrors({});
    }
    if (currentStep === 8) {
      if (!answers.destinoCidade.trim()) {
        setErrors({ destinoCidade: 'Por favor, informe a cidade de destino.' });
        return;
      }
      setErrors({});
    }

    if (currentStep < 11) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const validateContactForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!contact.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!contact.empresa.trim() && answers.tipoCliente !== 'Pessoa física') {
      newErrors.empresa = 'Nome da empresa é obrigatório';
    }
    if (!contact.telefone.trim()) {
      newErrors.telefone = 'WhatsApp com DDD é obrigatório';
    } else {
      const digits = contact.telefone.replace(/\D/g, '');
      if (digits.length < 10) {
        newErrors.telefone = 'Informe um WhatsApp válido com DDD (ex: 11 98888-7777)';
      }
    }
    if (!contact.email.trim()) {
      newErrors.email = 'E-mail corporativo ou pessoal é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(contact.email)) {
      newErrors.email = 'E-mail com formato inválido';
    }
    if (!contact.cidade.trim()) newErrors.cidade = 'Cidade é obrigatória';
    if (!contact.bairro.trim()) newErrors.bairro = 'Bairro é obrigatório';
    if (!contact.consentimento) {
      newErrors.consentimento = 'É necessário concordar com o contato comercial';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContactForm()) return;

    setIsSubmitting(true);
    // Save to local storage persistence
    const saved = LeadStorageService.saveLeadFromQuiz(answers, contact);
    setCreatedLead(saved);
    if (onLeadCreated) {
      onLeadCreated(saved);
    }
    setIsSubmitting(false);
    setCurrentStep(12); // Go to Result Step
  };

  const handleOpenWhatsApp = (contractFocus: boolean = false) => {
    const url = buildClientQuoteWhatsAppUrl(answers, contact, contractFocus);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Step indicator calculation (steps 1..10 = 10% to 100%, step 11 = 95%, step 12 = 100%)
  const progressPercent =
    currentStep <= 10
      ? Math.round((currentStep / 10) * 85)
      : currentStep === 11
      ? 92
      : 100;

  return (
    <div id="commercial-quiz-container" className="max-w-2xl mx-auto px-4 sm:px-6">
      {/* Quiz Outer Shell */}
      <div className="rounded-3xl bg-[#091122] border border-amber-500/30 p-5 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Subtle Ambient Light */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header & Progress */}
        {currentStep <= 11 && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Diagnóstico Comercial Rota Segura</span>
              </div>
              <span className="font-mono text-slate-300">
                {currentStep <= 10 ? `Pergunta ${currentStep} de 10` : 'Dados de Contato'}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-500 mt-1.5 flex items-center justify-between">
              <span>Leva menos de 2 minutos</span>
              <span>Você não precisa saber todos os detalhes agora</span>
            </p>
          </div>
        )}

        {/* QUESTIONS STAGE */}
        <AnimatePresence mode="wait">
          {/* STEP 1: Quem precisa das entregas */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-4"
            >
              <h2 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] text-white">
                Quem precisa das entregas?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Selecione o perfil que melhor define a sua necessidade.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { label: 'Empresa', icon: Building2, desc: 'Operações B2B, indústrias e distribuição' },
                  { label: 'Escritório', icon: Briefcase, desc: 'Advocacia, contabilidade e consultorias' },
                  { label: 'Loja', icon: Store, desc: 'Comércio, e-commerce e varejo' },
                  { label: 'Profissional autônomo', icon: User, desc: 'Prestadores de serviço e técnicos' },
                  { label: 'Pessoa física', icon: User, desc: 'Envio pessoal pontual' },
                  { label: 'Outro', icon: Package, desc: 'Outros segmentos' }
                ].map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = answers.tipoCliente === opt.label;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => handleSelectOption('tipoCliente', opt.label)}
                      className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all duration-150 ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400 text-white shadow-md shadow-amber-500/10'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : 'bg-slate-800 text-amber-400'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-sm font-bold block text-white">{opt.label}</span>
                        <span className="text-[11px] text-slate-400 block mt-0.5">{opt.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Quantas entregas você precisa realizar */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-4"
            >
              <h2 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] text-white">
                Quantas entregas você precisa realizar?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Uma estimativa do volume mensal para dimensionarmos o melhor formato.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  '1 a 5 por mês',
                  '6 a 20 por mês',
                  '21 a 50 por mês',
                  '51 a 100 por mês',
                  'Mais de 100 por mês',
                  'Ainda não sei'
                ].map((vol) => {
                  const isSelected = answers.quantidadeEntregas === vol;
                  return (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => handleSelectOption('quantidadeEntregas', vol)}
                      className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400 text-white'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-sm font-bold">{vol}</span>
                      {isSelected ? (
                        <Check className="w-4 h-4 text-amber-400" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-700" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Frequência */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-4"
            >
              <h2 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] text-white">
                Com que frequência você precisa de entregas?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Isso ajuda a entender se você precisa de chamados avulsos ou rotinas programadas.
              </p>

              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {[
                  { label: 'Eventualmente', desc: 'Apenas quando surgir uma demanda esporádica' },
                  { label: 'Toda semana', desc: 'Pelo menos um ou dois envios por semana' },
                  { label: 'Várias vezes por semana', desc: 'Fluxo constante em dias alternados' },
                  { label: 'Todos os dias', desc: 'Operação diária com saídas regulares' },
                  { label: 'Várias vezes por dia', desc: 'Alto giro com coletas e entregas contínuas' }
                ].map((freq) => {
                  const isSelected = answers.frequencia === freq.label;
                  return (
                    <button
                      key={freq.label}
                      type="button"
                      onClick={() => handleSelectOption('frequencia', freq.label)}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400 text-white'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <span className="text-sm font-bold block text-white">{freq.label}</span>
                        <span className="text-xs text-slate-400">{freq.desc}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 4: Peso aproximado */}
          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-4"
            >
              <h2 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] text-white">
                Qual é o peso aproximado das mercadorias?
              </h2>

              {/* Informative banner about standard limit */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
                <Scale className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  A Rota Segura atende cargas em moto com limite padrão de <strong>até 20 kg</strong>. Cargas acima desse limite passam por avaliação operacional especial.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { label: 'Até 5 kg', desc: 'Malotes, envelopes e caixas compactas' },
                  { label: '5 a 10 kg', desc: 'Peças médias, kits e pacotes médios' },
                  { label: '10 a 20 kg', desc: 'Carga padrão limite expressa' },
                  { label: 'Mais de 20 kg', desc: 'Sob avaliação da equipe' },
                  { label: 'Preciso avaliar', desc: 'Pesos variáveis conforme o pedido' }
                ].map((w) => {
                  const isSelected = answers.peso === w.label;
                  return (
                    <button
                      key={w.label}
                      type="button"
                      onClick={() => handleSelectOption('peso', w.label)}
                      className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400 text-white'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-sm font-bold text-white">{w.label}</span>
                      <span className="text-[11px] text-slate-400 mt-1">{w.desc}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 5: Tipo de mercadoria */}
          {currentStep === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-4"
            >
              <h2 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] text-white">
                Que tipo de entrega você normalmente precisa?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Identifique os itens mais frequentes no seu transporte.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Documentos',
                  'Pequenos produtos',
                  'Peças',
                  'Materiais para empresas',
                  'Encomendas',
                  'Outro'
                ].map((tipo) => {
                  const isSelected = answers.tipoMercadoria === tipo;
                  return (
                    <button
                      key={tipo}
                      type="button"
                      onClick={() => handleSelectOption('tipoMercadoria', tipo)}
                      className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400 text-white'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-sm font-bold">{tipo}</span>
                      {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 6: Horário programado */}
          {currentStep === 6 && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-4"
            >
              <h2 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] text-white">
                Você precisa de horário programado?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Janelas de tempo específicas para coleta ou entrega em horário determinado.
              </p>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {[
                  { label: 'Sim', desc: 'Preciso de horários rigorosos de retirada ou entrega' },
                  { label: 'Não', desc: 'Horário flexível ao longo do dia útil' },
                  { label: 'Às vezes', desc: 'Depende da urgência ou do cliente atendido' }
                ].map((h) => {
                  const isSelected = answers.horario === h.label;
                  return (
                    <button
                      key={h.label}
                      type="button"
                      onClick={() => handleSelectOption('horario', h.label)}
                      className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400 text-white'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <span className="text-sm font-bold block text-white">{h.label}</span>
                        <span className="text-xs text-slate-400">{h.desc}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 7: Origem */}
          {currentStep === 7 && (
            <motion.div
              key="step-7"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-4"
            >
              <h2 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] text-white">
                De onde normalmente saem suas entregas?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Ponto de partida / coleta mais frequente.
              </p>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Cidade de Saída *
                  </label>
                  <input
                    type="text"
                    value={answers.origemCidade}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, origemCidade: e.target.value }))
                    }
                    placeholder="Ex: São Paulo, Santo André, Campinas..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                  />
                  {errors.origemCidade && (
                    <span className="text-[11px] text-red-400 mt-1 block">
                      {errors.origemCidade}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Bairro de Saída (ou região)
                  </label>
                  <input
                    type="text"
                    value={answers.origemBairro}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, origemBairro: e.target.value }))
                    }
                    placeholder="Ex: Mooca, Centro, Pinheiros, Industrial..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full py-3.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <span>Continuar para Destino</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 8: Destino */}
          {currentStep === 8 && (
            <motion.div
              key="step-8"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-4"
            >
              <h2 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] text-white">
                Para onde normalmente vão suas entregas?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Ponto de entrega ou raio de destino habitual.
              </p>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Cidade de Destino *
                  </label>
                  <input
                    type="text"
                    value={answers.destinoCidade}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, destinoCidade: e.target.value }))
                    }
                    placeholder="Ex: São Paulo, Guarulhos, Osasco, Interior..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                  />
                  {errors.destinoCidade && (
                    <span className="text-[11px] text-red-400 mt-1 block">
                      {errors.destinoCidade}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Bairro de Destino (ou múltiplos bairros)
                  </label>
                  <input
                    type="text"
                    value={answers.destinoBairro}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, destinoBairro: e.target.value }))
                    }
                    placeholder="Ex: Itaim Bibi, Região Central, Grande SP diversa..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full py-3.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <span>Continuar para Modelo de Atendimento</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 9: Solução pontual ou recorrente */}
          {currentStep === 9 && (
            <motion.div
              key="step-9"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-4"
            >
              <h2 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] text-white">
                Você procura uma solução pontual ou recorrente?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Selecione o horizonte temporal da sua necessidade.
              </p>

              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {[
                  'Preciso de uma entrega agora',
                  'Preciso eventualmente',
                  'Preciso toda semana',
                  'Preciso todos os dias',
                  'Estou procurando um parceiro logístico'
                ].map((opt) => {
                  const isSelected = answers.necessidade === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSelectOption('necessidade', opt)}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400 text-white'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-sm font-bold">{opt}</span>
                      {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 10: Interesse em solução comercial recorrente */}
          {currentStep === 10 && (
            <motion.div
              key="step-10"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-4"
            >
              <h2 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] text-white">
                Você teria interesse em uma solução comercial recorrente?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Possibilidade de negociação de condições comerciais para operações recorrentes.
              </p>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {[
                  {
                    label: 'Sim, quero conhecer',
                    desc: 'Desejo avaliar condições comerciais para rotas ou pacotes periódicos'
                  },
                  {
                    label: 'Talvez',
                    desc: 'Dependendo do volume e da viabilidade operacional'
                  },
                  {
                    label: 'Não neste momento',
                    desc: 'Apenas para cotações pontuais sob demanda'
                  }
                ].map((c) => {
                  const isSelected = answers.interesseContrato === c.label;
                  return (
                    <button
                      key={c.label}
                      type="button"
                      onClick={() => {
                        setAnswers(prev => ({ ...prev, interesseContrato: c.label }));
                        setTimeout(() => setCurrentStep(11), 200);
                      }}
                      className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400 text-white'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <span className="text-sm font-bold block text-white">{c.label}</span>
                        <span className="text-xs text-slate-400">{c.desc}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 11: Dados de Contato */}
          {currentStep === 11 && (
            <motion.form
              key="step-11"
              onSubmit={handleContactSubmit}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-4"
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] text-white">
                  Perfeito. Agora só precisamos de alguns dados para entender sua operação.
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Nossa equipe avalia sua necessidade antes de indicar a melhor solução.
                </p>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {/* Nome */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Seu Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={contact.nome}
                    onChange={(e) => setContact(prev => ({ ...prev, nome: e.target.value }))}
                    placeholder="Ex: João da Silva"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                  />
                  {errors.nome && <span className="text-[11px] text-red-400 mt-1 block">{errors.nome}</span>}
                </div>

                {/* Nome da Empresa */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nome da Empresa {answers.tipoCliente === 'Pessoa física' ? '(Opcional)' : '*'}
                  </label>
                  <input
                    type="text"
                    value={contact.empresa}
                    onChange={(e) => setContact(prev => ({ ...prev, empresa: e.target.value }))}
                    placeholder={answers.tipoCliente === 'Pessoa física' ? 'Uso pessoal ou Nome' : 'Ex: Distribuidora Alpha'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                  />
                  {errors.empresa && <span className="text-[11px] text-red-400 mt-1 block">{errors.empresa}</span>}
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    WhatsApp (com DDD) *
                  </label>
                  <input
                    type="tel"
                    value={contact.telefone}
                    onChange={(e) => setContact(prev => ({ ...prev, telefone: e.target.value }))}
                    placeholder="Ex: 11 98888-7777"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                  />
                  {errors.telefone && <span className="text-[11px] text-red-400 mt-1 block">{errors.telefone}</span>}
                </div>

                {/* E-mail */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    E-mail de Contato *
                  </label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) => setContact(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Ex: contato@empresa.com.br"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                  />
                  {errors.email && <span className="text-[11px] text-red-400 mt-1 block">{errors.email}</span>}
                </div>

                {/* Cidade */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    value={contact.cidade}
                    onChange={(e) => setContact(prev => ({ ...prev, cidade: e.target.value }))}
                    placeholder="Ex: São Paulo"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                  />
                  {errors.cidade && <span className="text-[11px] text-red-400 mt-1 block">{errors.cidade}</span>}
                </div>

                {/* Bairro */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Bairro *
                  </label>
                  <input
                    type="text"
                    value={contact.bairro}
                    onChange={(e) => setContact(prev => ({ ...prev, bairro: e.target.value }))}
                    placeholder="Ex: Mooca / Centro"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                  />
                  {errors.bairro && <span className="text-[11px] text-red-400 mt-1 block">{errors.bairro}</span>}
                </div>

                {/* Cargo (opcional) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Cargo / Função (Opcional)
                  </label>
                  <input
                    type="text"
                    value={contact.cargo}
                    onChange={(e) => setContact(prev => ({ ...prev, cargo: e.target.value }))}
                    placeholder="Ex: Gerente Comercial / Logística"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>

                {/* Instagram / Site (opcional) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Instagram ou Site (Opcional)
                  </label>
                  <input
                    type="text"
                    value={contact.instagramOuSite}
                    onChange={(e) => setContact(prev => ({ ...prev, instagramOuSite: e.target.value }))}
                    placeholder="Ex: @empresa ou site.com.br"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Observações */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Observações ou Detalhes da sua Operação (Opcional)
                </label>
                <textarea
                  rows={2}
                  value={contact.observacoes}
                  onChange={(e) => setContact(prev => ({ ...prev, observacoes: e.target.value }))}
                  placeholder="Ex: Preciso de coleta diária às 14h, ou transporte de material frágil com protocolo assinado."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none resize-none"
                />
              </div>

              {/* LGPD Consent */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={contact.consentimento}
                    onChange={(e) => setContact(prev => ({ ...prev, consentimento: e.target.checked }))}
                    className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500"
                  />
                  <span className="text-[11px] text-slate-400 leading-tight">
                    Concordo em receber contato comercial da <strong>Rota Segura</strong> para cotação e alinhamento logístico conforme a legislação aplicável (LGPD).
                  </span>
                </label>
                {errors.consentimento && (
                  <span className="text-[11px] text-red-400 mt-1 block">{errors.consentimento}</span>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-amber-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <FileCheck2 className="w-5 h-5 text-slate-950" />
                  <span>GERAR MEU PERFIL DE ENTREGA</span>
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 12: RESULTADO PERSONALIZADO + FOCO EM CONTRATOS + WHATSAPP */}
          {currentStep === 12 && (
            <motion.div
              key="step-12"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-['Outfit',sans-serif] text-white">
                  Seu perfil de entrega está pronto.
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg mx-auto">
                  Com essas informações, nossa equipe consegue entender melhor sua necessidade e avaliar a melhor forma de atendimento.
                </p>
              </div>

              {/* Personalized Profile Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-amber-500/40 divide-y divide-slate-800/80 text-xs sm:text-sm shadow-xl">
                <div className="pb-3 flex justify-between items-center">
                  <span className="text-slate-400 font-medium">Perfil Solicitante:</span>
                  <span className="font-bold text-white font-['Outfit',sans-serif]">
                    {contact.empresa ? `${contact.empresa} (${answers.tipoCliente || 'Corporativo'})` : (answers.tipoCliente || 'Pessoa física')}
                  </span>
                </div>

                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-slate-400 font-medium">Volume Estimado:</span>
                  <span className="font-bold text-amber-300">
                    {answers.quantidadeEntregas || 'A consultar'}
                  </span>
                </div>

                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-slate-400 font-medium">Frequência Operacional:</span>
                  <span className="font-semibold text-white">
                    {answers.frequencia || 'Sob demanda'}
                  </span>
                </div>

                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-slate-400 font-medium">Peso Estimado:</span>
                  <span className="font-semibold text-white">
                    {answers.peso || 'Até 20 kg'}
                  </span>
                </div>

                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-slate-400 font-medium">Origem da Carga:</span>
                  <span className="font-semibold text-slate-200">
                    {answers.origemCidade} {answers.origemBairro ? `(${answers.origemBairro})` : ''}
                  </span>
                </div>

                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-slate-400 font-medium">Destino da Carga:</span>
                  <span className="font-semibold text-slate-200">
                    {answers.destinoCidade} {answers.destinoBairro ? `(${answers.destinoBairro})` : ''}
                  </span>
                </div>

                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-slate-400 font-medium">Horário Programado:</span>
                  <span className="font-semibold text-white">
                    {answers.horario || 'Flexível'}
                  </span>
                </div>

                <div className="pt-3 flex justify-between items-center">
                  <span className="text-slate-400 font-medium">Interesse Operacional:</span>
                  <span className="font-bold text-amber-400">
                    {isRecurrentNeed ? 'Recorrente / Contrato' : 'Pontual'}
                  </span>
                </div>
              </div>

              {/* SPECIAL CONTRACT FOCUS BLOCK (Section 11) */}
              {isRecurrentNeed && (
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-500/15 via-slate-900 to-[#0A1120] border-2 border-amber-500/60 shadow-lg text-left">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <FileSignature className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider font-mono">
                      Oportunidade de Operação Recorrente
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-['Outfit',sans-serif] text-white">
                    Sua empresa pode precisar de mais do que uma entrega. Pode precisar de uma operação.
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Quando existe frequência, volume e necessidade de previsibilidade, podemos avaliar uma solução recorrente para sua empresa.
                  </p>

                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                    <span>Possibilidade de negociação de condições comerciais para operações recorrentes.</span>
                  </div>

                  <div className="mt-4">
                    <button
                      id="contract-special-whatsapp-cta"
                      type="button"
                      onClick={() => handleOpenWhatsApp(true)}
                      className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      <span>QUERO FALAR SOBRE UM CONTRATO</span>
                    </button>
                  </div>
                </div>
              )}

              {/* PRIMARY WHATSAPP CTA (Section 12) */}
              <div className="space-y-3 pt-2">
                <button
                  id="submit-whatsapp-primary-cta"
                  type="button"
                  onClick={() => handleOpenWhatsApp(false)}
                  className="w-full py-4 sm:py-5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-black text-sm sm:text-base shadow-xl shadow-emerald-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-3"
                >
                  <Send className="w-5 h-5" />
                  <span>ENVIAR MINHA SOLICITAÇÃO PELO WHATSAPP</span>
                </button>

                <p className="text-center text-xs text-slate-400">
                  O WhatsApp da Rota Segura abrirá com todas as suas informações organizadas.
                </p>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-slate-500 hover:text-slate-300 underline transition-colors"
                  >
                    Editar respostas ou fazer nova cotação
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Back Button (Steps 2 to 11) */}
        {currentStep > 1 && currentStep <= 11 && (
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors py-1 px-2 -ml-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>

            <span className="text-[11px] text-slate-500">
              {currentStep <= 10 ? `Passo ${currentStep} de 10` : 'Etapa Final'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
