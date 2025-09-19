import { formatCurrentMonth } from "@/helpers/date-filter";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { InfoResume } from "./info-resume";

type Props = {
    currentMonth: string;
    onMonthChange: (newMonth: string) => void;
    income: number;
    expense: number;
}

export const InfoArea = ({ currentMonth, onMonthChange, income, expense }: Props) => {

    const handlePrevMonth = () => {
        let [year, month] = currentMonth.split('-')
        let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1)
        currentDate.setMonth(currentDate.getMonth() - 1)
        onMonthChange(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`)
    }

    const handleAfterMonth = () => {
        let [year, month] = currentMonth.split('-')
        let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1)
        currentDate.setMonth(currentDate.getMonth() + 1)
        onMonthChange(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`)
    }

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-4">
                <button
                    onClick={handlePrevMonth}
                    className="p-2 rounded hover:bg-gray-200 transition"
                >
                    <FaChevronLeft size={20} />
                </button>

                <span className="font-semibold">
                    {formatCurrentMonth(currentMonth)}
                </span>

                <button
                    onClick={handleAfterMonth}
                    className="p-2 rounded hover:bg-gray-200 transition"
                >
                    <FaChevronRight size={20} />
                </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-evenly md:flex-row gap-4">
                <InfoResume title={"Receitas"} value={income} />
                <InfoResume title={"Despesas"} value={expense} />
                <InfoResume title={"Balanço"} value={income - expense} />
            </div>
        </div>

    )
}