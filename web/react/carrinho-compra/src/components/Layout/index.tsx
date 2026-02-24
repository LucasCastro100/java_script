import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { CartProvider } from "../../context/cart";

export function Layout() {
    return (
        <CartProvider>
            <div className="bg-black min-h-screen">
                <Header />

                <div className="w-full max-w-6xl m-auto p-4">
                    <Outlet />
                </div>
            </div>
        </CartProvider>
    );
}