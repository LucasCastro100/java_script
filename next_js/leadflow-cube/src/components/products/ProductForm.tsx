import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Product } from '@/types/product';

const productSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  descricao: z.string().optional(),
  preco: z.string().min(1, 'Preço é obrigatório'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: { nome: string; descricao?: string; preco: number }) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function ProductForm({ product, onSubmit, onCancel, isSubmitting }: ProductFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product ? {
      nome: product.nome,
      descricao: product.descricao || '',
      preco: product.preco.toString(),
    } : undefined,
  });

  const onFormSubmit = (data: ProductFormData) => {
    onSubmit({
      nome: data.nome,
      descricao: data.descricao,
      preco: parseFloat(data.preco),
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nome">Nome do Produto *</Label>
        <Input
          id="nome"
          {...register('nome')}
          placeholder="Ex: Sistema ERP"
        />
        {errors.nome && (
          <p className="text-sm text-destructive">{errors.nome.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea
          id="descricao"
          {...register('descricao')}
          placeholder="Descrição do produto..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="preco">Preço (R$) *</Label>
        <Input
          id="preco"
          type="number"
          step="0.01"
          {...register('preco')}
          placeholder="Ex: 1500.00"
        />
        {errors.preco && (
          <p className="text-sm text-destructive">{errors.preco.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : product ? 'Atualizar' : 'Criar Produto'}
        </Button>
      </div>
    </form>
  );
}
