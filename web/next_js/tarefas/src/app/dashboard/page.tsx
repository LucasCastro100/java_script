'use client';

import { ChangeEvent, useEffect, useState } from "react";
import { ListTasks } from "../component/ListTask";
import { Textarea } from "../component/textarea";
import { TaskProps } from "../types/Task";
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/src/services/firebaseConection";

export default function DashboardPage() {
    const [text, setText] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [tasks, setTasks] = useState<TaskProps[]>([]);

    async function handleLoadTasks() {
        const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list: TaskProps[] = [];

            snapshot.forEach((doc) => {
                const data = doc.data();

                list.push({
                    id: doc.id,
                    task: data.task,
                    public: data.public,
                    completed: data.completed,
                    createdAt: data.createdAt?.toDate().toISOString() ?? ""
                });
            });

            setTasks(list);
        });

        return unsubscribe;
    }

    async function handleCreateTask(event: React.FormEvent) {
        event.preventDefault();

        try {
            await addDoc(collection(db, "tasks"), {
                task: text,
                public: isPublic,
                completed: false,
                createdAt: serverTimestamp(), // timestamp do servidor
            });

            setText("")
            setIsPublic(false)

        } catch (error) {
            console.error("Erro ao criar tarefa:", error);
        }
    }

    useEffect(() => {
        const unsub = handleLoadTasks();
        return () => {
            unsub && unsub.then((fn) => fn());
        };
    }, []);

    return (
        <div className="flex-1">
            <div className="w-full max-w-6xl p-4 mx-auto">
                <div className="space-y-12">
                    <div className="space-y-8">
                        <p className="font-bold text-3xl">Qual sua tarefa?</p>
                        <form className="flex flex-col gap-4" onSubmit={handleCreateTask}>
                            <Textarea
                                placeholder="Digite sua tarefa aqui..."
                                value={text}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                    setText(e.target.value)
                                }
                            />

                            <div className="flex flex-row gap-2 items-center">
                                <input
                                    type="checkbox"
                                    className="h-6 w-6"
                                    checked={isPublic}
                                    onChange={(e) => setIsPublic(e.target.checked)}
                                />
                                <label className="font-medium text-xl">
                                    Deixar tarefa pública?
                                </label>
                            </div>

                            <button
                                className="w-full px-4 py-2 border border-gray-500 rounded-md font-bold hover:bg-gray-500 cursor-pointer"
                                type="submit"
                            >
                                Registrar
                            </button>
                        </form>
                    </div>

                    <hr className="w-full border-2 border-white" />

                    <div className="space-y-8">
                        <p className="font-bold text-3xl text-center">Lista de tarefas</p>
                        <ListTasks data={tasks} />
                    </div>
                </div>
            </div>
        </div>
    );
}
