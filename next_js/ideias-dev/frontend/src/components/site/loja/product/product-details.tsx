'use client'

import { setCartState } from "@/actions/loja/set-cart-state";
import { useCartStore } from "@/store/loja/cart";
import { Product } from "@/types/loja/product";
import { useRouter } from "next/navigation"
import Image from "next/image";

type Props = {
    product: Product;
}
export const ProductDetails = ({ product }: Props) => {
    /*CARRINHO*/
    const router = useRouter()
    const cartStore = useCartStore(state => state);

    /*ATUALZIANDO CARRNHO*/
    const addToCart = async () => {
        cartStore.addItem({
            productId: product.id,
            quantity: 1
        })

        const updateCart = useCartStore.getState().cart

        await setCartState(updateCart)

        router.push("/projetos/loja/carrinho")
    }

    return (
        <div className="mt-8 md:mt-0 flex flex-col w-full">
            <div className="text-xs font-gray-500 mb-2">Cod {product.id}</div>

            <div className="text-3xl font-bold mb-4">{product.label}</div>

            <div className="text-4xl font-bold text-blue-500 mb-2">R${product.price.toFixed(2)}</div>

            <div className="text-sm text-gray-500 mb-8">Em até 12x no cartão</div>


            <div className="flex flex-col gap-2">
                <div>
                    <div className="text-sm text-gray-500">CARRINHO: <span className="font-bold">{cartStore.cart.length} itens</span></div>
                </div>

                <div className="flex gap-4">
                    <button className="flex-1 bg-blue-500 text-white py-2 px-4 border border-gray-200 rounded-md hover:opacity-90 transition-all cursor-pointer max-w-sm" onClick={addToCart}>
                        Adicionar no carrinho
                    </button>

                    <div className="size-14 border border-gray-500 flex justify-center items-center rounded-md">
                        <Image
                            src={'/assets/loja/ui/heart-3-line.png'}
                            alt={'Adicionar aos favoritos'}
                            width={24}
                            height={24} />
                    </div>

                    <div className="size-14 border border-gray-500 flex justify-center items-center rounded-md">
                        <Image
                            src={'/assets/loja/ui/share-line.png'}
                            alt={'Compartilhar produto'}
                            width={24}
                            height={24} />
                    </div>
                </div>
            </div>
        </div>
    );
}