'use client';

import { useState, useEffect } from "react";
import { RegionSelect } from "./RegionSelect";
import { StateSelect } from "./StateSelect";
import { MunicipalityList } from "./MunicipalityList";
import { MapView } from "./MapView";

export type Region = { id: number; nome: string };
export type State = { id: number; nome: string; sigla: string };
export type Municipality = { id: number; nome: string };

export const IBGEExplorer = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  const [states, setStates] = useState<State[]>([]);
  const [selectedState, setSelectedState] = useState<State | null>(null);

  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [selectedMunicipalities, setSelectedMunicipalities] = useState<Municipality[]>([]);

  // Carrega regiões
  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/regioes")
      .then(res => res.json())
      .then(setRegions);
  }, []);

  // Carrega estados da região
  useEffect(() => {
    setSelectedState(null);
    setStates([]);
    setMunicipalities([]);
    setSelectedMunicipalities([]);
    if (!selectedRegion) return;

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/regioes/${selectedRegion.id}/estados`)
      .then(res => res.json())
      .then(setStates);
  }, [selectedRegion]);

  // Carrega municípios do estado
  useEffect(() => {
    setMunicipalities([]);
    setSelectedMunicipalities([]);
    if (!selectedState) return;

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState.id}/municipios`)
      .then(res => res.json())
      .then(setMunicipalities);
  }, [selectedState]);

  const handleMunicipalityClick = (mun: Municipality) => {
    if (!selectedMunicipalities.find(m => m.id === mun.id)) {
      setSelectedMunicipalities([...selectedMunicipalities, mun]);
    }
  };

  return (
    <div>
      <RegionSelect regions={regions} onSelect={setSelectedRegion} />
      {selectedRegion && <StateSelect states={states} onSelect={setSelectedState} />}
      {selectedState && (
        <MunicipalityList
          municipalities={municipalities}
          onMunicipalityClick={handleMunicipalityClick}
        />
      )}
      <MapView municipalities={selectedMunicipalities} />
    </div>
  );
}
