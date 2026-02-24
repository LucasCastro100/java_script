'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export function Header() {
    const { data: session, status } = useSession();


    return (
        <div className="w-full border-b-4 border-b-white">
            <div className="w-full max-w-6xl p-4 m-auto">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                        <Link href={'/'}>
                            <h1 className="font-bold text-3xl">
                                Tarefas
                                <span className="text-red-500">+</span>
                            </h1>
                        </Link>

                        {session?.user && (
                            <Link href={'/dashboard'} className="">
                                <button className="px-4 py-2 border border-gray-500 rounded-md  bg-gray-500
                            hover:bg-gray-600
                            cursor-pointer">Meu Painel</button>
                            </Link>
                        )}
                    </div>

                    <div className="">
                        {
                            status === 'loading' ? (
                                <button className="px-4 py-2 border border-gray-500 rounded-md 
                                hover:bg-gray-500 cursor-pointer">Carregando...</button>
                            ) : session ? (
                                <button className="px-4 py-2 border border-gray-500 rounded-md 
                            hover:bg-gray-500 cursor-pointer" onClick={() => signOut()}>Olá {session?.user?.name}</button>
                            ) : (
                                <button className="px-4 py-2 border border-gray-500 rounded-md 
                            hover:bg-gray-500 cursor-pointer" onClick={() => signIn('google')}>Acessar</button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}