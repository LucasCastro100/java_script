import { toast } from "react-toastify";
import type React from "react";
import { ButtonAuth } from "../../components/Button/auth";

export function Login() {
    function handleForm(e: React.FormEvent) {
        e.preventDefault();
        toast.success('Clicou')
        toast.error('Clicou');
    }

    return (
        <form onSubmit={handleForm}>
           <ButtonAuth text="Acessar" />
        </form>
    );
}