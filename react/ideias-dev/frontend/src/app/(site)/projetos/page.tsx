import { data } from "@/data";
import { Project } from "@/types/projects";

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Minha Página",
  description: "Descrição desta página em Next.js com metadata",
  authors: [
    { name: "Lucas Oliveira", url: "https://meusite.com/autor/lucas" }
  ],
  keywords: ["Next.js", "React", "Tailwind"],
}

const Page = () => {
  const list: Project[] = data.projects;

  return (
    <div className="">
      <h2 className="font-bold text-2xl">PROJETOS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4 gap-4">
        {list.map((project) => (
          <Link href={project.url} className="mb-4 p-4 border rounded-lg hover:bg-gray-100">
            <div key={project.slug} className="text-md font-bold text-gray-700">{project.slug}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Page;