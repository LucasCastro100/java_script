import { ProductList } from "../product-list"
import { data } from "@/data"

export const MostSoldProducts = async () => {
    return (
        <div className="mt-8">
            <h2 className="text-xl mb-2 font-bold">Produtos mais vendidos</h2>
            <p className="text-gray-500">Campeões de vendas da nossa loja.</p>

            <div className="mt-8">
                <ProductList list={data.products}/>
            </div>
        </div>
    )
}