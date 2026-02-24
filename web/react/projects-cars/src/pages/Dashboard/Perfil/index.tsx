// import { useContext } from "react";
import { Container } from "../../../components/Cointainer";
import { HeaderDashboard } from "../../../components/Header/dashboard";
// import { AuthContext } from "../../../contexts/Auth";
// import { Input } from "../../../components/Form/Input";
// import { FormGroup } from "../../../components/Form/FormGroup";

export function Perfil() {
    // const {user} = useContext(AuthContext);

    return (
        <Container>
            <HeaderDashboard url={'/dashboard'} title={'Perfil'} />

            <div className="w-full p-4">
                <p className="txt-xl font-bold">Alterar senha</p>
                <form>
                </form>                
            </div>
        </Container>
    );
}