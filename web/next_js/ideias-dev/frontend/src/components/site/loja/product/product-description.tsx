'use client'

import Image from "next/image";
import { useState } from "react";

type Props = {
    description?: string;
}
export const ProductDescription = ({ description }: Props) => {
    const [opened, setOpened] = useState(false);
    return (
        <div className="w-full mt-8 border border-gray-200 rounded-md p-4 bg-white">
            <div className={`cursosr-pointer flex justify-between items-center ${opened ? "pb-2 border-b border-gray-200" : ""}`} onClick={() => setOpened(!opened)}>
                <h3 className="text-lg font-bold">Informação do produto</h3>

                <Image src="/assets/loja/ui/arrow-left-s-line.png" alt="Abrir filtro" width={24} height={24} className={`${opened ? "rotate-0": "rotate-180"} transition-all`} />
            </div>

            {opened && (
                <div className="mt-8">
                    <p className="text-gray-700">{description}</p>
                </div>

            )}
        </div>
    );
}