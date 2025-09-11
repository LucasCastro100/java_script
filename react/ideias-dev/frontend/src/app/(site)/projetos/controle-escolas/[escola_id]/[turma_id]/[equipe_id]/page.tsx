import { Metadata } from "next";
import { TitlePage } from "@/components/site/globals/titlePage";
import { useParams } from "next/navigation";

export const metadata: Metadata = {
  title: "Produto X - MeuSite",
  description: "Página do Produto X",
  openGraph: {
    title: "Produto X - Open Graph",
    description: "Detalhes do Produto X",
  },
};

export default function Page() {
  const { escola_id, turma_id, equipe_id } = useParams();

  return (
    <div className="">
      <TitlePage title="" />

      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="">Escola: {escola_id}</div>
        <div className="">Turma {turma_id}</div>
        <div className="">Equipe {equipe_id}</div>
      </div>
    </div>
  );
}