'use client';

import { ChangeEvent, useState } from "react";
import { ListTasks } from "../component/ListTask";
import { Textarea } from "../component/textarea";
import { TaskProps } from "../types/Task";

const tasks: TaskProps[] = [
    {
        id: "1",
        title: "Estudar TypeScript",
        description: "Revisar generics, interfaces e tipos utilitários",
        completed: false,
        public: true,
    },
    {
        id: "2",
        title: "Criar layout no Tailwind",
        description: "Implementar flex layout com min-h-screen",
        completed: false,
        public: false,
    },
    {
        id: "3",
        title: "Revisar métricas de Ads",
        description: "Analisar CTR e CPC das campanhas recentes",
        completed: true,
        public: false,
    },
    {
        id: "4",
        title: "Criar componente de filtro",
        description: "Adicionar searchQuery e filtro por título",
        completed: false,
        public: true,
    },
    {
        id: "5",
        title: "Refatorar API de leads",
        description: "Organizar controllers e DTOs",
        completed: true,
        public: false,
    },
];

export default function DashboardPage() {
    const [text, setText] = useState("");
    const [isPublic, setIsPublic] = useState(false);    

    return (
        <div className="flex-1">
            <div className="w-full max-w-6xl p-4 mx-auto">
                <div className="space-y-12">
                    <div className="space-y-8">
                        <p className="font-bold text-3xl">Qual sua tarefa?</p>
                        <form className="flex flex-col gap-4">
                            <Textarea placeholder="Digite sua tarefa aqui..." value={text} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}/>
                            <div className="flex flex-row gap-2 items-center">
                                <input type="checkbox" className="h-6 w-6" checked={isPublic} onChange={(e: ChangeEvent<HTMLInputElement>) => setIsPublic(e.target.checked)}/>
                                <label className="font-medium text-xl">Deixar tarefa pública?</label>
                            </div>

                            <button className="w-full px-4 py-2 border border-gray-500 rounded-md font-bold
                            hover:bg-gray-500 cursor-pointer" type="submit">Registrar</button>
                        </form>
                    </div>

                    <hr className="w-full border-2 border-white"/>

                    <div className="space-y-8">
                        <p className="font-bold text-3xl text-center">Lista de tarefas</p>
                        <ListTasks data={tasks} />
                    </div>
                </div>
            </div>
        </div>
    );
}