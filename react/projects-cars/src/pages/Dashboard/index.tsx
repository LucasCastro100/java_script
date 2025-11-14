import { Container } from "../../components/Cointainer";
import { SubContainer } from "../../components/SubContainer";
import { HeaderDashboard } from "../../components/Header/dashboard";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";

export function Dashboard() {
    const { user } = useContext(AuthContext);

    function getGreeting() {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) return "Bom dia";
        if (hour >= 12 && hour < 18) return "Boa tarde";
        return "Boa noite";
    }

    return (
        <Container>
            <HeaderDashboard url={'/'} title={'Dashboard'} />

            <SubContainer>
                <div className="text-xl font-medium">
                    {getGreeting()} {user?.name}
                </div>

                <div className="">
                    
                </div>
            </SubContainer>
        </Container>
    );
}
