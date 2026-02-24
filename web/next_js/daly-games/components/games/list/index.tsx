'use client'

import { GameCardDTO } from "@/types/Games";
import { GameCard } from "../card";
import { Suspense } from "react";
import { GameListSkeleton } from "../skeleton";

interface Props {
    games: GameCardDTO[];
}

export function GameList({ games }: Props) {
    return (
        <Suspense fallback={<GameListSkeleton />}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {games.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </Suspense>
    )
}