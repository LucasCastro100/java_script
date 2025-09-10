'use client'

import { getCartState } from "@/actions/loja/get-cart-state"
import { useCartStore } from "@/store/loja/cart"
import { useEffect } from "react"

export const StoreHydration = () => {

    /* SINCRONIZA O ESTADO INICIAL DO CARRINHO */
    useEffect(() => {
        getCartState().then(({cart}) => {
           if (cart.length > 0){
            useCartStore.setState({cart})    
           }
        })
    }, [])

    return null;
}