import { CartItem } from "@/types/loja/cart-item";
import { cookies } from "next/headers";

export const getServerCart = async (): Promise<CartItem[]> => {
    const cokkieStore = await cookies()
    const value = cokkieStore.get('cart')?.value

    if (!value) return []
    try {
        return JSON.parse(value)
    } catch {
        return []
    }
}

export const setServerCart = async (cart: CartItem[]) => {
    const cokkieStore = await cookies()
    cokkieStore.set('cart', JSON.stringify(cart), { httpOnly: true })
}

export const clearServerCart = async () => {
    const cokkieStore = await cookies()
    cokkieStore.delete('cart')
}