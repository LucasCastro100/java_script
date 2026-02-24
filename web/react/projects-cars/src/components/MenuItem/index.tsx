import type { JSX } from "react";
import { NavLink } from "react-router-dom";

interface MenuItemProps {
    icon: JSX.Element;
    label: string;
    to: string;
    isOpen: boolean;
}

export function MenuItem({ icon, label, to, isOpen }: MenuItemProps) {
    return (
        <NavLink
            to={to}
            end
            title={!isOpen ? label : ""}
            className={({ isActive }) =>
                `flex items-center gap-3 rounded-md p-2 cursor-pointer transition-colors hover:bg-zinc-800 
                ${isActive ? "bg-zinc-800 " : "text-white"}`
            }
        >
            <div className="text-xl">{icon}</div>
            {isOpen && <span className="text-sm">{label}</span>}
        </NavLink>
    );
}
