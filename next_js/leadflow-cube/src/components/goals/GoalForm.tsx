import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useCompany } from '@/contexts/CompanyContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const goalSchema = z.object({
  seller_id: z.string().min(1, 'Vendedor é obrigatório'),
  periodo: z.string().min(1, 'Período é obrigatório'),
  valor_meta: z.string().min(1, 'Valor da meta é obrigatório'),
});

type GoalFormData = z.infer<typeof goalSchema>;

interface GoalFormProps {
  goal?: any;
  onSuccess: () => void;
}

export function GoalForm({ goal, onSuccess }: GoalFormProps) {
  const { toast } = useToast();
  const { company } = useCompany();
  const queryClient = useQueryClient();

  const { data: sellers } = useQuery({
    queryKey: ['sellers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sellers')
        .select('*')
        .eq('ativo', true)
        .order('nome');

      if (error) throw error;
      return data;
    },
  });

  const form = useForm<GoalFormData>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      seller_id: goal?.seller_id || '',
      periodo: goal?.periodo || '',
      valor_meta: goal?.valor_meta?.toString() || '',
    },
  });

  useEffect(() => {
    if (goal) {
      form.reset({
        seller_id: goal.seller_id || '',
        periodo: goal.periodo || '',
        valor_meta: goal.valor_meta?.toString() || '',
      });
    }
  }, [goal, form]);

  const onSubmit = async (data: GoalFormData) => {
    if (!company) {
      toast({
        title: 'Erro',
        description: 'Empresa não encontrada',
        variant: 'destructive',
      });
      return;
    }

    if (goal) {
      // Atualizar meta existente
      const { error } = await supabase
        .from('goals')
        .update({
          seller_id: data.seller_id,
          periodo: data.periodo,
          valor_meta: parseFloat(data.valor_meta),
        })
        .eq('id', goal.id);

      if (error) {
        toast({
          title: 'Erro ao atualizar meta',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Meta atualizada!',
        description: 'As alterações foram salvas com sucesso.',
      });
    } else {
      // Criar nova meta
      const { error } = await supabase
        .from('goals')
        .insert({
          seller_id: data.seller_id,
          periodo: data.periodo,
          valor_meta: parseFloat(data.valor_meta),
          company_id: company.id,
        });

      if (error) {
        toast({
          title: 'Erro ao criar meta',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Meta criada!',
        description: 'A meta foi adicionada com sucesso.',
      });
    }
    
    queryClient.invalidateQueries({ queryKey: ['goals'] });
    form.reset();
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="seller_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendedor</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um vendedor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sellers?.map((seller) => (
                    <SelectItem key={seller.id} value={seller.id}>
                      {seller.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="periodo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Período (Mês/Ano)</FormLabel>
              <FormControl>
                <Input type="month" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="valor_meta"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor da Meta</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end pt-4">
          <Button type="submit">{goal ? 'Salvar Alterações' : 'Criar Meta'}</Button>
        </div>
      </form>
    </Form>
  );
}
