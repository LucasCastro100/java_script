import { Outlet } from "react-router-dom";
import { Container } from "../Cointainer";
import { LogoText } from "../LogoText";

export function LayoutAuth() {
    return (
        <Container>
            <div className="p-4 min-h-screen flex items-center justify-center max-w-xl mx-auto">
                <div className="w-full flex flex-col border-2 bordey-gray-600 bg-gray-500 gap-8 p-4 rounded-xl">
                    <div className="flex items-center justify-center">
                        <LogoText />
                    </div>
                    
                    <Outlet />
                </div>
            </div>
        </Container>
    );
}