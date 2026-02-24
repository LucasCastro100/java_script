'use client'

import Image from "next/image";
import { useState } from "react";

type Props = {
    images: string[];
}
export const ImageSlide = ({ images }: Props) => {
    const [selectImageIndex, setSelectImageIndex] = useState(0);
    const handleThumbnailClick = (index: number) => {
        setSelectImageIndex(index);
    }

    return (
        <div className="w-full md:max-w-sm">
            <div className="border-2 border-gray-300 p-4 rounded-lg bg-white">
                <Image
                    src={images[selectImageIndex]}
                    alt=""
                    width={380}
                    height={380}
                    className="max-w-full rounded" />
            </div>

            <div className="grid grid-cols-4 gap-4 mt-4">
                {images.map((img, index) => (
                    <div key={index} 
                    className={`cursor-pointer rounded-lg border ${index === selectImageIndex ? 'border-blue-500' : 'border-gray-300'} bg-white p-2`}
                    onClick={() => handleThumbnailClick(index)}
                    >
                    <Image
                    src={img}
                    alt=""
                    width={120}
                    height={120}
                    className="max-w-full rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
}