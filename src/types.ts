// src/types.ts

export type LeadStatus =
  | 'Novo'
  | 'Contato realizado'
  | 'Cotação enviada'
  | 'Em negociação'
  | 'Cliente'
  | 'Sem interesse';

export interface QuizAnswers {
  tipoCliente: string;
  quantidadeEntregas: string;
  frequencia: string;
  peso: string;
  tipoMercadoria: string;
  horario: string;
  origemCidade: string;
  origemBairro: string;
  destinoCidade: string;
  destinoBairro: string;
  necessidade: string;
  interesseContrato: string;
}

export interface LeadContact {
  nome: string;
  empresa: string;
  telefone: string;
  email: string;
  cidade: string;
  bairro: string;
  cargo?: string;
  instagramOuSite?: string;
  observacoes?: string;
  consentimento: boolean;
}

export interface Lead {
  id: string;
  data: string; // ISO format or formatted
  nome: string;
  empresa: string;
  telefone: string;
  email: string;
  cidade: string;
  bairro: string;
  tipoCliente: string;
  quantidadeEntregas: string;
  frequencia: string;
  peso: string;
  tipoMercadoria: string;
  origem: string;
  destino: string;
  horario: string;
  necessidade: string;
  interesseRecorrencia: string;
  interesseContrato: string;
  observacoes: string;
  status: LeadStatus;
}
