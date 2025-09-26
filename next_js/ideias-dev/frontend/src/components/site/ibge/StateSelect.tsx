'use client';

import { State } from "./IBGEExplorer";

type Props = {
  states: State[];
  onSelect: (state: State) => void;
};

export const StateSelect = ({ states, onSelect }: Props) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">Selecione um Estado:</label>
      <select
        className="border p-2 rounded w-full"
        onChange={(e) => {
          const state = states.find(s => s.id === Number(e.target.value));
          if (state) onSelect(state);
        }}
      >
        <option value="">-- Selecione --</option>
        {states.map(s => (
          <option key={s.id} value={s.id}>{s.nome} ({s.sigla})</option>
        ))}
      </select>
    </div>
  );
};
