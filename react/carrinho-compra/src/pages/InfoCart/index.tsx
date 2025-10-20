import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { CartContext } from "../../context/cart";
import { useParams } from "react-router-dom";

export function InfoCart() {
  const { id } = useParams<{ id: string }>(); // id vem como string da URL
  const { items } = useContext(CartContext);

  // Converte o id para number e busca o item
  const item = items.find(product => product.id === Number(id));

  if (!item) {
    return (
      <div className="mt-8 text-center text-white text-2xl">
        Produto não encontrado
      </div>
    );
  }

  return (
    <div className="mt-8">
      <ToastContainer />

      <div className="mt-4">
        <div className="grid grid-col-1 md:grid-cols-2 gap-8">
          <div className="">
            <img src={item.img} alt={item.name} className="w-full h-80 md:h-8/12 mx-auto rounded-md object-contain" />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-2xl text-white">{item.name}</div>
            <p className="mt-2 text-white">Preço: R$ {item.price.toFixed(2)}</p>
            <p className="mt-1 text-white">Descrição: {item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
