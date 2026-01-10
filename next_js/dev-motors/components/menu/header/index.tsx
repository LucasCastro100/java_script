'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Sidebar } from "../sidebar";
import { MENU_ITEMS, SUB_MENU_ITEMS } from "../menu.config";

export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);

  /* 🔒 trava scroll da página */
  useEffect(() => {
    document.body.style.overflow = openMenu ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openMenu]);

  /* fecha menu ao trocar rota */
  useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);

  return (
    <header className="w-full bg-gray-950 text-gray-100 shadow-md">
      {/* ===== TOP BAR ===== */}
      <div className="w-full max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-3xl font-bold tracking-tight">
            <span>Dev</span>
            <span className="text-red-600">Motors</span>
          </h1>
        </Link>

        {/* BOTÃO MENU MOBILE */}
        <button
          className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-md
            hover:bg-gray-800 transition"
          onClick={() => setOpenMenu(true)}
        >
          <Menu size={28} />
          <span className="text-sm font-medium">Menu</span>
        </button>

        {/* MENU DESKTOP */}
        <nav className="hidden lg:flex items-center gap-6">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* SIDEBAR */}
      <Sidebar
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        pathname={pathname}
        menuItems={MENU_ITEMS}
        subMenuItems={SUB_MENU_ITEMS}
      />
    </header>
  );
}
