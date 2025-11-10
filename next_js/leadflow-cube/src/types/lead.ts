export type LeadStatus = 'novo' | 'contato' | 'proposta' | 'negociacao' | 'ganho' | 'perdido';

export interface Lead {
  id: string;
  nome: string;
  produto: string;
  whatsappAtendente: string;
  whatsappLead: string;
  localidade: string;
  status: LeadStatus;
  criadoEm: Date;
  valorEstimado?: number;
  observacoes?: string;
  sellerId?: string;
  sellerNome?: string;
}

export const statusConfig: Record<LeadStatus, { label: string; color: string }> = {
  novo: { label: 'Novo', color: 'bg-blue-500' },
  contato: { label: 'Contato', color: 'bg-purple-500' },
  proposta: { label: 'Proposta', color: 'bg-yellow-500' },
  negociacao: { label: 'Negociação', color: 'bg-orange-500' },
  ganho: { label: 'Ganho', color: 'bg-success' },
  perdido: { label: 'Perdido', color: 'bg-destructive' },
};
