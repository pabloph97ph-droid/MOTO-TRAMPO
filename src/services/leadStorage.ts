// src/services/leadStorage.ts
import { Lead, LeadStatus, QuizAnswers, LeadContact } from '../types';

const STORAGE_KEY = 'rota_segura_leads_v1';

const INITIAL_SAMPLE_LEADS: Lead[] = [
  {
    id: 'lead-1001',
    data: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 min ago
    nome: 'Carlos Eduardo Mendes',
    empresa: 'Distribuidora Alpha Peças',
    telefone: '(11) 98765-4321',
    email: 'carlos.mendes@alphapecas.com.br',
    cidade: 'São Paulo',
    bairro: 'Mooca',
    tipoCliente: 'Empresa',
    quantidadeEntregas: '51 a 100 por mês',
    frequencia: 'Todos os dias',
    peso: '5 a 10 kg',
    tipoMercadoria: 'Peças',
    origem: 'São Paulo - Mooca',
    destino: 'Grande SP (diversos)',
    horario: 'Sim',
    necessidade: 'Estou procurando um parceiro logístico',
    interesseRecorrencia: 'Sim',
    interesseContrato: 'Sim, quero conhecer',
    observacoes: 'Precisamos de entregas urgentes de autopeças para oficinas em SP e ABC.',
    status: 'Novo'
  },
  {
    id: 'lead-1002',
    data: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    nome: 'Dra. Mariana Freitas',
    empresa: 'Freitas & Associados Advocacia',
    telefone: '(11) 97654-3210',
    email: 'contato@freitasadv.com.br',
    cidade: 'São Paulo',
    bairro: 'Bela Vista',
    tipoCliente: 'Escritório',
    quantidadeEntregas: '21 a 50 por mês',
    frequencia: 'Várias vezes por semana',
    peso: 'Até 5 kg',
    tipoMercadoria: 'Documentos',
    origem: 'São Paulo - Bela Vista',
    destino: 'São Paulo - Fóruns e Cartórios',
    horario: 'Sim',
    necessidade: 'Preciso toda semana',
    interesseRecorrencia: 'Sim',
    interesseContrato: 'Talvez',
    observacoes: 'Protocolos de petições e documentos confidenciais com comprovante assinado.',
    status: 'Em negociação'
  },
  {
    id: 'lead-1003',
    data: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), // yesterday
    nome: 'Roberto Silveira',
    empresa: 'TechPrint Gráfica Rápida',
    telefone: '(11) 99123-8877',
    email: 'comercial@techprint.com.br',
    cidade: 'Santo André',
    bairro: 'Campestre',
    tipoCliente: 'Loja',
    quantidadeEntregas: '6 a 20 por mês',
    frequencia: 'Toda semana',
    peso: '10 a 20 kg',
    tipoMercadoria: 'Materiais para empresas',
    origem: 'Santo André - Campestre',
    destino: 'São Paulo - Zona Sul',
    horario: 'Às vezes',
    necessidade: 'Preciso toda semana',
    interesseRecorrencia: 'Sim',
    interesseContrato: 'Sim, quero conhecer',
    observacoes: 'Material gráfico corporativo com entrega no mesmo dia.',
    status: 'Cotação enviada'
  }
];

