import { Metadata } from "next";
import Calculadora from "./Calculadora";

export const metadata: Metadata = {
  title: "Minha Página",
  description: "Descrição desta página em Next.js com metadata",
  authors: [
    { name: "Lucas Oliveira", url: "https://meusite.com/autor/lucas" }
  ],
  keywords: ["Next.js", "React", "Tailwind"],
}

const Page = () => {
  return (
    <div className="mt-8">
      <h2 className="font-bold text-2xl mb-4">Calculadora</h2>
      <Calculadora />
    </div>
  );
}

export default Page;