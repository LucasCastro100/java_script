import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLeads } from '@/hooks/useLeads';
import { LeadStatus } from '@/types/lead';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useCompany } from '@/contexts/CompanyContext';

const leadSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  produto: z.string().min(2, 'Produto deve ter no mínimo 2 caracteres'),
  whatsappAtendente: z.string().optional(),
  whatsappLead: z.string().optional(),
  localidade: z.string().optional(),
  status: z.enum(['novo', 'contato', 'proposta', 'negociacao', 'ganho', 'perdido']),
  valorEstimado: z.string().optional(),
  observacoes: z.string().optional(),
  sellerId: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

interface LeadFormProps {
  onSuccess?: () => void;
}

export function LeadForm({ onSuccess }: LeadFormProps) {
  const { createLead } = useLeads();
  const { company } = useCompany();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      status: 'novo',
    },
  });

  const { data: sellers } = useQuery({
    queryKey: ['sellers', company?.id],
    queryFn: async () => {
      if (!company) return [];
      
      const { data, error } = await supabase
        .from('sellers')
        .select('id, nome')
        .eq('company_id', company.id)
        .eq('ativo', true);

      if (error) throw error;
      return data;
    },
    enabled: !!company,
  });

  const onSubmit = async (data: LeadFormData) => {
    createLead({
      nome: data.nome,
      produto: data.produto,
      whatsappAtendente: data.whatsappAtendente || '',
      whatsappLead: data.whatsappLead || '',
      localidade: data.localidade || '',
      status: data.status as LeadStatus,
      valorEstimado: data.valorEstimado ? parseFloat(data.valorEstimado) : undefined,
      observacoes: data.observacoes,
      sellerId: data.sellerId,
    });

    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome do Lead *</Label>
          <Input
            id="nome"
            {...register('nome')}
            placeholder="Ex: João Silva"
          />
          {errors.nome && (
            <p className="text-sm text-destructive">{errors.nome.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="produto">Produto/Serviço *</Label>
          <Input
            id="produto"
            {...register('produto')}
            placeholder="Ex: Consultoria Digital"
          />
          {errors.produto && (
            <p className="text-sm text-destructive">{errors.produto.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsappLead">WhatsApp do Lead</Label>
          <Input
            id="whatsappLead"
            {...register('whatsappLead')}
            placeholder="Ex: +55 11 99999-9999"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsappAtendente">WhatsApp Atendente</Label>
          <Input
            id="whatsappAtendente"
            {...register('whatsappAtendente')}
            placeholder="Ex: +55 11 88888-8888"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="localidade">Localidade</Label>
          <Input
            id="localidade"
            {...register('localidade')}
            placeholder="Ex: São Paulo, SP"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="valorEstimado">Valor Estimado (R$)</Label>
          <Input
            id="valorEstimado"
            type="number"
            step="0.01"
            {...register('valorEstimado')}
            placeholder="Ex: 5000.00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select
            value={watch('status')}
            onValueChange={(value) => setValue('status', value as LeadStatus)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="novo">Novo</SelectItem>
              <SelectItem value="contato">Contato</SelectItem>
              <SelectItem value="proposta">Proposta</SelectItem>
              <SelectItem value="negociacao">Negociação</SelectItem>
              <SelectItem value="ganho">Ganho</SelectItem>
              <SelectItem value="perdido">Perdido</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sellerId">Vendedor</Label>
          <Select
            value={watch('sellerId')}
            onValueChange={(value) => setValue('sellerId', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um vendedor (opcional)" />
            </SelectTrigger>
            <SelectContent>
              {sellers?.map((seller) => (
                <SelectItem key={seller.id} value={seller.id}>
                  {seller.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="observacoes">Observações</Label>
        <Textarea
          id="observacoes"
          {...register('observacoes')}
          placeholder="Adicione observações sobre este lead..."
          rows={4}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Criando...' : 'Criar Lead'}
        </Button>
      </div>
    </form>
  );
}
