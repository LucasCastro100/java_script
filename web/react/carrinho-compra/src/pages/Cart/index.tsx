import { useContext } from "react";
import { FaMinusSquare, FaPlusSquare, FaTrash } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { CartContext } from "../../context/cart";

export function Cart() {
  const { cartItems, removeToCart, decreaseQuantity, increaseQuantity } =
    useContext(CartContext);

  // Calcula o total geral do carrinho
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="mt-8">
      <ToastContainer />
      <div className="text-center text-4xl text-white">Meu carrinho</div>

      <div className="mt-4">
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md bg-gray-300 p-4 mb-2"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 rounded-md"
                />

                <strong>R$ {item.price.toFixed(2)}</strong>

                <div className="flex items-center gap-4">
                  <button
                    className="cursor-pointer"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    <FaMinusSquare size={25} color="#000" />
                  </button>

                  <p>{item.quantity}</p>

                  <button
                    className="cursor-pointer"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    <FaPlusSquare size={25} color="#000" />
                  </button>
                </div>

                <div>
                  <p>
                    <strong>Subtotal: </strong>R${" "}
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div>
                  <button
                    className="cursor-pointer"
                    onClick={() => removeToCart(item.id)}
                  >
                    <FaTrash size={25} color="#000" />
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 text-right text-xl text-white font-semibold">
              <h3>Total do carrinho: R$ {total.toFixed(2)}</h3>
            </div>
          </>
        ) : (
          <div className="text-center text-3xl text-red-500">
            Não há itens no carrinho!
          </div>
        )}
      </div>
    </div>
  );
}
