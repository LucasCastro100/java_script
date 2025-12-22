'use client'

import { GameCardDTO } from "@/types/Games";
import Link from "next/link";
import { GameCard } from "../card";

interface Props {
    games: GameCardDTO[];
}

export function GameList({ games }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {games.map((game) => (
                <GameCard key={game.id} game={game} />
            ))}
        </div>
    )
}