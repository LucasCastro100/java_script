import { Container } from "../../components/Cointainer";
import { SubContainer } from "../../components/SubContainer";
import { HeaderDashboard } from "../../components/Header/dashboard";
import { useParams } from "react-router-dom";

export function CarDetail() {
    const { uid } = useParams()

    return (
        <Container>
                <HeaderDashboard url={'/'} title={'Car Detail'} />

                <SubContainer>
                    <div className="text-white">Carros - uid {uid}</div>
                </SubContainer>
        </Container>
    );
}