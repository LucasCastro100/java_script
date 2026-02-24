import { TitlePage } from "@/components/site/globals/titlePage";
import { IBGEExplorer } from "@/components/site/ibge/IBGEExplorer";


export default function Page() {
    return (
        <div className="">
            <TitlePage title="IBGE Explorer" />

            <div className="w-full max-w-6xl mx-auto p-4">
                <IBGEExplorer />
            </div>
        </div>
    );
}
