import { Metadata } from "next";
import { TitlePage } from "@/components/site/globals/titlePage";
import TurmaPage from "./turma";

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
      <TitlePage title="Controle de Escolas" />

      <div className="w-full max-w-6xl mx-auto p-4">
        <TurmaPage />
      </div>
    </div>
  );
}