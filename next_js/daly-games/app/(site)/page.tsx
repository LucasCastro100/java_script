import { GameRandomSkeleton } from "@/components/games/skeleton/gameSkeleton";
import { GameCardDTO } from "@/types/Games";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Home",
  description: "Listagem | Consulta | Detalhes de jogos",
};

async function getGames() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.content as GameCardDTO[];
}

export default async function Home() {
  const games = await getGames();

  if (!games.length) return null;

  const randomGame = games[Math.floor(Math.random() * games.length)];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-center font-bold text-3xl">Separamos um jogo exclusivo apra você</h2>
      </div>

      <Suspense fallback={<GameRandomSkeleton />}>
        <div className="w-full md:max-w-3xl mx-auto">

          <Link href={`/game?id=${randomGame.id}`} className="border rounded-xl p-4 flex flex-col gap-4">
            <div className="relative w-full h-96">
              <Image
                src={randomGame.thumbnail}
                alt={randomGame.title}
                fill
                className="rounded-lg object-cover"
                sizes="100vw"
                priority
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <h2 className="font-bold">{randomGame.title}</h2>

              <div className="flex flex-row gap-2 items-center">
                <p className="font-medium text-xs text-gray-500">Genero:</p>
                <p className="font-bold">{randomGame.genre}</p>
              </div>
            </div>
          </Link>
        </div>
      </Suspense>
    </div>
  );
}
