'use client';

import { useState } from "react";

const ImcCalc = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const calcIMC = () => {
    console.log(`Altura: ${height}, Peso: ${weight}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-500 border border-gray-100 rounded-lg p-4 text-center">
          <h3>Normal</h3>
          <p className="text-gray-500">18.5 - 24.9</p>
        </div>
        <div className="bg-yellow-500 border border-gray-100 rounded-lg p-4 text-center">
          <h3>Sobrepeso</h3>
          <p className="text-gray-500">25 - 29.9</p>
        </div>
        <div className="bg-orange-500 border border-gray-100 rounded-lg p-4 text-center">
          <h3>Obesidade</h3>
          <p className="text-gray-500">30 - 39.9</p>
        </div>
        <div className="bg-red-500 border border-gray-100 rounded-lg p-4 text-center">
          <h3>Obesidade Mórbida</h3>
          <p className="text-gray-500">40+</p>
        </div>
      </div>

      <div>
        <h2 className="font-bold text-2xl">Calculadora de IMC</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Altura</label>
            <input
              className="w-full border rounded px-3 py-2"
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold">Peso</label>
            <input
              className="w-full border rounded px-3 py-2"
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div className="col-span-1 md:col-span-2">
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
