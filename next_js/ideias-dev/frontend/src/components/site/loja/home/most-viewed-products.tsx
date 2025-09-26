
import { ProductList } from "../product-list"
import { useMostViewedProducts } from "@/hooks/loja/use-most-viewed-products";

export const MostViewedProducts = () => {
    const mostViewed = useMostViewedProducts(4);

    return (
        <div className="mt-8">
            <h2 className="text-xl mb-2 font-bold">Produtos mais vistos</h2>
            <p className="text-gray-500">Campeões de visualização da nossa loja.</p>

            <div className="mt-8">
                <ProductList list={mostViewed}/>
            </div>
        </div>
    )
}