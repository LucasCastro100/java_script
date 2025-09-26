'use client'

import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Finance } from "@/types/controle-financas/finance";
import { TableItens } from "./table-itens";
import { InfoArea } from "./info-area";
import { AddItens } from "./add-itens";
import { getCurrentMonth, filterFinancesByMonth } from '@/helpers/date-filter'
import { CategoriesFinances } from "@/types/controle-financas/categories";
import { data } from "@/data";

export const ControlFinance = () => {
    const [loading, setLoading] = useState(true);
    const [finances, setFinances] = useLocalStorage<Finance[]>("finances", []);
    const [categories, setCategories] = useState<CategoriesFinances>(data.categoriesFinances);
    const [filterFinances, setFilterFinances] = useState<Finance[]>([])
    const [currentMonth, setCurrentMonth] = useState(getCurrentMonth())
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);

    const handleMontChange = (newMonth: string) => {
        setCurrentMonth(newMonth)
    }

    const handleAddFinance = (item: Finance) => {
        setFinances([...finances, item]);
    }

    useEffect(() => {
        setLoading(false);
        
        const filtered = filterFinancesByMonth(finances, currentMonth)            
            .filter(f => data.categoriesFinances[f.category]);

        setFilterFinances(filtered);
    }, [finances, currentMonth]);

    useEffect(() => {
        let newIncome = 0
        let newExpense = 0

        for (let i in filterFinances) {
            if (categories[filterFinances[i].category].expense) {
                newExpense += filterFinances[i].value
            } else {
                newIncome += filterFinances[i].value
            }
        }

        setIncome(newIncome);
        setExpense(newExpense);

    }, [filterFinances]);
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
                    <InfoArea
                        currentMonth={currentMonth}
                        onMonthChange={handleMontChange}
                        income={income}
                        expense={expense} />

                    <AddItens onAdd={handleAddFinance} />

                    <TableItens list={filterFinances} />
                </div>
            )}
        </>
    );
};
