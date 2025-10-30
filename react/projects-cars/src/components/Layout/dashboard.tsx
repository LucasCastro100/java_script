import { Outlet } from "react-router-dom";
import { Aside } from "../Aside";
import { useState } from "react";

export function LayoutDashboard() {
    const [isOpen, setIsOpen] = useState(true)
    return (
        <div>
            <Aside isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />

            <main className="flex-1 transition-all duration-300">
                <Outlet />
            </main>            
        </div>
    );
}