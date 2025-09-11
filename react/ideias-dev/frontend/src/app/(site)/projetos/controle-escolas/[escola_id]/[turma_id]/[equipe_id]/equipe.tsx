'use client'

import { useParams } from "next/navigation";

export default function EquipePage() {
  const { escola_id, turma_id, equipe_id } = useParams();

  return (
    <div className="">
        <div className="">Escola: {escola_id}</div>
        <div className="">Turma {turma_id}</div>
        <div className="">Equipe {equipe_id}</div>
    </div>
  );
}