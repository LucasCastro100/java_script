import { useContext } from "react";
import { CartContext } from "../../context/cart";
import { ToastContainer } from "react-toastify";

export function Home() {
    const {cartItems, addToCart} = useContext(CartContext)
    return (
        <div className="">
            <ToastContainer />
            <h1 className="text-center text-white">Home Page {cartItems}</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            </div>


            {/* <button onClick={addToCart} className="text-white">Adicionar</button> */}
        </div>
    );
}