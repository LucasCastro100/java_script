import { TitlePage } from "@/components/site/globals/titlePage";
import { data } from "@/data";
import { Project } from "@/types/projects";
import { Metadata } from "next";
import { StackList } from "@/components/site/stackList ";
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
      <TitlePage title="Projetos" />

      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4 gap-4">
          {list.map((project) => (
            <Link
              href={project.url}
              key={project.slug}
              className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <h3 className="text-lg font-semibold text-gray-800 transition-colors group-hover:text-indigo-600">
                {project.name}
              </h3>

              <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                {project.description}
              </p>

              <StackList tags={project.tags} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;