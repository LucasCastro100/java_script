'use client'

import { GameCardSkeleton } from "./gameSkeleton"

export function GameListSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
                <GameCardSkeleton key={i} />
            ))}
        </div>
    )
}
