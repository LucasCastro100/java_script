'use client';

import { Municipality } from "./IBGEExplorer";

type Props = {
  municipalities: Municipality[];
  onMunicipalityClick: (mun: Municipality) => void;
};

export const MunicipalityList = ({ municipalities, onMunicipalityClick }: Props) => {
  return (
    <div className="mb-4">
      <h2 className="font-semibold mb-2">Municípios (clique para adicionar ao mapa):</h2>
      <ul className="border p-2 rounded max-h-60 overflow-auto">
        {municipalities.map(m => (
          <li
            key={m.id}
            className="cursor-pointer hover:bg-gray-200 p-1 rounded"
            onClick={() => onMunicipalityClick(m)}
          >
            {m.nome}
          </li>
        ))}
      </ul>
    </div>
  );
};
