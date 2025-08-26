import { ButtonCardCalc } from "@/types/buttonCardCalc";

export function ButtonCard({ onClick, children, className, active = false }: ButtonCardCalc) {
  return (
    <button
      className={`
        border border-gray-200 p-4 rounded-xl 
        hover:bg-blue-400 hover:text-white
        ${active ? "bg-blue-400 text-white" : "bg-white text-black"}
        ${className ?? ""}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
