'use server';

import { getServerCart } from "@/lib/loja/server-cookies";

export const getCartState = async () => {
    const cart = await getServerCart()
    return { cart }
}