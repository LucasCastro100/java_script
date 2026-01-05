import { GameRandomSkeleton } from "@/components/games/skeleton/gameSkeleton";
import { Input } from "@/components/input";
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
    next: { revalidate: 320 },
    cache: "no-store",
  });
  const data = await res.json();
  return data.content as GameCardDTO[];
}

async function getGameData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/game`, {
    next: { revalidate: 320 },
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
        <div className="w-full md:max-w-3xl mx-auto space-y-8">

          <Link href={`/game?id=${randomGame.id}`} className="flex flex-col gap-4">
            <div className="relative w-full h-96">
              <Image
                src={randomGame.thumbnail}
                alt={randomGame.title}
                fill
                className="rounded-lg object-cover opacity-75 hover:opacity-100 transition-all duration-300"
                sizes="100vw"
                priority
              />

              <div className="absolute z-20 bottom-0 p-3 ">
                <p className="font-bold text-white text-4xl"
                  style={{
                    WebkitTextStroke: "1px black",
                    textShadow: "0 2px 4px rgba(0,0,0,0.6)",
                  }}
                >
                  {randomGame.title}
                </p>
              </div>

            </div>
          </Link>

          <Input />
        </div>
      </Suspense>
    </div>
  );
}
