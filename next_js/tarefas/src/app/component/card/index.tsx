import { IndicatorProps } from "../../types/Indicator";

export function Indicator({ title, className }: IndicatorProps) {
    return (
        <div className={`rounded-md px-4 py-2 text-center ${className}`}>
            <p className="font-bold text-xl">
                {title}
            </p>
        </div>
    )
}