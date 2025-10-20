import { useContext } from "react"
import { CartContext } from "../../context/cart"
import { BsCartPlus } from "react-icons/bs"
import type { ProductType } from "../../types/Product"
import { Link } from "react-router-dom"
import { FaEye } from "react-icons/fa"

type ProductData = {
    item: ProductType
}

export function Product({item}: ProductData) {
    const { addToCart } = useContext(CartContext)

    return (
        <div className="bg-white rounded p-4 flex flex-col gap-4">
            <img src={item.img} alt={item.name} className="w-full h-80 ld:h-auto object-contain" />

            <p>{item.name}</p>       

            <div className="flex gap-4 items-center justify-between">
                <p className="font-bold">R${item.price}</p>

                <div className="flex flex-row gap-4
                ">
                    <Link to={`/cart/${item.id}`} className="bg-black rounded-sm p-2" title="Visualizar dados do item">
                    <FaEye size={20} color="#fff" />
                </Link>

                <button onClick={() => addToCart(item)} className="bg-black rounded-sm p-2" title="Adicionar no carrinho"><BsCartPlus size={20} color="#fff" /></button>
                </div>
                
            </div>
        </div>
    )
}