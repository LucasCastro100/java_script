'use client';

import { data } from "@/data";
import { ImcCategories } from "@/types/calculadora/imcCategories";
import { useState } from "react";

const ImcCalc = () => {
  const list: ImcCategories[] = data.imcCategories;

  const [height, setHeight] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [imc, setImc] = useState<number | null>(null);

  const calcIMC = () => {
    if (!weight || !height) return;
    const result = weight / (height * height);
    setImc(result);
  };

  const resetImc = () => {
    setHeight(null);
    setWeight(null);
    setImc(null);
  };

  const getImcStatus = (valor: number) => {
    if (valor < 18.5)
      return { label: "Abaixo do Peso", range: "< 18,5", color: "bg-blue-500" };

    if (valor < 25)
      return { label: "Normal", range: "18,5 - 24,9", color: "bg-green-500" };

    if (valor < 30)
      return { label: "Sobrepeso", range: "25 - 29,9", color: "bg-yellow-500" };

    if (valor < 35)
      return { label: "Obesidade grau I", range: "30 - 34,9", color: "bg-orange-500" };

    if (valor < 40)
      return { label: "Obesidade grau II", range: "35 - 39,9", color: "bg-orange-700" };

    return { label: "Obesidade grau III (Mórbida)", range: "≥ 40", color: "bg-red-500" };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {!imc && (
        <div className="col-span-1 md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
            {list.map((imc) => (
              <div className={`${imc.color} border border-gray-100 rounded-lg p-4 text-center flex flex-col items-center justify-center`}>
                <h3 className="font-bold">{imc.title}</h3>
                <p className="font-bold">{imc.range}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {imc && (
        <div className="col-span-1 md:col-span-2">
          <div className="grid grid-cols-1 gap-4 h-full">
            {(() => {
              const status = getImcStatus(imc);
              return (
                <div className={`${status.color} border border-gray-100 rounded-lg p-6 text-center flex flex-col items-center justify-center`}>
                  <h3 className="text-xl font-bold">{status.label}</h3>
                  <p className="mt-2">IMC: {imc.toFixed(2)}</p>
                  <p className="mt-1 text-sm">Faixa: {status.range}</p>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      <div className="flex flex-col justify-center items-center w-full">
        <div className="grid grid-cols-1 gap-4 w-full">
          <div>
            <label className="block font-semibold">Altura (M)</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={height ?? ""}
              onChange={(e) => setHeight(parseFloat(e.target.value))}
            />
          </div>

          <div>
            <label className="block font-semibold">Peso (KG)</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={weight ?? ""}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-200"
              onClick={resetImc}
            >
              Resetar
            </button>
            <button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
              onClick={calcIMC}
            >
              Calcular
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImcCalc;