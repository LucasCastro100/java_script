'use client'

import Image from "next/image";
import heroImg from '../../../public/assets/hero.png'
import { Indicator } from "../component/card";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const params = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (params.get("error") === "auth") {
            toast.error("Você precisa fazer login com o Google.");

            // limpa a URL
            router.replace("/");
        }
    }, [params, router]);

    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col gap-8 md:gap-12 max-w-[500px]">
                <Image
                    alt="Logo tarefas+"
                    src={heroImg}
                    className="w-full"
                />

                <p className="text-center font-medium text-3xl">Sistema feito apra você organizar seus estudos e tarefas</p>

                <div className="flex flex-row justify-center items-center gap-4">
                    <Indicator className="flex-1 bg-gray-500" title="+0 posts" />
                    <Indicator className="flex-1 bg-gray-500" title="+0 comentários" />
                </div>
            </div>
        </div>
    );
}