import { toast, ToastContainer } from "react-toastify";
import { Container } from "../../components/Cointainer";

export function Register() {

    function handleForm(){
        toast.success('Clicou')
    }

    return (
        <div className="">
            <ToastContainer />

            <Container className="h-full">
                <form onSubmit={handleForm}>
                    <div className="flex-items-center justify-end">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 font-medium text-xl rounded-xl">Acessar</button>
                    </div>
                </form>
            </Container>
        </div>
    );
}