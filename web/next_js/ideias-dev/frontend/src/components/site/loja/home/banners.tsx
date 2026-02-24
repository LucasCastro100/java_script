'use client';

import { Banner } from "@/types/loja/banners";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
    list: Banner[];
}

let bannerTimer: NodeJS.Timeout;
let bannerTime = 5000

export const Banners = ({ list }: Props) => {
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        setCurrentImage((currentImage) => {
            if (currentImage + 1 >= list.length) {
                return 0;
            } else {
                return currentImage + 1;
            }
        });
    }

    const handleBannerClick = (index: number) => {
        setCurrentImage(index);
        clearInterval(bannerTimer); // limpa o timer
        bannerTimer = setInterval(nextImage, bannerTime) // reinicia o timer
    }

    useEffect(() => {
        bannerTimer = setInterval(nextImage, bannerTime)
        return () => clearInterval(bannerTimer); // limpa o timer
    }, [])

    return (
        <div>
            <div className="relative aspect-[3/1]">
               {list.map((banner, index) => (
                <Link 
                key={index} 
                href={banner.href}
                className="transition-all absolute inset-0"
                style={{ opacity: currentImage == index ? 1 : 0 }}>                
                    <Image
                        src={banner.img}
                        alt={`Banner ${index + 1}`}
                        width={1200}
                        height={400}
                        className="rounded-sm"/>
                </Link>
               ))} 
            </div>

            <div className="mt-4 flex justify-center gap-4">
               {list.map((banner, index) => (
                    <div key={index} className="size-4 bg-blue-800 rounded-full cursor-pointer"
                    style={{ opacity: currentImage == index ? 1 : 0.3 }}
                    onClick={() => handleBannerClick(index)}></div>
               ))}
            </div>            
        </div>
    );
}