import { Game } from "@/types/Games";
import { NextResponse } from "next/server";

export async function GET(request: Request){
    try{
        const res = await fetch(process.env.DALY_GAMES_API_URL + "/games?sort-by=alphabetical", {
            cache: "no-store",
        })
    
        if(!res.ok){
            return NextResponse.json({type: "error", msg: "Erro ao listar os jogos", content: []}, {status: 500})
        }   

        const games: Game[] = await res.json()
    
        return NextResponse.json({type: "success", msg: "Listagem completa dos jogos", content: games}, {status: 200})
    } catch(err){
        return NextResponse.json({type: "error", msg: "Erro ao listar os jogos", content: []}, {status: 500})
    }    
}