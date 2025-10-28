import { Bounce, toast, ToastContainer } from "react-toastify";
import type React from "react";

export function Login() {
    function handleForm(e: React.FormEvent) {
        e.preventDefault();
        toast.success('Clicou')
        toast.error('Clicou');        
    }

    return (
        <div className="min-h-screen bg-gray-950 p-4">
            <ToastContainer closeOnClick newestOnTop pauseOnHover={false} theme="colored" transition={Bounce}/>
            <form onSubmit={handleForm}>
                <div className="flex-items-center justify-end">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 font-medium text-xl py-1 px-2 rounded-xl">Acessar</button>
                </div>
            </form>
        </div>
    );
}