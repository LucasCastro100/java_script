'use client'

import { GameCardDTO } from "@/types/Games"
import Link from "next/link"

interface Props {
    game: GameCardDTO
}

export function GameCard({ game }: Props) {
    return (
        <Link href={`${process.env.NEXT_PUBLIC_DAILY_GAMES_API_URL}/game?id=${game.id}`}>
            <div className="rounded-xl flex flex-col gap-4 border border-gray-300">
                <img src={game.thumbnail} alt={game.title} className="rounded-t-xl"/>

                <div className="py-2 px-4">
                    <h2>{game.title}</h2>

                    <div className="flex flex-row gap-2 items-center">
                        <p className="font-medium text-xs text-gray-500">Genero:</p>
                        <p className="font-bold">{game.genre}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}