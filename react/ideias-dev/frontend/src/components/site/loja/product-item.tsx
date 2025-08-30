'use client'

import { Product } from "@/types/loja/product"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

type Props = {
    data: Product
}

export const ProductItem = ({ data }: Props) => {
    const [liked, setLiked] = useState(data.liked);

    const toggleLike = () => {
        setLiked(!liked);
    }

    const link = `/projetos/loja/categorias/${data.id}`
    return (
        <div className="bg-white border border-gray-200 rounded-md p-4 flex flex-col gap-2">
            <div className="flex items-center justify-end">
                <div className="border border-gray-200 rounded-md p-2 cursor-pointer">
                    {liked &&
                        <Image
                            src={'/assets/loja/ui/heart-3-fill.png'}
                            alt="Like"
                            width={24}
                            height={24}
                            onClick={toggleLike} />
                    }
                    {!liked &&
                        <Image
                            src={'/assets/loja/ui/heart-3-line.png'}
                            alt="Like"
                            width={24}
                            height={24}
                            onClick={toggleLike} />
                    }
                </div>
            </div>

            <div className="">
                <Link href={link} className="flex items-center justify-center">
                    <Image src={data.image} alt={data.label} width={200} height={200} className="max-w-full h-48" />
                </Link>
            </div>

            <div className="">
                <Link href={link}>
                    <h3 className="text-lg font-semibold ">{data.label}</h3>
                </Link>
            </div>

            <div className="">
                <Link href={link}>
                    <p className="text-blue-500 font-semibold">R$ {data.price.toFixed(2)}</p>
                </Link>
            </div>

            <div className="">
                <p className="text-gray-400">PAGAMENTO VIA PIX</p>
            </div>
        </div >
    )
}