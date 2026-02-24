import { data } from "@/data";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CategoriesFinances } from "@/types/controle-financas/categories";
import { Finance } from "@/types/controle-financas/finance";
import { useState } from "react";
import { useRandomId } from "@/hooks/id-random";

type Props = {
    onAdd: (item: Finance) => void
}
export const AddItens = ({onAdd}: Props) => {
    const [categories, setCategories] = useState<CategoriesFinances>(data.categoriesFinances);

    //inputs
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");

    const addFinance = () => {
        if (!date || !category || !value || !title) return alert("Preencha todos os campos");

        alert(`${date}, ${category}, ${value}, ${title}`);

        const newFinance: Finance = {
            id: useRandomId(8),
            date: new Date(date),
            category,
            title,
            value: parseFloat(value.replace(",", ".")), 
        };

        onAdd(newFinance)        

        // limpar inputs
        setDate("");
        setCategory("");
        setValue("");
        setTitle("");
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Data */}
            <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-1">
                <label>Data</label>
                <input
                    type="date"
                    className="border p-2 rounded"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>

            {/* Categoria */}
            <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-1">
                <label>Categoria</label>
                <select
                    className="border p-2 h-[100%] rounded"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option disabled value="">
                        Selecione...
                    </option>
                    {Object.entries(categories).map(([key, categorie]) => (
                        <option key={categorie.id} value={key}>
                            {categorie.title}
                        </option>
                    ))}
                </select>
            </div>

            {/* Valor */}
            <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-1">
                <label>Valor</label>
                <input
                    type="text"
                    className="border p-2 rounded"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>

            {/* Título */}
            <div className="md:col-span-4 lg:col-span-2 flex flex-col gap-1">
                <label>Título</label>
                <input
                    type="text"
                    className="border p-2 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/* Botão adicionar */}
            <div className="md:col-span-2 lg:col-span-1 flex items-end justify-end gap-1">
                <button
                    className="bg-green-500 hover:bg-green-800 w-full py-2 px-4 rounded-md font-bold"
                    onClick={addFinance}
                >
                    Adicionar
                </button>
            </div>
        </div>
    );
}