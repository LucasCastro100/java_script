'use server';

import { setServerCart } from "@/lib/loja/server-cookies";
import { CartItem } from "@/types/loja/cart-item";

export const setCartState = async (cart: CartItem[]) => {    
    await setServerCart(cart)
}