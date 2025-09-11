
export type Class = {
  id: string;
  name: string; // cada turma tem alunos
};

export type School = {
  id: string;
  name: string;
  classes: Class[]; // cada escola tem turmas
};
