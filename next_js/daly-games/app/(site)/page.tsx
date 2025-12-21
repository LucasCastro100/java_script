import { GameList } from "@/components/games/list";
import { GameCardDTO } from "@/types/Games";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Listagem | Consulta | Detalhes de jogos",
};

async function getGames() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games`, { cache: "no-store" });
  const data = await res.json();
  return data.content as GameCardDTO[];
}

export default async function Home() {
  const games = await getGames();
  return (
    <GameList games={games} />
  )
}
