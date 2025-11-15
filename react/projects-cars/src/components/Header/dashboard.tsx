import { ReactNode } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

type HeaderProps = {
    title: string
    url: string
    children?: ReactNode
}

export function HeaderDashboard({ title, url, children }: HeaderProps) {
    return (
        <div className="border-b-2 border-b-gray-600 w-full flex items-center justify-between p-4">
            <div className="flex flex-row items-center gap-4">
                <Link to={url} className="bg-yellow-700 p-4 rounded-sm"><FaArrowLeft /></Link>
                <h1 className="text-3xl text-center text-white">{title}</h1>
            </div>

            {children && (
                <div className="bg-yellow-700 p-4 rounded-sm">
                    {children}
                </div>
            )}
        </div>
    );
}