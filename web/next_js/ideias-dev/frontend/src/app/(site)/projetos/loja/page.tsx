
import { TitlePage } from "@/components/site/globals/titlePage";
import { Banners } from "@/components/site/loja/home/banners";
import { BenefitCard } from "@/components/site/loja/home/benefitCard";
import { MostSoldProducts } from "@/components/site/loja/home/most-sold-products";
import { MostViewedProducts } from "@/components/site/loja/home/most-viewed-products";
import { ProductListSkeleton } from "@/components/site/loja/home/product-list-skeleton";
import { data } from "@/data";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Produto X - MeuSite",
  description: "Página do Produto X",
  openGraph: {
    title: "Produto X - Open Graph",
    description: "Detalhes do Produto X",
  },
};

export default function Page() {
  return (
    <div className="">
      <TitlePage title="Projeto E-Comerce" />

      <div className="w-full max-w-6xl mx-auto p-4">
        <Banners list={data.storeBanners} />

        <div className="mt-8 flex flex-col md:flex-row gap-4 md:gap-8">
          <BenefitCard
            icon="/assets/loja/ui/truck-line.png"
            alt="Frete grátis"
            title="Frete Grátis"
            description="Para todo o Brasil."
          />

          <BenefitCard
            icon="/assets/loja/ui/discount-percent-line.png"
            alt="Desconto"
            title="Muitas ofertas"
            description="Ofertas imbatíveis."
          />

          <BenefitCard
            icon="/assets/loja/ui/arrow-left-right-line.png"
            alt="Troca fácil"
            title="Troca fácil"
            description="No período de 30 dias."
          />
        </div>

        <Suspense fallback={<ProductListSkeleton />}>
          <MostViewedProducts />
        </Suspense>

        <Suspense fallback={<ProductListSkeleton />}>
          <MostSoldProducts />
        </Suspense>
      </div>
    </div>
  );
}