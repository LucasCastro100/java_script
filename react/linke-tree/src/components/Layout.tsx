import { Outlet } from 'react-router-dom'

export function Layout() {
    return (
        <div className="bg-black min-h-screen">
            <div className="w-full max-w-4xl m-auto text-white">

                <Outlet />
            </div>
        </div>
    )
}