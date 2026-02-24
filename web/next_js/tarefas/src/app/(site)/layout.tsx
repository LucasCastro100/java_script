import { ReactNode } from "react";
import { Header } from "../component/header";

interface LayoutProps {
    children: ReactNode
}

export default function LayoutSite({ children }: LayoutProps) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            <Header />

            {children}
        </div>
    )
}