import { GameList } from "@/components/games/list";
import { GameCardDTO } from "@/types/Games";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Games",
    description: "Listagem | Consulta | Detalhes de jogos",
};

async function getGames(id: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/game?id=${id}`, { cache: "no-store" });
    const data = await res.json();
    return data.content as GameCardDTO[];
}

export default async function Page() {
    // const {id} = params;
    const games = await getGames(1);
    return (
        
        <GameList games={games} />
    )
}
