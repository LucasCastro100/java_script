import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface LeadStats {
  total: number;
  novo: number;
  contato: number;
  proposta: number;
  negociacao: number;
  ganho: number;
  perdido: number;
  valor_total_ganho: number;
}

export function useLeadStats() {
  const { user } = useAuth();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['lead-stats', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .rpc('get_lead_stats', { p_user_id: user.id });

      if (error) throw error;

      return data as unknown as LeadStats;
    },
    enabled: !!user,
  });

  return {
    stats: stats || {
      total: 0,
      novo: 0,
      contato: 0,
      proposta: 0,
      negociacao: 0,
      ganho: 0,
      perdido: 0,
      valor_total_ganho: 0,
    },
    isLoading,
  };
}
