import { TitlePage } from "@/components/site/globals/titlePage";
import { ImageSlide } from "@/components/site/loja/product/image-slide";
import { ProductDetails } from "@/components/site/loja/product/product-details";
import { data } from "@/data";
import Link from "next/link";

type Props = {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
    const { id } = await params;
    
    return (
        <div className="">
            <TitlePage title="Projeto E-Comerce" />

            <div className="w-full max-w-6xl mx-auto p-4">
                <div className="text-md text-gray-500 mb-4 flex-flex-row items-center ">
                    <Link href={"/projetos/loja/"}>Home</Link> &gt; 
                    <Link href={"/projetos/loja/camisas"}> Camisas</Link> &gt; 
                    Temporario
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <ImageSlide images={data.product.images}/>
                    <ProductDetails product={data.product}/>
                </div>
            </div>
        </div>
    );
}