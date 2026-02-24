import { Outlet } from "react-router-dom";
import { SubContainer } from "../SubContainer";
import { HeaderHome } from "../Header/home";
import { Container } from "../Cointainer";

export function LayoutHome() {
    return (
        <Container>
            <HeaderHome />

            <SubContainer>
                <Outlet />
            </SubContainer>
        </Container>
    );
}