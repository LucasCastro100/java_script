import { FaBars, FaCar, FaChartBar, FaHome } from "react-icons/fa";
import { MenuItem } from "../MenuItem";

interface AsideProps {
    isOpen: boolean;
    toggle: () => void;
}

export function Aside({ isOpen, toggle }: AsideProps) {
    return (
        <aside
            className={`h-screen transition-all duration-300 p-4 flex flex-col border-r-2 border-r-gray-600 items-${isOpen ? "start" : "center"
                } ${isOpen ? "w-64" : "w-20"}`}>

            <button
                onClick={toggle}
                className="mb-6 p-2 rounded hover:bg-zinc-800 transition-colors" >
                <FaBars size={22} />
            </button>

            <nav className="flex flex-col gap-4 w-full">
                <MenuItem to="/" icon={<FaHome />} label="Home" isOpen={isOpen} />
                <MenuItem to="/dashboard" icon={<FaChartBar />} label="Dashboard" isOpen={isOpen} />
                <MenuItem to="/dashboard/new-car" icon={<FaCar />} label="Carros" isOpen={isOpen} />
            </nav>
        </aside>
    );
}

