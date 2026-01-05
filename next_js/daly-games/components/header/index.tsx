import Link from "next/link"

export function Header() {
  return (
    <header className="w-full bg-slate-100 text-black px-4">
      <div className="max-w-7xl mx-auto py-4">
        <nav className="flex items-center justify-between">
          <Link href={'/'} className="flex flex-row gap-1">
            <h1 className="text-2xl font-bold">Daly</h1>
            <h1 className="text-2xl font-bold text-orange-500">Games</h1>
          </Link>

          <div className="flex flex-row items-center justify-center gap-4">
            <Link href={'/game/list'} className="text-lg font-medium hover:text-orange-500 transition-colors flex flex-row items-center gap-2">              
              <p>Games</p>
            </Link>

            <Link href={'/perfil'} className="text-lg font-medium hover:text-orange-500 transition-colors flex flex-row items-center gap-2">                            
              <p >Perfil</p>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}