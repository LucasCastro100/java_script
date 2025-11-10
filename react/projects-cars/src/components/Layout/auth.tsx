import { Outlet } from "react-router-dom";
import { Container } from "../Cointainer";
import { LogoText } from "../LogoText";

export function LayoutAuth() {
    return (
        <Container>
            <div className="p-4 min-h-screen flex items-center justify-center">
                <div className="flex flex-col w-80 border-2 bordey-gray-600 gap-8 p-4 rounded-xl">
                    <div className="flex items-center justify-center">
                        <LogoText />
                    </div>
                    
                    <Outlet />
                </div>
            </div>
        </Container>
    );
}