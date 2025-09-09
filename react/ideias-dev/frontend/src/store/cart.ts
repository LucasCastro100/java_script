import { CartItem } from "@/types/loja/cart-item"
import { create } from "zustand"

type CartState = {
    cart: CartItem[],
    shippingZipCode: string,
    shippingCost: number,
    shippingDays: number,
    selectedAddressId: number | null,
    addItem: (cartItem: CartItem) => void,
    removeItem: (productId: string | number) => void,
    updateQuantity: (productId: string | number, quantity: number) => void,
    setShippingZipCode: (zipCode: string) => void,
    setShippingCost: (cost: number) => void,
    setShippingDays: (days: number) => void,
    setSelectedAddressId: (id: number | null) => void,
    clearCart: () => void,
    clearShipping: () => void,
}

export const useCartStore = create<CartState>((set) => ({
    cart: [],
    shippingZipCode: '',
    shippingCost: 0,
    shippingDays: 0,
    selectedAddressId: null,

}))