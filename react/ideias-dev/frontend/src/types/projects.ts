export type ProjectItem = {
  name: string;
  description: string;
  slug: string;
  url: string;
};

export type ProjectLevel = {
  stacks: string[];
  projetos: ProjectItem[];
};

export type ProjectsProps = {
  projects: {
    basicos: ProjectLevel;
    intermediario: ProjectLevel;
    avancado: ProjectLevel;
  };
};
