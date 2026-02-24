import { Link } from "react-router-dom";
import { FiLogIn, FiUser } from "react-icons/fi";
import { LogoText } from "../LogoText";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";

export function HeaderHome() {
    const {signed, loadingAuth} = useContext(AuthContext)

    return (
        <div className="border-b-2 border-b-gray-600 w-full">
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between p-4 gap-4 mx-auto max-w-6xl">
                <LogoText />

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