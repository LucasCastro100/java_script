import { TitlePage } from "@/components/site/globals/titlePage";
import { ImageSlide } from "@/components/site/loja/product/image-slide";
import { ProductDescription } from "@/components/site/loja/product/product-description";
import { ProductDetails } from "@/components/site/loja/product/product-details";
import { RelatedProducts } from "@/components/site/loja/product/related-products";
import { RelatedProductSkeleton } from "@/components/site/loja/product/related-products-skeleton";
import { data } from "@/data";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
    params: { id: string }; // ✅ tipado corretamente
};

export default function Page({ params }: Props) {
    const { id } = params; // ✅ sem await
    const product = data.products.find((item) => item.id.toString() === id);

    return (
        <div className="">
            <TitlePage title="Projeto E-Comerce" />

            {!product &&
                (
                    <div className="w-full max-w-6xl mx-auto p-4">
                        <h2 className="text-xl font-semibold">Produto não encontrado</h2>
                        <Link href="/projetos/loja/categorias/camisas" className="text-blue-500 underline">
                            Voltar para lista
                        </Link>
                    </div>
                )
            }

            {product && (
                <div className="w-full max-w-6xl mx-auto p-4">
                    <div className="text-md text-gray-500 mb-4 flex flex-row items-center ">
                        <Link href={"/projetos/loja/"}>Home</Link> &gt;
                        <Link href={"/projetos/loja/categorias/camisas"}>Camisas</Link> &gt;
                        {product.label}
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 md:gap-16">
                        <ImageSlide images={product.images} />
                        <ProductDetails product={product} />
                    </div>

                    <ProductDescription description={product.description} />

                    <Suspense fallback={<RelatedProductSkeleton />}>
                        <RelatedProducts id={product.id} />
                    </Suspense>
                </div>
            )}
        </div>
    );
}
