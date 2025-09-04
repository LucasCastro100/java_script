import { ProductList } from "../product-list"
import { data } from "@/data"

export const MostSoldProducts = () => {
    const mostSold = [...data.products]
        .sort((a, b) => b.solds - a.solds)
        .slice(0, 4); // pega os 4 primeiros

    return (
        <div className="mt-8">
            <h2 className="text-xl mb-2 font-bold">Produtos mais vendidos</h2>
            <p className="text-gray-500">Campeões de vendas da nossa loja.</p>

            <div className="mt-8">
                <ProductList list={mostSold}/>
            </div>
        </div>
    )
}