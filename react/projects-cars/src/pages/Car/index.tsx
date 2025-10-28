import { Container } from "../../components/Cointainer";
import { SubContainer } from "../../components/SubContainer";
import { HeaderDashboard } from "../../components/Header/dashboard";

export function CarDetail() {
    return (
        <Container>
            <HeaderDashboard url={'/'} title={'Car Detail'} />

            <SubContainer>
                <div className="">Carros</div>
            </SubContainer>
        </Container>
    );
}