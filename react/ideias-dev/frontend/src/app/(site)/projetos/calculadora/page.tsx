import { Metadata } from "next";
import Calculadora from "./Calculadora";
import { TitlePage } from "@/components/site/globals/titlePage";

export const metadata: Metadata = {
  title: "Minha Página",
  description: "Descrição desta página em Next.js com metadata",
  authors: [
    { name: "Lucas Oliveira", url: "https://meusite.com/autor/lucas" }
  ],
  keywords: ["Next.js", "React", "Tailwind"],
}

export default function Page() {
  return (
    <div className="">
      <TitlePage title="Projeto Calculadora" />

      <div className="w-full max-w-6xl mx-auto p-4">
        <Calculadora />
      </div>
    </div>
  );
}