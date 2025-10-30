import { toast } from "react-toastify";
import type React from "react";
import { Container } from "../../components/Cointainer";

export function Login() {
    function handleForm(e: React.FormEvent) {
        e.preventDefault();
        toast.success('Clicou')
        toast.error('Clicou');
    }

    return (
        <Container>
            <form onSubmit={handleForm}>
                <div className="flex-items-center justify-end">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 font-medium text-xl py-1 px-2 rounded-xl">Acessar</button>
                </div>
            </form>
        </Container>
    );
}