import { GameList } from "@/components/games/list";
import { GamesFilter } from "@/components/games/filter";
import { GameCardDTO } from "@/types/Games";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Games",
  description: "Listagem | Consulta | Detalhes de jogos",
};

async function getGames(searchParams: {
  category?: string;
  platform?: string;
}) {
  const params = new URLSearchParams();

  if (searchParams.category) {
    params.append("category", searchParams.category);
  }

  if (searchParams.platform) {
    params.append("platform", searchParams.platform);
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/games?${params.toString()}`,
    { cache: "no-store" } // 🔴 obrigatório
  );

  return (await res.json()).content as GameCardDTO[];
}

async function getFilters() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/games`,
    { cache: "force-cache" }
  );

  const data = (await res.json()).content as GameCardDTO[];

  return {
    categories: Array.from(new Set(data.map(g => g.genre))),
    platforms: Array.from(new Set(data.map(g => g.platform))),
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: { category?: string; platform?: string };
}) {
  const [games, filters] = await Promise.all([
    getGames(searchParams),
    getFilters(),
  ]);

  console.log(games)

  return (
    <>
      <GamesFilter
        categories={filters.categories}
        platforms={filters.platforms}
      />
      <GameList games={games} />
    </>
  );
}
