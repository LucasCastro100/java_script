"use client";
import { UseQueryString } from "@/hooks/use-qerySring";
import { ChangeEvent, useState } from "react";
import { FilterGroup } from "./filter-group";
import { data } from "@/data";
import { ProductItem } from "../product-item";

export const ProductListFilter = () => {
    const queryString = UseQueryString();
    const [filterOpened, setFilterOpened] = useState(false);

    const order = queryString.get("order") ?? "views";
    const handleSelectChanged = (e: ChangeEvent<HTMLSelectElement>) => {
        queryString.set("order", e.target.value);
    }

    return (
        <div className="">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div className="text-3xl"><strong>{data.products.length}</strong> Produto{data.products.length != 1 ? 's' : ''}</div>
                <div className="w-full md:max-w-60 flex flex-row gap-4">
                    <select className="flex-1 text-gray-500 bg-white border border-gray-200 rounded-md h-14 px-4 flex items-center cursor-pointer"
                    onChange={handleSelectChanged}>
                        <option value="order" selected>Ordenar por</option>
                        <option value="views">Popularidade</option>
                        <option value="price">Preço</option>
                        <option value="selling">Mais vendidos</option>
                    </select>

                    <div className="flex-1 md:hidden text-gray-500 bg-white border border-gray-200 rounded-md h-14 px-4 flex items-center cursor-pointer" onClick={() =>setFilterOpened(!filterOpened)}>Filtrar por</div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <div className={`flex-1 md:max-w-64 ${filterOpened ? "block" : "hidden"} md:block`}>
                    <FilterGroup id="tech" name="Tecnologia"/>
                    <FilterGroup id="color" name="Cores"/>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {data.products.map(item => (
                        <ProductItem key={item.id} data={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}