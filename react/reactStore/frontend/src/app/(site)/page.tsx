import Banners from "@/components/home/banners";
import BenefitCard from "@/components/home/benefitCard";
import ProductListSkeleton from "@/components/home/product-list-skeleton";
import { data } from "@/data";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "ideiasDev Store - Home",
  description: "Home da ideiasDev Store, explore nossos produtos e aproveite a experiência de compra!",
  authors: [{ name: "ideiasDev", url: "https://ideias.dev.br" }],
};

const Page = () => {
  return (
    <div className="">
      <Banners list={data.banners} />

      <div className="mt-8 flex flex-col md:flex-row gap-4 md:gap-8">
        <BenefitCard
          icon="/assets/ui/truck-line.png"
          alt="Frete grátis"
          title="Frete Grátis"
          description="Para todo o Brasil."
        />

        <BenefitCard        
          icon="/assets/ui/discount-percent-line.png"
          alt="Desconto"
          title="Muitas ofertas"
          description="Ofertas imbatíveis."
        />

        <BenefitCard
          icon="/assets/ui/arrow-left-right-line.png"
          alt="Troca fácil"
          title="Troca fácil"
          description="No período de 30 dias."
        />
      </div>

      <ProductListSkeleton />
      <ProductListSkeleton />
    </div>
  );
}

export default Page;