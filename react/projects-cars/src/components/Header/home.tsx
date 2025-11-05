import { Link } from "react-router-dom";
import { FiLogIn, FiUser } from "react-icons/fi";

export function HeaderHome() {
    const signed = false
    const loadingAuth = false

    return (
        <div className="border-b-2 border-b-gray-600 w-full">
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between p-4 gap-4 mx-auto max-w-6xl">
                <Link to={'/'} className="flex flex-row">
                    <span className="font-bold text-3xl text-white">Dev</span>
                    <span className="font-bold text-3xl text-red-700">Cars</span>
                </Link>

                {!loadingAuth && signed && (
                    <Link to={'/dashboard'} title="Dashboard">
                        <div className=" p-2 rounded-full border-2 border-white">
                            <FiUser size={20} color="#fff" />
                        </div>
                    </Link>
                )}

                {!loadingAuth && !signed && (
                    <Link to={'/login'} title="Login">
                        <div className=" p-2 rounded-full border-2 border-white">
                            <FiLogIn size={20} color="#fff" />
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
}