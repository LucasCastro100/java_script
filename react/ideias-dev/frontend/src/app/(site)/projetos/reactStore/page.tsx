import { TitlePage } from "@/components/site/globals/titlePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minha Página",
  description: "Descrição desta página em Next.js com metadata",
  authors: [
    { name: "Lucas Oliveira", url: "https://meusite.com/autor/lucas" },
  ],
  keywords: ["Next.js", "React", "Tailwind"],
}

const Page = () => {
  return (
    <div className="">
      <TitlePage title="Projeto Store" />

      <div className="w-full max-w-6xl mx-auto">

      </div>
    </div>
  );
}

export default Page;