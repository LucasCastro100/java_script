import { Link } from "react-router-dom";

export function Notfound(){
    return (
        <div className="flex flex-col gap-4 items-center justify-center h-screen bg-black">
          <h1 className="font-bold text-white text-8xl">404</h1>
          <p className="font-bold text-white text-4xl">OPSSS... Página não encontrada!</p>
          <Link to="/" className="rounded-md border-none bg-blue-400 hover:bg-blue-600 text-white font-bold text-2xl py-2 px-4">Voltar para Home</Link>
        </div>
      )
}