import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

type HeaderProps = {
    title: string
    url: string
}

export function HeaderDashboard({ title, url }: HeaderProps) {
    return (
        <div className="border-b-2 border-b-gray-600 w-full">
            <div className="flex flex-row items-center p-4 gap-4 mx-auto max-w-6xl">
                <Link to={url} className="bg-yellow-700 p-4 rounded-sm"><FaArrowLeft /></Link>
                <h1 className="text-3xl text-center text-white">{title}</h1>
            </div>
        </div>        
    );
}