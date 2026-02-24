'use client'

import { Item } from "@/types/lista-tarefas/item"
import { useState } from "react"

type Props = {
    item: Item
}

export const ListItem = ({item}: Props) => {
    const [isChecked, setIsChecked ] = useState(item.isCompleted)

    return (
        <div className={`flex flex-row items-center justify-start gap-4 border border-gray-500 bg-white rounded-md p-4 ${isChecked ? 'line-through' : ''}`}>
            <input type="checkbox" className="size-6" checked={isChecked} onChange={(e) => {setIsChecked(e.target.checked)}}/>
            <label>{item.task}</label>
        </div>
    )
}