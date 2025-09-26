import { Finance } from "@/types/controle-financas/finance"

export const getCurrentMonth = () => {
    let now = new Date()
    return `${now.getFullYear()}-${now.getMonth() + 1}`
}

export const filterFinancesByMonth = (list: Finance[], date: string): Finance[] => {
    let newFinances: Finance[] = [];
    let [year, month] = date.split('-');

    for (let i in list) {
        const itemDate = new Date(list[i].date); // <-- converter string para Date

        if (
            itemDate.getFullYear() === parseInt(year) &&
            (itemDate.getMonth() + 1) === parseInt(month)
        ) {
            newFinances.push(list[i]);
        }
    }

    return newFinances;
}

export const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("pt-BR").format(date);
}

export const formatCurrentMonth = (currentMonth: string): string => {
    let [year, month] = currentMonth.split('-')
    const months = [ "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    return `${months[parseInt(month)-1]} de ${year}`
}