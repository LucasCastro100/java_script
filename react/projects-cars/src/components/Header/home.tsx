import { Link } from "react-router-dom";

export function HeaderHome() {
    return (
        <div className="border-b-2 border-b-gray-600 w-full">
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between p-4 gap-4 mx-auto max-w-6xl">
                <div className="flex flex-row">
                    <span className="font-bold text-3xl text-white">Dev</span>
                    <span className="font-bold text-3xl text-red-700">Cars</span>
                </div>

                <nav className="flex flex-col md:flex-row item-center gap-4">
                    <Link to={'/'}>
                        <h1 className="font-medium text-xl text-center text-white py-1 px-2 rounded-md hover:bg-gray-500">Home</h1>
                    </Link>

                     <Link to={'/login'}>
                        <h1 className="font-medium text-xl text-center text-white py-1 px-2 rounded-md hover:bg-gray-500">Login</h1>
                    </Link>

                     <Link to={'/register'}>
                        <h1 className="font-medium text-xl text-center text-white py-1 px-2 rounded-md hover:bg-gray-500">Registrar</h1>
                    </Link>
                </nav>

            </div>
        </div>
    );
}