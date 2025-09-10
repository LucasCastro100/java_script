import { Metadata } from "next";
import ImcCalc from "../../../../components/site/imc/ImcCalc";
import { TitlePage } from "@/components/site/globals/titlePage";

export const metadata: Metadata = {
  title: "Produto X - MeuSite",
  description: "Página do Produto X",
  openGraph: {
    title: "Produto X - Open Graph",
    description: "Detalhes do Produto X",
  },
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