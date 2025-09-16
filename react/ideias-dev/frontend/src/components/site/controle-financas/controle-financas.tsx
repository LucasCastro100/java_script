'use client'

import { data } from "@/data";
import { useLocalStorage } from "@/hooks/loja/useLocalStorage";
import { Finance } from "@/types/controle-financas/finance";
import { CategoriesFinances } from "@/types/controle-financas/categories";
import { useEffect, useState } from "react";

export const ControlFinance = () => {
    const [categories, setCategories] = useState<CategoriesFinances>(data.categoriesFinances);
    const [loading, setLoading] = useState(true);
    const [finances, setFinances] = useLocalStorage<Finance[]>("finances", []);

    useEffect(() => {
        setLoading(false);
    }, [finances]);

    return (
        <>
            {loading ? (
                <div>
                    <p className="font-bold text-center text-xl text-gray-500 animate-pulse transition-all">
                        Carregando...
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <div className="flex-1 flex flex-col gap-1">
                            <label htmlFor="">Data</label>
                            <input type="date" name="" id="" className="border p-2 rounded"/>
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <label htmlFor="">Categoria</label>
                            <select className="border p-2 h-[100%] rounded">
                                <option selected disabled>Selecione...</option>
                                {Object.values(categories).map((categorie) => (
                                    <option key={categorie.id} value={categorie.id}>
                                        {categorie.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div>
                        {/* Bloco futuro */}
                    </div>

                    <div>
                        {finances.length === 0 ? (
                            <p className="font-bold text-xl text-center text-red-700">
                                Não há dados cadastrados.
                            </p>
                        ) : (
                            <div className="flex flex-col gap-2">
                                {finances.map((item, index) => (
                                    <div
                                        key={index}
                                        className="p-2 border rounded shadow-sm"
                                    >
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-gray-600">
                                            R${" "}
                                            {item.value.toLocaleString("pt-BR", {
                                                minimumFractionDigits: 2,
                                            })}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
