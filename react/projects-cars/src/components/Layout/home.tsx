import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { SubContainer } from "../SubContainer";
import { HeaderHome } from "../Header/home";
import { Container } from "../Cointainer";

export function LayoutHome() {
    return (
        <div className="flex bg-gray-950 min-h-screen text-white">
            <ToastContainer />
            
            <Container>
                <HeaderHome />

                <SubContainer>
                    <Outlet />
                </SubContainer>
            </Container>
        </div>
    );
}