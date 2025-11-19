import { Outlet } from "react-router-dom";

export function Layout() {
    return (
            <div className="bg-black min-h-screen">

                <div className="w-full max-w-6xl m-auto p-4">
                    <Outlet />
                </div>
            </div>
    );
}