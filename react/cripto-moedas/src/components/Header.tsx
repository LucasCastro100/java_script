import { Link } from "react-router-dom";
import logoImg from "../assets/logo.svg";

export function Header() {
    return (
        <div className="w-full bg-gray-600 px-4 py-4 md:py-8 ">
            <Link to="/">
                <img src={logoImg} alt="Logo Cripto Moedas" className="mx-auto" />
            </Link>
        </div>
    )
}