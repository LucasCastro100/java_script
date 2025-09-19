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
    // AQUI PODEMOS FAZER DE 3  FORMAS

    // FORMA 1
    // let year = date.getFullYear()
    // let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    // let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    // return `${day}/${month}/${year}`

    // FORMA 2
    // let year = date.getFullYear();
    // let month = String(date.getMonth() + 1).padStart(2, "0");
    // let day = String(date.getDate()).padStart(2, "0");
    // return `${day}/${month}/${year}`

    // FORMA 3
    return new Intl.DateTimeFormat("pt-BR").format(date);
}

export const formatCurrentMonth = (currentMonth: string): string => {
    let [year, month] = currentMonth.split('-')
    const months = [ "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    return `${months[parseInt(month)-1]} de ${year}`
}