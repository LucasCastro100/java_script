import { useContext } from "react"
import { CartContext } from "../../context/cart"
import { BsCartPlus } from "react-icons/bs"
import type { ProductType } from "../../types/Product"

type ProductData = {
    item: ProductType
}

export function Product({item}: ProductData) {
    const { addToCart } = useContext(CartContext)

    return (
        <div className="bg-white rounded p-4 flex flex-col gap-4">
            <img src={item.img} alt={item.name} />

            <p>{item.name}</p>

            <div className="flex gap-4 items-center justify-between">
                {/* {cartItems} */}
                <p className="font-bold">R${item.price}</p>

                <button onClick={addToCart} className="bg-black rounded-sm p-2" title="Adicionar no carrinho"><BsCartPlus size={20} color="#fff" /></button>
            </div>
        </div>
    )
}