import Link from "next/link";

export function Header() {
    return (
        <header className="w-full bg-gray-900 py-4 shadow-md">
            <div className="w-full max-w-6xl mx-auto px-4 flex items-center justify-between">
                <Link href={'/'}>
                    <h1 className="text-3xl font-bold">
                        <span className="">Dev</span>
                        <span className="text-red-600">Motors</span>
                    </h1>
                </Link>

                <div className="flex items-center justify-end gap-4">
                    <Link href={'/'} className="hover:text-gray-300 text-xl font-semibold">Home</Link>
                    <Link href={'/servicos'} className="hover:text-gray-300 text-xl font-semibold">Serviços</Link>
                    <Link href={'/contatos'} className="hover:text-gray-300 text-xl font-semibold">Contatos</Link>
                </div>
            </div>
        </header>
    );
}