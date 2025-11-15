import { useContext } from "react";
import { Container } from "../../../components/Cointainer";
import { HeaderDashboard } from "../../../components/Header/dashboard";
import { AuthContext } from "../../../contexts/Auth";

export function Perfil() {
    const {user} = useContext(AuthContext);

    return (
        <Container>
            <HeaderDashboard url={'/dashboard'} title={'Perfil'} />

            <div className="w-full p-4">
                <div className="">{user?.name}</div>
            </div>
        </Container>
    );
}