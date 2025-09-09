import { TitlePage } from "@/components/site/globals/titlePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produto X - MeuSite",
  description: "Página do Produto X",
  openGraph: {
    title: "Produto X - Open Graph",
    description: "Detalhes do Produto X",
  },
};
const Page = () => {
  return (
    <div className="">
      <TitlePage title="Contato" />

      <div className="w-full max-w-6xl mx-auto p-4">

      </div>
    </div>
  );
}

export default Page;