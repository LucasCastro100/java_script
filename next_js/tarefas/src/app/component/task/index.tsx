'use client'

import { FaShare, FaTrash } from "react-icons/fa"
import { TaskProps } from "../../types/Task"
import { toast } from "react-toastify"

interface TaskCompoentProps {
    data: TaskProps
}

export function Task({ data }: TaskCompoentProps) {
    function handleDelete() {
        toast.info("Funcionalidade de exclusão ainda não implementada.")
    }

    function handleShare() {
        toast.info("Funcionalidade de compartilhamento ainda não implementada.")
    }

    return (
        <div key={data.id} className="p-4 border border-gray-300 rounded-md">
            <div className="flex flex-row gap-8 items-center justify-between">
                <div className="flex-1 flex flex-col gap-4">
                    {data.public && (
                        <div className="flex flex-row gap-4">
                            <p className="p-2 bg-blue-300 font-medium rounded-md">PUBLICO</p>
                            <button onClick={handleShare} className="cursor-pointer">
                                <FaShare size={24} color="#fff" title="Excluir" />
                            </button>
                        </div>

                    )}

                    <h3 className="font-bold text-xl">{data.task}</h3>

                    {/* {data.description && <p className="text-gray-600 whitespace-pre-line">{data.description}</p>} */}

                    <p className={`font-medium ${data.completed ? 'text-green-600' : 'text-red-600'}`}>
                        {data.completed ? 'Concluída' : 'Pendente'}
                    </p>
                </div>

                <div className="flex">
                    <button onClick={handleDelete} className="cursor-pointer">
                        <FaTrash size={24} color="#fff" title="Excluir" />
                    </button>
                </div>
            </div>
        </div>
    )
}