import { TitlePage } from "@/components/site/globals/titlePage";
import { FilmesFavoritos } from "@/components/site/prime-flix/favoritos";
import { Metadata } from "next";

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
    <div className="w-full max-w-6xl mx-auto p-4">
      <FilmesFavoritos />
    </div>
  );
}
