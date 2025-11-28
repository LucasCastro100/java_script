import Image from "next/image";

import heroImg from '../../../public/assets/hero.png'

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
            </div>
        </div>
    );
}