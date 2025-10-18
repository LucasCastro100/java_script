import {createContext, useState} from 'react';
import { toast } from 'react-toastify';

interface CartProviderProps {
    children: React.ReactNode;
}

type CartContextData = {    
    cartItems: number;
    addToCart: () => void;
    removeFromCart: () => void;
}

export const CartContext = createContext({} as CartContextData);

export function CartProvider({children}: CartProviderProps) {
    const [cartItems, setCartItems] = useState(0);

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
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart}}>
            {children}
        </CartContext.Provider>
    );
}