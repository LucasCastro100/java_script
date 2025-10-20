import {createContext, useState} from 'react';
import { toast } from 'react-toastify';
import productsJson from '../json/products.json'
import type { ProductType } from '../types/Product';

interface CartProviderProps {
    children: React.ReactNode;
}

type CartContextData = {    
    cartItems: number;
    items : ProductType[] 
    addToCart: () => void;
    removeFromCart: () => void;    
}

export const CartContext = createContext({} as CartContextData);

export function CartProvider({children}: CartProviderProps) {
    const [cartItems, setCartItems] = useState(0);
    const [items, setItems] = useState<ProductType[]>(productsJson.products); 

    function addToCart() {
        setCartItems(items => items + 1);

        toast.success("Item adicionado no carrinho!", {
            theme: "colored",
          });
    }

    function removeFromCart() {
        setCartItems(items => (items > 0 ? items - 1 : 0));
        toast.warning("Item removido do carrinho!", {
            theme: "colored",
          });
    }

    return (
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart, items}}>
            {children}
        </CartContext.Provider>
    );
}