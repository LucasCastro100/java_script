// AccordionProjects.tsx
"use client";

import { useState } from "react";
import { StackList } from "@/components/site/stackList";
import Link from "next/link";
import { ProjectItem, ProjectLevel, ProjectsProps } from "@/types/projects";

export function AccordionProjects({ projects }: ProjectsProps) {
  const levels = [
    { name: "Básico", data: projects.basicos },
    { name: "Intermediário", data: projects.intermediario },
    { name: "Avançado", data: projects.avancado },
  ];

  const [openLevel, setOpenLevel] = useState<string | null>(null);
  const toggleLevel = (name: string) => setOpenLevel(openLevel === name ? null : name);

  return (
    <div className="space-y-4">
      {levels.map((level) => (
        <div key={level.name} className="border border-gray-200 rounded-lg bg-white overflow-hidden">
          <button
            onClick={() => toggleLevel(level.name)}
            className="w-full flex justify-between items-center p-5 text-left font-bold text-gray-900 bg-gray-100 hover:bg-gray-200 transition"
          >
            {level.name}
            <span className="text-xl">{openLevel === level.name ? "−" : "+"}</span>
          </button>

          {openLevel === level.name && (
            <div className="p-5 space-y-4">
              <StackList stacks={level.data.stacks} />

              {level.data.projetos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {level.data.projetos.map((project) => (
                    <Link
                      href={project.url}
                      key={project.slug}
                      className="group block rounded-2xl border border-gray-200 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-gray-50"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600">
                        {project.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-3">{project.description}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">Nenhum projeto neste nível ainda.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
