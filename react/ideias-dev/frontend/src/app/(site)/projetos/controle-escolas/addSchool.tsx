'use client'

import Link from "next/link";
import { Input } from "@/components/input";
import { Modal } from "@/components/site/modal";
import { useLocalStorage } from "@/hooks/loja/useLocalStorage";
import { useRandomId } from "@/hooks/id-random";
import { useState, useEffect } from "react";
import { School } from "@/types/controle-escolas/school";

export const AddSchool = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [nameSchool, setNameSchool] = useState<string>("");
    const [schools, setSchools] = useLocalStorage<School[]>("schools", []);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false)
    }, [schools])

    const storageAdd = () => {
        if (!nameSchool.trim()) return;

        setLoading(true);
        const newSchool = {
            id: useRandomId(8),
            name: nameSchool.trim(),
            classes: [],
        };

        setSchools([...schools, newSchool]);
        setNameSchool("");
        setIsOpen(false);
        setLoading(false);
    };

    const clearSchools = () => {
        setSchools([]);
    };

    const sortedSchools = [...schools].sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    return (
        <div className="">
            <div className="text-end mb-4 flex gap-2 justify-end">
                <button
                    onClick={() => setIsOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Cadastrar Escola
                </button>
                <button
                    onClick={clearSchools}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Limpar Escolas
                </button>
            </div>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Cadastrar Escola">
                <Input
                    type="text"
                    value={nameSchool}
                    onChange={(e) => setNameSchool(e.target.value)}
                    placeholder="Nome da escola"
                />
                <div className="text-end">
                    <button
                        onClick={storageAdd}
                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Salvar
                    </button>
                </div>
            </Modal>

            <div className="">
                {loading ? (
                    <p className="font-bold text-center text-gray-500 animate-pulse transition-all">Carregando...</p>
                ) : schools.length === 0 ? (
                    <p className="font-bold text-xl text-center text-red-700">Não há escolas cadastradas.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {sortedSchools.map((school) => (
                            <Link
                                key={school.id}
                                href={`/projetos/controle-escolas/${school.id}`}
                                className="border rounded-lg p-4 shadow hover:shadow-lg transition block"
                            >
                                <h3 className="font-bold text-lg">{school.name}</h3>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
