import { FaBars, FaCar, FaChartBar, FaHome } from "react-icons/fa";
import { MenuItem } from "../MenuItem";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConection";
import { BiUser } from "react-icons/bi";
import { TbLogout2 } from "react-icons/tb";

interface AsideProps {
    isOpen: boolean;
    toggle: () => void;
}

export function Aside({ isOpen, toggle }: AsideProps) {
    async function handleLogout() {
        await signOut(auth)
    }

    return (
        <aside
            className={`h-screen transition-all duration-300 p-4 flex flex-col border-r-2 border-r-gray-600 items-${isOpen ? "start" : "center"
                } ${isOpen ? "w-64" : "w-20"}`}>

            <button
                onClick={toggle}
                className="mb-6 p-2 rounded hover:bg-zinc-800 transition-colors" >
                <FaBars size={22} />
            </button>

            <nav className="flex flex-col gap-4 w-full h-full justify-between">
                <div>
                    <MenuItem to="/dashboard" icon={<FaChartBar />} label="Dashboard" isOpen={isOpen} />
                    <MenuItem to="/dashboard/my-cars" icon={<FaCar />} label="Meus Carros" isOpen={isOpen} />
                </div>

                <div className="">
                    <MenuItem to="/dashboard/perfil" icon={<BiUser />} label="Perfil" isOpen={isOpen} />
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 rounded-md p-2 cursor-pointer transition-colors hover:bg-zinc-800">
                        <div className="text-xl"><TbLogout2 /></div>
                        <span>Sair da conta</span>
                    </button>
                </div>

            </nav>
        </aside>
    );
}

