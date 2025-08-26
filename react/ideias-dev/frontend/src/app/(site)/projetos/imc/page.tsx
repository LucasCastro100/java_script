import { Metadata } from "next";
import ImcCalc from "./ImcCalc";
import { TitlePage } from "@/components/site/globals/titlePage";

export const metadata: Metadata = {
  title: "Minha Página",
  description: "Descrição desta página em Next.js com metadata",
  authors: [
    { name: "Lucas Oliveira", url: "https://meusite.com/autor/lucas" },
  ],
  keywords: ["Next.js", "React", "Tailwind"],
};

export default function Page() {
  return (
    <div className="">
      <TitlePage title="Projeto IMC" />

      <div className="w-full max-w-6xl mx-auto p-4">
        <ImcCalc />
      </div>
    </div>    
  );
}
