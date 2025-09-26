import { TitlePageProps } from "@/types/titlePages";


export const TitlePage = ({ title }: TitlePageProps) => {
    return (
        <div className="w-full bg-black p-4 mb-8">
            <h2 className="font-bold text-center text-2xl text-white">{title}</h2>
        </div>
    );
}