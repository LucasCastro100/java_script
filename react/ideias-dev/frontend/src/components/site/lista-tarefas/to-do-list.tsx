'use client'

import { useState } from "react"
import { ListItem } from "./list-item";
import { Item } from "@/types/lista-tarefas/item";
import { FaPlus } from "react-icons/fa";
import { useRandomId } from "@/hooks/id-random";
export const ToDoList = () => {
    const [nameTask, setNameTask] = useState<string>("")
    const [list, setList] = useState<Item[]>([])

    const generateId = useRandomId()
    const addToList = () => {
        if (!nameTask.trim()) return;

        setList((prevList) => [...prevList, { id: generateId(6), task: nameTask, isCompleted: false }])
        setNameTask("")
    }

    return (
        <div className="">
            <div className="text-center text-2xl font-bold text-gray-900 pb-4 border-b-2 border-gray-900 mb-8">Adicionar tarefa</div>

            <div className="">
                <div className="flex flex-row items-center justify-start gap-4 border border-gray-500 bg-white rounded-xl p-4 mb-8">
                    <FaPlus className="size-6" onClick={addToList} />
                    <input type="text" placeholder="Adicionar Tarefa" className="px-4 py-2" value={nameTask} onChange={(e) => setNameTask(e.target.value)} />
                </div>

                {list.length === 0 && (
                    <div className="text-center text-red-500 text-xl md:text-3xl">Nenhuma tarefa adicionada</div>
                )}

                {list.length > 0 && (
                    <ul className="flex flex-col space-y-4">
                        {list.map((item) => (
                            <ListItem key={item.id} item={item} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}