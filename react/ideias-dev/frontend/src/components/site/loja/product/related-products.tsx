'use client';
import { useMostViewedProducts } from "@/hooks/loja/use-most-viewed-products";
import { ProductList } from "../product-list";

type Props = {
    id: number;
}

export const RelatedProducts = ({ id }: Props) => {
     const mostViewed = useMostViewedProducts(4);
    return (
        <div className="mt-8">
            <h3 className="text-gray-700 text-xl font-bold">Você também pode gostar: </h3>

            <div className="mt-8">
                <ProductList list={mostViewed} />
            </div>
        </div>
    );
}