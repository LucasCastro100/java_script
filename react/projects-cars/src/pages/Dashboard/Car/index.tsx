import { Link } from "react-router-dom";
import { Container } from "../../../components/Cointainer";
import { HeaderDashboard } from "../../../components/Header/dashboard";
import { FaPlus } from "react-icons/fa";

export function MyCars() {

    return (
        <Container>
            <HeaderDashboard url={'/dashboard'} title={'Perfil'}>
                <div className="flex flex-row gap-2 items-center justify-center">
                    <FaPlus />
                    <Link to="/dashboard/new-car" className="">Novo Carro</Link>
                </div>
            </HeaderDashboard>

            <div className="w-full p-4">
                <div className="">Meus Carros</div>
            </div>
        </Container>
    )
}