import { Metadata } from "next";
import ImcCalc from "./ImcCalc";

export const metadata: Metadata = {
  title: "Minha Página",
  description: "Descrição desta página em Next.js com metadata",
  authors: [
    { name: "Lucas Oliveira", url: "https://meusite.com/autor/lucas" },
  ],
  keywords: ["Next.js", "React", "Tailwind"],
};

export default function Page() {
  return (
    <div className="mt-8">
      <ImcCalc />
    </div>
  );
}
