import { Finance } from "@/types/controle-financas/finance"

export const getCurrentMonth = () => {
    let now = new Date()
    return `${now.getFullYear()}-${now.getMonth() + 1}`
}

export const filterFinancesByMonth = (list: Finance[], date: string): Finance[] => {
    let newFinances: Finance[] = []
    let [year, month] = date.split('-')

    for (let i in list) {
        if (
            (list[i].date.getFullYear() === parseInt(year)) && ((list[i].date.getMonth()+1) === parseInt(month))
        ) {
            newFinances.push(list[i])
        }
    }

    return newFinances
}