import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export function Layout() {
    return (
        <div className="bg-black min-h-screen">
            <Header />
            <div className="w-full max-w-4xl m-auto">
                <Outlet />
            </div>
        </div>
    )
}