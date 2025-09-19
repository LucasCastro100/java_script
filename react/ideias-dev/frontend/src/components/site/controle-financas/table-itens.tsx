import { Finance } from "@/types/controle-financas/finance";
import { data } from "@/data";

type TableItensProps = {
    list: Finance[];
};

export const TableItens = ({ list }: TableItensProps) => {
    return (
        <div className="">
            <table className="w-full table-auto border-collapse border border-gray-500">
                <thead>
                    <tr>
                        <th className="border border-gray-500 p-2">Data</th>
                        <th className="border border-gray-500 p-2">Categoria</th>
                        <th className="border border-gray-500 p-2">Título</th>
                        <th className="border border-gray-500 p-2">Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {list.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="font-bold text-xl text-center text-red-700 border border-gray-500">
                                Não há dados cadastrados.
                            </td>
                        </tr>
                    ) : (
                        list.map((item, index) => {
                            const category = data.categoriesFinances[item.category as keyof typeof data.categoriesFinances];

                            return (
                                <tr key={index}>
                                    <td className="border border-gray-500 p-2 font-bold text-center">{new Date(item.date).toLocaleDateString("pt-BR")}</td>

                                    <td className="border border-gray-500 p-2 font-bold  text-center" style={{ color: category?.color || "black" }}>
                                        {category?.title || "Sem categoria"}
                                    </td>

                                    <td className="border border-gray-500 p-2">{item.title}</td>

                                    <td className="border border-gray-500 p-2 font-bold  text-center" style={{ color: category.expense ? 'red' : 'green' }}>
                                        R${" "}
                                        {item.value.toLocaleString("pt-BR", {
                                            minimumFractionDigits: 2,
                                        })}
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
};
