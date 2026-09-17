// src/utils/whatsapp.ts
import { APP_CONFIG } from '../config';
import { QuizAnswers, LeadContact, Lead } from '../types';

/**
 * Builds the pre-filled WhatsApp URL for a client sending their quote request
 */
export function buildClientQuoteWhatsAppUrl(
  quiz: QuizAnswers,
  contact: LeadContact,
  isContractFocus: boolean = false
): string {
  const origemStr = `${quiz.origemCidade || 'A definir'} - ${quiz.origemBairro || ''}`.trim();
  const destinoStr = `${quiz.destinoCidade || 'A definir'} - ${quiz.destinoBairro || ''}`.trim();

  const lines = [
    'Olá, Rota Segura! Vim pelo formulário de atendimento e gostaria de solicitar uma cotação.',
    isContractFocus ? '⭐ *[Foco em Operação Recorrente / Contrato]*' : '',
    '',
    `*Nome:* ${contact.nome}`,
    `*Empresa:* ${contact.empresa || 'Não informada / Pessoa Física'}`,
    contact.cargo ? `*Cargo/Função:* ${contact.cargo}` : '',
    `*WhatsApp:* ${contact.telefone}`,
    `*E-mail:* ${contact.email}`,
    `*Cidade/Bairro do Solicitante:* ${contact.cidade} / ${contact.bairro}`,
    `*Tipo de cliente:* ${quiz.tipoCliente || 'Não informado'}`,
    `*Quantidade aproximada de entregas:* ${quiz.quantidadeEntregas || 'A avaliar'}`,
    `*Frequência:* ${quiz.frequencia || 'Sob demanda'}`,
    `*Tipo de mercadoria:* ${quiz.tipoMercadoria || 'Diversos'}`,
    `*Peso aproximado:* ${quiz.peso || 'Até 20kg'}`,
    `*Origem:* ${origemStr}`,
    `*Destino:* ${destinoStr}`,
    `*Horário programado:* ${quiz.horario || 'Flexível'}`,
    `*Necessidade:* ${quiz.necessidade || 'Avaliar'}`,
    `*Interesse em atendimento recorrente:* ${quiz.necessidade.includes('semana') || quiz.necessidade.includes('dias') || quiz.necessidade.includes('parceiro') ? 'Sim' : 'Sob demanda'}`,
    `*Interesse em contrato:* ${quiz.interesseContrato || 'A consultar'}`,
    contact.observacoes ? `*Observações:* ${contact.observacoes}` : '',
    '',
    'Gostaria de conversar com a equipe para entender a melhor solução para minha operação.'
  ].filter(Boolean);

  const messageText = lines.join('\n');
  return `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(messageText)}`;
}

/**
 * Builds a direct follow-up message from the Rota Segura admin back to the lead
 */
export function buildAdminFollowUpWhatsAppUrl(lead: Lead): string {
  // Clean phone number: remove non-digits
  let cleanPhone = lead.telefone.replace(/\D/g, '');
  if (!cleanPhone.startsWith('55') && cleanPhone.length >= 10) {
    cleanPhone = `55${cleanPhone}`;
  }

  const greeting = `Olá, ${lead.nome}! Tudo bem? Sou da equipe da *ROTA SEGURA - Entregas Expressas*. Recebemos sua solicitação de cotação logistica${lead.empresa ? ` para a *${lead.empresa}*` : ''} e estou entrando em contato para estruturarmos o melhor modelo de atendimento para a sua operação. Como podemos te ajudar hoje?`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(greeting)}`;
}

/**
 * Builds a generic direct contact link to Rota Segura
 */
export function buildDirectWhatsAppUrl(contextMessage?: string): string {
  const defaultText = contextMessage || 'Olá, Rota Segura! Gostaria de falar com um especialista sobre entregas expressas para minha operação.';
  return `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(defaultText)}`;
}
