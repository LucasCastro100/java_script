import { ReactNode } from "react";

export type ButtonCardCalc = {
  onClick: () => void;
  children: ReactNode; // pode ser ícone ou texto
  className?: string;
  active?: boolean; // novo prop para marcar ativo
};
