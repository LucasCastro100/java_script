import { Textarea } from "../component/textarea";

export default function DashboardPage() {
    return (
        <div className="flex-1">
            <div className="w-full max-w-6xl p-4 mx-auto">
                <div className="space-y-8">
                    <p className="font-bold text-3xl">Qual sua tarefa?</p>
                    <form className="flex flex-col gap-4">
                        <Textarea placeholder="Digite sua tarefa aqui..."/>
                        <div className="flex flex-row gap-2 items-center">
                            <input type="checkbox" className="h-6 w-6"/>
                            <label className="font-medium text-xl">Deixar tarefa pública?</label>
                        </div>

                        <button className="w-full px-4 py-2 border border-gray-500 rounded-md font-bold
                            hover:bg-gray-500 cursor-pointer" type="submit">Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}