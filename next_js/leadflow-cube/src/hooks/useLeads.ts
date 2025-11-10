import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Lead, LeadStatus } from '@/types/lead';

export function useLeads() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['leads', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('leads')
        .select(`
          *,
          sellers (
            nome
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map((lead: any) => ({
        id: lead.id,
        nome: lead.nome,
        produto: lead.produto,
        whatsappAtendente: lead.whatsapp_atendente || '',
        whatsappLead: lead.whatsapp_lead || '',
        localidade: lead.localidade || '',
        status: lead.status as LeadStatus,
        criadoEm: new Date(lead.created_at),
        valorEstimado: lead.valor_estimado,
        observacoes: lead.observacoes,
        sellerId: lead.seller_id,
        sellerNome: lead.sellers?.nome,
      })) as Lead[];
    },
    enabled: !!user,
  });

  const createLead = useMutation({
    mutationFn: async (newLead: Omit<Lead, 'id' | 'criadoEm'>) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('leads')
        .insert({
          user_id: user.id,
          nome: newLead.nome,
          produto: newLead.produto,
          whatsapp_atendente: newLead.whatsappAtendente,
          whatsapp_lead: newLead.whatsappLead,
          localidade: newLead.localidade,
          status: newLead.status,
          valor_estimado: newLead.valorEstimado,
          observacoes: newLead.observacoes,
          seller_id: newLead.sellerId || null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead-stats'] });
      toast({
        title: 'Lead criado!',
        description: 'O lead foi adicionado com sucesso.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao criar lead',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateLead = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Lead> & { id: string }) => {
      const { error } = await supabase
        .from('leads')
        .update({
          nome: updates.nome,
          produto: updates.produto,
          whatsapp_atendente: updates.whatsappAtendente,
          whatsapp_lead: updates.whatsappLead,
          localidade: updates.localidade,
          status: updates.status,
          valor_estimado: updates.valorEstimado,
          observacoes: updates.observacoes,
          seller_id: updates.sellerId || null,
        })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead-stats'] });
      toast({
        title: 'Lead atualizado!',
        description: 'As alterações foram salvas com sucesso.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao atualizar lead',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateLeadStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: LeadStatus }) => {
      const { error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead-stats'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao atualizar status',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteLead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead-stats'] });
      toast({
        title: 'Lead removido!',
        description: 'O lead foi excluído com sucesso.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao remover lead',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    leads,
    isLoading,
    createLead: createLead.mutate,
    updateLead: updateLead.mutate,
    updateLeadStatus: updateLeadStatus.mutate,
    deleteLead: deleteLead.mutate,
  };
}
