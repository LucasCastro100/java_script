import { Container } from "../../../components/Cointainer";
import { HeaderDashboard } from "../../../components/Header/dashboard";
import { SubContainer } from "../../../components/SubContainer";

export function NewCar() {
    return (
        <Container>
            <HeaderDashboard url={'/'} title={'Novo Carro'} />

            <SubContainer>
                <div className="">New Car</div>
            </SubContainer>
        </Container>
    );
}