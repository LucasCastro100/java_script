import { toast } from "react-toastify";
import { ButtonAuth } from "../../components/Button/auth";

export function Register() {

    function handleForm(e: React.FormEvent) {
        e.preventDefault();
        toast.success('Clicou')
        toast.error('Clicou');
    }

    return (
        <form onSubmit={handleForm}>
            <ButtonAuth text="Regsitrar" />
        </form>
    );
}

