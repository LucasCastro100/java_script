import { TitlePage } from "@/components/site/globals/titlePage";
import { ProductListFilter } from "@/components/site/loja/categories/product-list-filter";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const filters = await searchParams;

  return (
    <div className="">
      <TitlePage title="Projeto E-Comerce" />

      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="text-md text-gray-500 mb-4 flex-flex-row items-center ">
          <Link href={"/projetos/loja/"}>Home</Link> &gt;
          Temporario
        </div>

        <ProductListFilter />
      </div>
    </div>
  );
};