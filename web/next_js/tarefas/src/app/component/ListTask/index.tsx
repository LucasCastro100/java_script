'use client';

import { TaskProps } from "../../types/Task";
import { Task } from "../task";

interface ListProps {
    data: TaskProps[]
}

export function ListTasks({ data }: ListProps) {
    return (
        <div className="space-y-4">
            {data.map((task) => (
                <Task key={task.id} data={task} />
            ))}
        </div>
    )
}