export const LeadStorageService = {
  getLeads(): Lead[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Seed initial sample leads so user can see dashboard in action immediately
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_LEADS));
        return INITIAL_SAMPLE_LEADS;
      }
      return JSON.parse(stored) as Lead[];
    } catch (e) {
      console.error('Erro ao ler leads do storage:', e);
      return INITIAL_SAMPLE_LEADS;
    }
  },

  saveLeadFromQuiz(quiz: QuizAnswers, contact: LeadContact): Lead {
    const leads = this.getLeads();
    const newId = `lead-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const origem = `${quiz.origemCidade || 'SP'} - ${quiz.origemBairro || ''}`.trim();
    const destino = `${quiz.destinoCidade || 'SP'} - ${quiz.destinoBairro || ''}`.trim();
    const isRecorrente = quiz.necessidade.includes('semana') || quiz.necessidade.includes('dias') || quiz.necessidade.includes('parceiro');

    const newLead: Lead = {
      id: newId,
      data: new Date().toISOString(),
      nome: contact.nome.trim(),
      empresa: contact.empresa.trim(),
      telefone: contact.telefone.trim(),
      email: contact.email.trim(),
      cidade: contact.cidade.trim(),
      bairro: contact.bairro.trim(),
      tipoCliente: quiz.tipoCliente || 'Outro',
      quantidadeEntregas: quiz.quantidadeEntregas || 'A avaliar',
      frequencia: quiz.frequencia || 'Eventualmente',
      peso: quiz.peso || 'Até 20 kg',
      tipoMercadoria: quiz.tipoMercadoria || 'Diversos',
      origem: origem || 'Não especificada',
      destino: destino || 'Não especificada',
      horario: quiz.horario || 'Não especificado',
      necessidade: quiz.necessidade || 'Avaliar',
      interesseRecorrencia: isRecorrente ? 'Sim' : 'Pontual',
      interesseContrato: quiz.interesseContrato || 'Talvez',
      observacoes: [
        contact.cargo ? `Cargo: ${contact.cargo}` : '',
        contact.instagramOuSite ? `Site/Insta: ${contact.instagramOuSite}` : '',
        contact.observacoes ? `Obs: ${contact.observacoes}` : ''
      ].filter(Boolean).join(' | '),
      status: 'Novo'
    };

    const updated = [newLead, ...leads];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Erro ao salvar lead no storage:', e);
    }

    return newLead;
  },

  updateLeadStatus(id: string, status: LeadStatus): void {
    const leads = this.getLeads();
    const updated = leads.map(l => l.id === id ? { ...l, status } : l);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Erro ao atualizar status:', e);
    }
  },

  deleteLead(id: string): void {
    const leads = this.getLeads();
    const updated = leads.filter(l => l.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Erro ao deletar lead:', e);
    }
  },

  resetToInitialSample(): Lead[] {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_LEADS));
    } catch (e) {
      console.error(e);
    }
    return INITIAL_SAMPLE_LEADS;
  },

  exportCSV(leads: Lead[]): void {
    const headers = [
      'ID', 'Data', 'Status', 'Nome', 'Empresa', 'Telefone', 'Email',
      'Cidade', 'Bairro', 'Tipo Cliente', 'Volume Entregas', 'Frequência',
      'Peso', 'Mercadoria', 'Origem', 'Destino', 'Horário Programado',
      'Necessidade', 'Interesse Recorrência', 'Interesse Contrato', 'Observações'
    ];

    const rows = leads.map(l => [
      l.id,
      new Date(l.data).toLocaleString('pt-BR'),
      l.status,
      `"${(l.nome || '').replace(/"/g, '""')}"`,
      `"${(l.empresa || '').replace(/"/g, '""')}"`,
      `"${l.telefone || ''}"`,
      `"${l.email || ''}"`,
      `"${l.cidade || ''}"`,
      `"${l.bairro || ''}"`,
      `"${l.tipoCliente || ''}"`,
      `"${l.quantidadeEntregas || ''}"`,
      `"${l.frequencia || ''}"`,
      `"${l.peso || ''}"`,
      `"${l.tipoMercadoria || ''}"`,
      `"${(l.origem || '').replace(/"/g, '""')}"`,
      `"${(l.destino || '').replace(/"/g, '""')}"`,
      `"${l.horario || ''}"`,
      `"${(l.necessidade || '').replace(/"/g, '""')}"`,
      `"${l.interesseRecorrencia || ''}"`,
      `"${l.interesseContrato || ''}"`,
      `"${(l.observacoes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_rota_segura_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
