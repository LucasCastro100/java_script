'use client'

import { data } from "@/data";
import { MenuHeader } from "@/types/menuheader";
import Link from "next/link";
import { Modal } from "../modal";
import { useState, useEffect } from "react";
import { ContatoForm } from "../formContato";

export const Header = () => {
    const [isContatoOpen, setIsContatoOpen] = useState(false)
    const list: MenuHeader[] = data.menuHeader;

    // Permite abrir o modal de qualquer página
    useEffect(() => {
        const handleOpen = () => setIsContatoOpen(true);
        window.addEventListener("open-contato", handleOpen);
        return () => window.removeEventListener("open-contato", handleOpen);
    }, []);

    return (
        <header>
            <div className="w-full bg-white border-b border-gray-200">
                <div className="max-w-5xl mx-auto p-4">
                    <div className="flex items-center justify-center gap-4">
                        <div className="flex">
                            <Link href="/" className="text-2xl font-bold text-gray-900">
                                IDEIAS DEV
                            </Link>
                        </div>

                        <div className="flex-1">
                            <div className="w-full hidden lg:flex gap-4">
                                <div className="flex-1">
                                    <ul className="flex h-full items-center justify-center gap-4">
                                        {list.map((item) => (
                                            <li key={item.label}>
                                                {item.href ? (
                                                    <Link href={item.href}>
                                                        <div className="font-semibold text-lg text-gray-500 hover:text-blue-400">
                                                            {item.label}
                                                        </div>
                                                    </Link>
                                                ) : item.modal ? (
                                                    <button
                                                        onClick={() => setIsContatoOpen(true)}
                                                        className="font-semibold text-lg text-gray-500 hover:text-blue-400"
                                                    >
                                                        {item.label}
                                                    </button>
                                                ) : null}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <Modal
                            isOpen={isContatoOpen}
                            onClose={() => setIsContatoOpen(false)}
                            title="Fale Conosco" >
                            <ContatoForm />
                        </Modal>
                    </div>
                </div>
            </div>
        </header>
    )
}
