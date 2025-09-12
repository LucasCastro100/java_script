'use client';

import { Region } from "./IBGEExplorer";

type Props = {
  regions: Region[];
  onSelect: (region: Region) => void;
};

export const RegionSelect = ({ regions, onSelect }: Props) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">Selecione uma Região:</label>
      <select
        className="border p-2 rounded w-full"
        onChange={(e) => {
          const region = regions.find(r => r.id === Number(e.target.value));
          if (region) onSelect(region);
        }}
      >
        <option value="">-- Selecione --</option>
        {regions.map(r => (
          <option key={r.id} value={r.id}>{r.nome}</option>
        ))}
      </select>
    </div>
  );
};
