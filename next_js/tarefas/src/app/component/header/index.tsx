import Link from "next/link";

export function Header() {
    return (
        <div className="w-full border-b-4 border-b-white">
            <div className="w-full max-w-6xl p-4 m-auto">
                <div className="flex items-center justify-between">
                    <Link href={'/'}>
                        <h1 className="font-bold text-3xl">
                            Tarefas
                            <span className="text-red-500">+</span>
                        </h1>
                    </Link>

                    <div className="">
                        <Link href={'/auth/login'} className=""> 
                            <button className="px-4 py-2 border border-gray-500 rounded-md cursor-pointer">Acessar</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}