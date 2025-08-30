"use client";
import { UseQueryString } from "@/hooks/use-qerySring";
import { useState } from "react";

export const ProductListFilter = () => {
    const queryString = UseQueryString();
    const [filterOpened, setFilterOpened] = useState(false);

    const order = queryString.get("order") ?? "views";
    return (
        <div className="">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div className="text-3xl"><strong>99</strong> Produtos</div>
                <div className="w-full md:max-w-60 flex flex-row gap-4">
                    <select className="flex-1 text-gray-500 bg-white border border-gray-200 rounded-md h-14 px-4 flex items-center">
                        <option value="order" selected>Ordenar por</option>
                        <option value="views">Popularidade</option>
                        <option value="price">Preço</option>
                        <option value="selling">Mais vendidos</option>
                    </select>

                    <div className="flex-1 md:hidden text-gray-500 bg-white border border-gray-200 rounded-md h-14 px-4 flex items-center" onClick={() =>setFilterOpened(!filterOpened)}>Filtrar por</div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <div className={`flex-1 md:max-w-64 bg-red-200 ${filterOpened ? "block" : "hidden"} md:block`}>
                    filtro
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-3">
                    <div>...</div>
                    <div>...</div>
                    <div>...</div>
                    <div>...</div>
                    <div>...</div>
                    <div>...</div>
                </div>
            </div>
        </div>
    );
}