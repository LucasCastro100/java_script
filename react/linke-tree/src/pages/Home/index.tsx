import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

export function Home() {
  return (
    <>
      <Header />

      <div className="flex flex-col gap-4 items-center justify-center p-4">
        <h1 className="text-3xl">Home</h1>
        <span className="text-1xl">Veja meus links</span>

        <div className="flex flex-col gap-4 items-center justify-center w-full md:w-1/2 mt-8">
          <Link to={'/'} className="w-full py-2 px-4 text-center rounded-md bg-red-400 hover:bg-red-800 font-bold">Youtube</Link>
          <Link to={'/'} className="w-full py-2 px-4 text-center rounded-md bg-purple-400 hover:bg-purple-800 font-bold">Instagram</Link>
          <Link to={'/'} className="w-full py-2 px-4 text-center rounded-md bg-blue-400 hover:bg-blue-800 font-bold">Facebook</Link>
        </div>

        <Footer />
      </div>
    </>
  )
}