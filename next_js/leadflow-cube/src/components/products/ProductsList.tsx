import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';

interface ProductsListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductsList({ products, onEdit, onDelete }: ProductsListProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Nenhum produto cadastrado</h3>
          <p className="text-muted-foreground">
            Comece criando seu primeiro produto clicando no botão acima.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
