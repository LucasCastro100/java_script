import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useCompany } from '@/contexts/CompanyContext';
import { CreateProductData, UpdateProductData, Product } from '@/types/product';
import { toast } from 'sonner';

export function useProducts() {
  const { user } = useAuth();
  const { company } = useCompany();
  const queryClient = useQueryClient();

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', company?.id],
    queryFn: async () => {
      if (!company) return [];
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('company_id', company.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Product[];
    },
    enabled: !!company,
  });

  const createProduct = useMutation({
    mutationFn: async (productData: CreateProductData) => {
      if (!user || !company) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('products')
        .insert({
          ...productData,
          user_id: user.id,
          company_id: company.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Produto criado com sucesso!');
    },
    onError: (error) => {
      toast.error('Erro ao criar produto');
      console.error('Error creating product:', error);
    },
  });

  const updateProduct = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateProductData }) => {
      const { data: updated, error } = await supabase
        .from('products')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Produto atualizado com sucesso!');
    },
    onError: (error) => {
      toast.error('Erro ao atualizar produto');
      console.error('Error updating product:', error);
    },
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Produto excluído com sucesso!');
    },
    onError: (error) => {
      toast.error('Erro ao excluir produto');
      console.error('Error deleting product:', error);
    },
  });

  return {
    products: products || [],
    isLoading,
    error,
    createProduct: createProduct.mutate,
    updateProduct: updateProduct.mutate,
    deleteProduct: deleteProduct.mutate,
  };
}
