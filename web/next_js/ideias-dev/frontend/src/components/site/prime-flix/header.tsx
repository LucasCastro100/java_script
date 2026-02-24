import Link from "next/link"

export const HeaderFilmes = () => {
    return (
        <header className="flex flex-col md:flex-row gap-4 items-center justify-center p-2 bg-white">
            <Link href={'/projetos/prime-flix'} className="font-semibold text-lg text-gray-500 hover:text-gray-700">Lista de Filmes</Link>
            <Link href={'/projetos/prime-flix/favoritos'} className="font-semibold text-lg text-gray-500 hover:text-gray-700">Filmes Favoritos</Link>
        </header>
    )
}