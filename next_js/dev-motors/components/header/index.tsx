'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from 'lucide-react';
import { useEffect, useState } from "react";

export function Header() {
    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        setOpenMenu(false);
      }, [pathname]);

    return (
        <header className="w-full bg-gray-900 py-4 shadow-md flex flex-col gap-4">
            <div className="w-full max-w-6xl mx-auto px-4 flex items-center justify-between">
                <Link href={'/'}>
                    <h1 className="text-3xl font-bold">
                        <span className="">Dev</span>
                        <span className="text-red-600">Motors</span>
                    </h1>
                </Link>

                {/* TELAS MENORES */}
                <div className="flex items-center justify-end gap-4 lg:hidden relative">
                    <button
                        className="cursor-pointer z-99 flex flex-row items-center gap-2"
                        onClick={() => setOpenMenu(!openMenu)} >
                        <Menu size={34} />
                        <p>Menu</p>
                    </button>

                    {openMenu && (
                        <div className="absolute right-0 top-12 z-50">
                            <div className="w-[320px] rounded-xl bg-white text-black shadow-lg border border-gray-200 p-5 flex flex-col gap-6 ">

                                {/* Menu */}
                                <div className="flex flex-col gap-4">
                                    <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 text-center">
                                        Menu
                                    </h2>

                                    <div className="flex flex-col gap-2">
                                        {[
                                            { href: "/", label: "Home" },
                                            { href: "/servicos", label: "Serviços" },
                                            { href: "/contatos", label: "Contatos" },
                                        ].map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className="flex justify-end rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100 transition">
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {pathname === '/' && (
                                    <>
                                        {/* Divider */}
                                        < div className="h-px bg-gray-200" />

                                        {/* SubMenu */}
                                        <div className="flex flex-col gap-4">
                                            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 text-center">
                                                Submenu
                                            </h2>

                                            <div className="flex flex-col gap-2">
                                                {[
                                                    { href: "/", label: "Home" },
                                                    { href: "/servicos", label: "Serviços" },
                                                    { href: "/contatos", label: "Contatos" },
                                                ].map((item) => (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        className="flex justify-end rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100 transition">
                                                        {item.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </>

                                )}
                            </div>
                        </div>
                    )}

                </div>

                {/* TELAS MAIORES */}
                <div className="hidden items-center justify-end gap-4 lg:flex">
                    <Link href={'/'} className="hover:text-gray-300 text-xl font-semibold">Home</Link>
                    <Link href={'/servicos'} className="hover:text-gray-300 text-xl font-semibold">Serviços</Link>
                    <Link href={'/contatos'} className="hover:text-gray-300 text-xl font-semibold">Contatos</Link>
                </div>
            </div>

            {pathname === '/' && (
                <div className="w-full max-w-6xl mx-auto px-4 flex items-center justify-start">
                    <div className="flex items-center justify-end gap-4">
                        <Link href={'/'} className="hover:text-gray-300 text-xl font-semibold">Home</Link>
                        <Link href={'/servicos'} className="hover:text-gray-300 text-xl font-semibold">Serviços</Link>
                        <Link href={'/contatos'} className="hover:text-gray-300 text-xl font-semibold">Contatos</Link>
                    </div>
                </div>
            )}
        </header>
    );
}