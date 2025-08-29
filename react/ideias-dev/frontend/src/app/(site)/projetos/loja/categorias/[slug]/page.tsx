import { Link } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const CategoriaSlugPage = async ({ params, searchParams }: Props) => {
  const { slug } = await params;
  const filters = await searchParams;
  return (
    <div>
      <div className="text-md text-gray-500 mb-4">
        <Link href={"/ideias-dev/loja/"}>Home</Link> &gt;
        Temporario
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div className="text-3xl"><strong>99</strong> Produtos</div>
        <div className="">...</div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 md:max-w-64">Filtro</div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3">Grid</div>
      </div>
    </div>
  );
};

export default CategoriaSlugPage;