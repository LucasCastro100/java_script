import Image from "next/image";

import heroImg from '../../../public/assets/hero.png'
import { Indicator } from "../component/card";

export default function HomePage() {
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