import { useContext } from "react";
import { Product } from "..";
import type { ProductType } from "../../../types/Product";
import { CartContext } from "../../../context/cart";

export function ListHome() {
  const { items } = useContext(CartContext);

  console.log(items)

  return (
    <div className="mt-8">
      <div className="text-center text-4xl text-white">Produtos em alta</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {items.map((product: ProductType) => (
          <Product key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
}
