import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

export function Cart() {
    return (
        <div className="mt-8">
            <ToastContainer />
            <div className="text-center text-4xl text-white">Meu carrinho</div>

            <div className="mt-4">
                <div className="flex items-center justify-between rounded-md bg-gray-300 p-4">
                    <img src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRk-UdQtUsAPXWgNi0qIrTpcktS0BSF22NHFE-Ipb0gznl9qaZ3vOXvUkzO_2Hje9lqzwoNOCzXEYewQOoQivwjxHh64pDhdS70odhmGu8kcrcJCK8f1RN38J9jEImhR74pYLP_5A&usqp=CAc" alt="Logo" className="w-20" />

                    <strong>R$500.00</strong>

                    <div className="flex items-center gap-4">
                        <button><FaMinusSquare size={25} color="#000"/></button>
                        <p>2</p>
                        <button><FaPlusSquare size={25} color="#000" /></button>
                    </div>

                    <div className="">
                        <p><strong>SUbtotal: </strong> R$1000.00</p>
                    </div>
                </div>
            </div>
        </div>
    );
}