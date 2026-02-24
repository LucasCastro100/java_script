import { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import productsJson from '../json/products.json'
import type { ProductType } from '../types/Product';

interface CartProviderProps {
    children: React.ReactNode;
}

type CartContextData = {
    cartItems: ProductType[];
    items: ProductType[]
    addToCart: (product: ProductType) => void;
    removeToCart: (productId: number) => void;
    increaseQuantity: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
}

export const CartContext = createContext({} as CartContextData);

export function CartProvider({ children }: CartProviderProps) {
    const [cartItems, setCartItems] = useState<ProductType[]>([]);
    const [items, setItems] = useState<ProductType[]>(productsJson.products);

    function addToCart(product: ProductType) {
        setCartItems(prev => {
            // Verifica se o produto já está no carrinho
            const existing = prev.find(item => item.id === product.id);

            if (existing) {
                // Se já existe, só aumenta a quantidade
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            } else {
                // Se não existe, adiciona com quantity = 1
                return [...prev, { ...product, quantity: 1 }];
            }
        });

        toast.success("Item adicionado ao carrinho!", { theme: "colored" });
    }

    function removeToCart(productId: number) {
        setCartItems(prev => prev.filter(item => item.id !== productId))

        toast.warning("Item removido do carrinho!", {
            theme: "colored",
        });
    }

    function increaseQuantity(productId: number) {
        setCartItems(prev =>
            prev.map(item =>
                item.id === productId
                    ? { ...item, quantity: (item.quantity || 1) + 1 }
                    : item
            )
        );
    }

    function decreaseQuantity(productId: number) {
        setCartItems(prev =>
            prev.map(item =>
                item.id === productId
                    ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) }
                    : item
            )
        );
    }

    return (
        <CartContext.Provider value={{ cartItems, items, addToCart, removeToCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
}