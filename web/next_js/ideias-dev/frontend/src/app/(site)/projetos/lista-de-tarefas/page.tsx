import { Metadata } from "next";
import { TitlePage } from "@/components/site/globals/titlePage";
import { ToDoList } from "../../../../components/site/lista-tarefas/to-do-list";

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
      <TitlePage title="Lista de Tarefas" />

      <div className="w-full max-w-6xl mx-auto p-4">
        <ToDoList />
      </div>
    </div>    
  );
}