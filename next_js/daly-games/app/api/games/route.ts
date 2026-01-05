import { Game } from "@/types/Games";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");
    const platform = searchParams.get("platform");

    const params = new URLSearchParams();

    if (category) params.append("category", category);
    if (platform) params.append("platform", platform);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DAILY_GAMES_API_URL}/games?${params.toString()}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return NextResponse.json(
        { type: "error", msg: "Erro ao listar os jogos", content: [] },
        { status: 500 }
      );
    }

    const games: Game[] = await res.json();

    return NextResponse.json(
      { type: "success", msg: "Listagem filtrada", content: games },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { type: "error", msg: "Erro ao listar os jogos", content: [] },
      { status: 500 }
    );
  }
}
