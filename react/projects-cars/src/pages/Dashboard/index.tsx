import { Container } from "../../components/Cointainer";
import { SubContainer } from "../../components/SubContainer";
import { HeaderDashboard } from "../../components/Header/dashboard";

export function Dashboard() {
    return (
        <Container>
            <HeaderDashboard url={'/'} title={'Dashboard'} />

            <SubContainer>
                <div className="">Dashboard</div>
            </SubContainer>
        </Container>
    );
}