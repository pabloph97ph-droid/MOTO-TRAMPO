// src/components/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Lead, LeadStatus } from '../types';
import { LeadStorageService } from '../services/leadStorage';
import { buildAdminFollowUpWhatsAppUrl } from '../utils/whatsapp';
import { APP_CONFIG } from '../config';
import {
  Users,
  Building2,
  FileSignature,
  Repeat,
  Package,
  Clock,
  CheckCircle,
  Phone,
  Search,
  Download,
  Filter,
  Eye,
  Trash2,
  Lock,
  Unlock,
  RefreshCw,
  X,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
}

const ALL_STATUSES: LeadStatus[] = [
  'Novo',
  'Contato realizado',
  'Cotação enviada',
  'Em negociação',
  'Cliente',
  'Sem interesse'
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcodeInput, setPasscodeInput] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState<string>('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    // Load leads
    const data = LeadStorageService.getLeads();
    setLeads(data);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput.trim() === APP_CONFIG.adminPasscode || passcodeInput.trim() === 'admin') {
      setIsAuthenticated(true);
      setPasscodeError('');
    } else {
      setPasscodeError('Código de acesso incorreto. Dica: rota2025');
    }
  };

  const handleQuickUnlock = () => {
    setIsAuthenticated(true);
    setPasscodeError('');
  };

  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    LeadStorageService.updateLeadStatus(id, newStatus);
    setLeads(prev => prev.map(l => (l.id === id ? { ...l, status: newStatus } : l)));
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(prev => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleDeleteLead = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este lead?')) {
      LeadStorageService.deleteLead(id);
      setLeads(prev => prev.filter(l => l.id !== id));
      if (selectedLead?.id === id) setSelectedLead(null);
    }
  };

  const handleResetSample = () => {
    const fresh = LeadStorageService.resetToInitialSample();
    setLeads(fresh);
  };

  const handleExportCSV = () => {
    LeadStorageService.exportCSV(leads);
  };

  // Metrics computation
  const totalLeads = leads.length;
  const companyLeads = leads.filter(l => l.tipoCliente === 'Empresa' || (l.empresa && l.empresa.trim() !== '')).length;
  const contractInterestLeads = leads.filter(l => l.interesseContrato === 'Sim, quero conhecer').length;
  const recurrentLeads = leads.filter(l => l.interesseRecorrencia === 'Sim').length;
  const newLeads = leads.filter(l => l.status === 'Novo').length;
  const inNegotiationLeads = leads.filter(l => l.status === 'Em negociação').length;
  const closedClients = leads.filter(l => l.status === 'Cliente').length;

  // Filtered list
  const filteredLeads = leads.filter(l => {
    const matchesStatus = statusFilter === 'todos' || l.status === statusFilter;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      l.nome.toLowerCase().includes(term) ||
      l.empresa.toLowerCase().includes(term) ||
      l.telefone.toLowerCase().includes(term) ||
      l.cidade.toLowerCase().includes(term);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadgeColor = (status: LeadStatus) => {
    switch (status) {
      case 'Novo':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Contato realizado':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'Cotação enviada':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Em negociação':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      case 'Cliente':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Sem interesse':
        return 'bg-slate-700/40 text-slate-400 border-slate-600/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  // PASSWORD SCREEN
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-[#060A12]/95 backdrop-blur-md flex items-center justify-center p-4">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-slate-900 border border-amber-500/40 shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 mb-4">
            <Lock className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-bold text-white text-center font-['Outfit',sans-serif]">
            Painel Administrativo Rota Segura
          </h2>
          <p className="text-xs text-slate-400 text-center mt-1">
            Acesso reservado para gestão de leads comerciais e cotações.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Código de Acesso
              </label>
              <input
                type="password"
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                placeholder="Insira o código (ex: rota2025)"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
              />
              {passcodeError && (
                <span className="text-xs text-red-400 mt-1 block">{passcodeError}</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Acessar Painel</span>
            </button>

            <button
              type="button"
              onClick={handleQuickUnlock}
              className="w-full py-2 px-3 text-xs text-amber-400/80 hover:text-amber-300 transition-colors text-center"
            >
              Ou clique aqui para demonstração rápida (Acesso Direto)
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#060A12] overflow-y-auto">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-20 bg-[#0A101D] border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-sm">
            RS
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white font-['Outfit',sans-serif]">
              Painel Comercial & Leads • ROTA SEGURA
            </h1>
            <span className="text-[11px] text-slate-400">
              Gestão de Cotações, Contratos e Follow-up no WhatsApp
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            title="Exportar CSV"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exportar CSV</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Fechar</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* KPI DASHBOARD METRICS (Section 14) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {/* Total Leads */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Leads Recebidos</span>
              <Users className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <span className="text-xl font-black text-white">{totalLeads}</span>
          </div>

          {/* Empresas */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Empresas</span>
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <span className="text-xl font-black text-blue-300">{companyLeads}</span>
          </div>

          {/* Contratos */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Interesse Contrato</span>
              <FileSignature className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <span className="text-xl font-black text-amber-300">{contractInterestLeads}</span>
          </div>

          {/* Recorrentes */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Recorrentes</span>
              <Repeat className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <span className="text-xl font-black text-cyan-300">{recurrentLeads}</span>
          </div>

          {/* Novos */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Leads Novos</span>
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <span className="text-xl font-black text-emerald-300">{newLeads}</span>
          </div>

          {/* Em Negociação */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Em Negociação</span>
              <RefreshCw className="w-3.5 h-3.5 text-yellow-400" />
            </div>
            <span className="text-xl font-black text-yellow-300">{inNegotiationLeads}</span>
          </div>

          {/* Clientes */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Clientes</span>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <span className="text-xl font-black text-emerald-400">{closedClients}</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/70 p-3 rounded-2xl border border-slate-800">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, empresa, telefone ou cidade..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Status Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
            {['todos', ...ALL_STATUSES].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap capitalize transition-colors ${
                  statusFilter === st
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* TABLE OF LEADS (Section 14) */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800 font-mono">
                <tr>
                  <th className="py-3 px-4">Nome & Contato</th>
                  <th className="py-3 px-4">Empresa / Perfil</th>
                  <th className="py-3 px-4">Volume & Freq.</th>
                  <th className="py-3 px-4">Interesse Contrato</th>
                  <th className="py-3 px-4">Data</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Ação WhatsApp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-slate-500">
                      Nenhum lead encontrado com os filtros selecionados.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      {/* Nome & Contato */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-white block">{lead.nome}</span>
                        <span className="text-[11px] text-slate-400 block mt-0.5">{lead.telefone}</span>
                        <span className="text-[10px] text-slate-500 block">{lead.cidade} - {lead.bairro}</span>
                      </td>

                      {/* Empresa */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-200 block">
                          {lead.empresa || 'Pessoa Física'}
                        </span>
                        <span className="text-[11px] text-amber-400/80 font-mono">
                          {lead.tipoCliente}
                        </span>
                      </td>

                      {/* Volume & Frequência */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-200 block">
                          {lead.quantidadeEntregas}
                        </span>
                        <span className="text-[11px] text-slate-400 block">
                          {lead.frequencia}
                        </span>
                      </td>

                      {/* Interesse Contrato */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block text-[11px] px-2 py-0.5 rounded font-semibold ${
                            lead.interesseContrato === 'Sim, quero conhecer'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'text-slate-400'
                          }`}
                        >
                          {lead.interesseContrato}
                        </span>
                      </td>

                      {/* Data */}
                      <td className="py-3.5 px-4 text-xs text-slate-400 whitespace-nowrap">
                        {new Date(lead.data).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                          className={`text-xs px-2.5 py-1.5 rounded-lg border font-semibold bg-slate-950 focus:outline-none cursor-pointer ${getStatusBadgeColor(
                            lead.status
                          )}`}
                        >
                          {ALL_STATUSES.map((st) => (
                            <option key={st} value={st} className="bg-slate-900 text-white">
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* ABRIR WHATSAPP CTA */}
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <a
                          id={`lead-whatsapp-${lead.id}`}
                          href={buildAdminFollowUpWhatsAppUrl(lead)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>ABRIR WHATSAPP</span>
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info & reset tool */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-2 gap-2">
          <span>Mostrando {filteredLeads.length} de {totalLeads} leads salvos</span>
          <button
            onClick={handleResetSample}
            className="text-slate-500 hover:text-slate-300 underline"
          >
            Restaurar leads demonstrativos iniciais
          </button>
        </div>
      </main>

      {/* LEAD DETAILS DRAWER / MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
                  Detalhes do Lead • {selectedLead.id}
                </span>
                <h3 className="text-xl font-bold text-white font-['Outfit',sans-serif]">
                  {selectedLead.nome}
                </h3>
                <span className="text-xs text-slate-400">
                  {selectedLead.empresa || 'Pessoa Física'}
                </span>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">WhatsApp</span>
                <span className="font-bold text-white">{selectedLead.telefone}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">E-mail</span>
                <span className="font-bold text-white truncate block">{selectedLead.email}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">Origem</span>
                <span className="font-bold text-white">{selectedLead.origem}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">Destino</span>
                <span className="font-bold text-white">{selectedLead.destino}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">Volume & Frequência</span>
                <span className="font-bold text-amber-400">
                  {selectedLead.quantidadeEntregas} • {selectedLead.frequencia}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">Peso & Mercadoria</span>
                <span className="font-bold text-white">
                  {selectedLead.peso} • {selectedLead.tipoMercadoria}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">Horário Programado</span>
                <span className="font-bold text-white">{selectedLead.horario}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">Interesse em Contrato</span>
                <span className="font-bold text-amber-300">{selectedLead.interesseContrato}</span>
              </div>
            </div>

            {selectedLead.observacoes && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="text-slate-500 block font-semibold mb-0.5">Observações Adicionais:</span>
                <p className="text-slate-300">{selectedLead.observacoes}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                onClick={() => handleDeleteLead(selectedLead.id)}
                className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Excluir Lead</span>
              </button>

              <a
                href={buildAdminFollowUpWhatsAppUrl(selectedLead)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Iniciar Conversa no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
