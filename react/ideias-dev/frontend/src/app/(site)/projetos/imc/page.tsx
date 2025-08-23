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
      <p className="">IMC</p>
    </div>
  );
}

export default Page;