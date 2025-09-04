import { ProductList } from "../product-list"
import { data } from "@/data"

export const MostViewedProducts = () => {
    const mostViewed = [...data.products]
        .sort((a, b) => b.views - a.views)
        .slice(0, 4); // pega os 4 primeiros

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