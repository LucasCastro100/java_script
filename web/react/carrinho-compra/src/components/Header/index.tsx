import { useContext } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cart";


export function Header() {
    const {cartItems} = useContext(CartContext);

    return (
        <header className="bg-gray-300">
            <div className="w-full max-w-6xl m-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 p-4">
                <Link to={'/'} className="flex flex-row cursor-pointer" title="Home">
                    <span className="font-bold text-5xl text-black">DEV</span>
                    <span className="font-bold text-5xl text-red-500">CART</span>
                </Link>

                <div className="flex flex-row gap-4">
                    <Link to={'/cart'} className="relative" title="Carrinho de Compras">
                        <FiShoppingCart size={30} color="#000"/>
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}