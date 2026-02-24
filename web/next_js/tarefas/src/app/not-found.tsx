import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white space-y-4">
            <p className="font-bold text-8xl">
                404
            </p>

            <p className="font-bold text-3xl">
                Opss... Página não encontrada!
            </p>

            <Link href={'/'} className="cursor-pointer bg-gray-500 px-4 py-2 rounded-md hover:bg-gray-600">
                <p className="block font-bold text-xl">Voltar para Home</p>                
            </Link>

        </div>

    )
}