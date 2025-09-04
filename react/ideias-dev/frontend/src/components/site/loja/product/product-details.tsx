'use client'

import { Product } from "@/types/loja/product";

type Props = {
    product: Product;
}
export const ProductDetails = ({product}: Props) => {
    return (
        <div className="mt-8 md:mt-0">            
            <h1 className="text-2xl font-bold mb-4">{product.label}</h1>            
            <p className="text-lg font-semibold text-green-600">${product.price.toFixed(2)}</p>
        </div>
    );
}