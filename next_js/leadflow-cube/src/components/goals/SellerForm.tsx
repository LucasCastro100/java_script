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
import { useEffect } from 'react';

const sellerSchema = z.object({
  user_id: z.string().optional(),
  nome: z.string().min(1, 'Nome é obrigatório').max(100),
  email: z.string().email('Email inválido').max(255),
  telefone: z.string().optional(),
});

type SellerFormData = z.infer<typeof sellerSchema>;

interface SellerFormProps {
  seller?: any;
  onSuccess: () => void;
}

export function SellerForm({ seller, onSuccess }: SellerFormProps) {
  const { toast } = useToast();
  const { company } = useCompany();
  const queryClient = useQueryClient();

  // Buscar usuários da empresa
  const { data: users } = useQuery({
    queryKey: ['company-users', company?.id],
    queryFn: async () => {
      if (!company) return [];
      
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .eq('company_id', company.id);

      if (error) throw error;
      return data;
    },
    enabled: !!company,
  });

  const form = useForm<SellerFormData>({
    resolver: zodResolver(sellerSchema),
    defaultValues: {
      user_id: seller?.user_id || '',
      nome: seller?.nome || '',
      email: seller?.email || '',
      telefone: seller?.telefone || '',
    },
  });

  useEffect(() => {
    if (seller) {
      form.reset({
        user_id: seller.user_id || '',
        nome: seller.nome || '',
        email: seller.email || '',
        telefone: seller.telefone || '',
      });
    }
  }, [seller, form]);

  const onSubmit = async (data: SellerFormData) => {
    if (!company) {
      toast({
        title: 'Erro',
        description: 'Empresa não encontrada',
        variant: 'destructive',
      });
      return;
    }

    if (seller) {
      // Atualizar vendedor existente
      const { error } = await supabase
        .from('sellers')
        .update({
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          user_id: data.user_id || null,
        })
        .eq('id', seller.id);

      if (error) {
        toast({
          title: 'Erro ao atualizar vendedor',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Vendedor atualizado!',
        description: 'As alterações foram salvas com sucesso.',
      });
    } else {
      // Criar novo vendedor
      const { error } = await supabase
        .from('sellers')
        .insert({
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          user_id: data.user_id || null,
          company_id: company.id,
        } as any);

      if (error) {
        toast({
          title: 'Erro ao criar vendedor',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Vendedor criado!',
        description: 'O vendedor foi adicionado com sucesso.',
      });
    }
    
    queryClient.invalidateQueries({ queryKey: ['sellers'] });
    form.reset();
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="user_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuário (Opcional)</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um usuário (opcional)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {users?.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.full_name || user.email}
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
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome do vendedor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@exemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telefone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone (opcional)</FormLabel>
              <FormControl>
                <Input placeholder="(00) 00000-0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end pt-4">
          <Button type="submit">{seller ? 'Salvar Alterações' : 'Criar Vendedor'}</Button>
        </div>
      </form>
    </Form>
  );
}
