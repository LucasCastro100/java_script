'use client'

import { X } from "lucide-react";
import { ListMenuItemProps } from "../list-menu/type";
import { SidebarAccordion } from "../sidebar-accordion";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
  menuItems: ListMenuItemProps[];
  subMenuItems: ListMenuItemProps[];
}

export function Sidebar({
  open,
  onClose,
  pathname,
  menuItems,
  subMenuItems,
}: SidebarProps) {
  return (
    <>
      {/* ===== OVERLAY ===== */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`
          fixed top-0 right-0 z-50 h-full w-[320px] max-w-[85%]
          bg-gray-800 text-gray-100 shadow-2xl
          transform transition-transform duration-300
          ${open ? 'translate-x-0' : 'translate-x-full'}
          lg:hidden
        `}
      >
        {/* HEADER SIDEBAR */}
        <div className="flex items-center justify-end px-5 py-4 bg-gray-900 border-b border-gray-700">
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-700 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* CONTEÚDO */}
        <div className="px-5 py-6 flex flex-col gap-6 overflow-y-auto h-[calc(100%-64px)]">
          <SidebarAccordion
            title="Menu"            
            items={menuItems}
          />

          {pathname === '/' && (
            <SidebarAccordion
              title="Sub Menu"
              items={subMenuItems}
            />
          )}
        </div>
      </aside>
    </>
  );
}
