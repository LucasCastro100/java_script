// Page.tsx -> componente servidor
import { AccordionProjects } from "@/components/site/accordionProjects";
import { TitlePage } from "@/components/site/globals/titlePage";
import { data } from "@/data";
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
    <div className="">
      <TitlePage title="Projetos" />

      <div className="w-full max-w-6xl mx-auto p-4">
        <AccordionProjects projects={data.projects} />
      </div>
    </div>

  );
}
