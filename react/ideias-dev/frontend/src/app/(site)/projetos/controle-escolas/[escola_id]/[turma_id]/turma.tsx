'use client'

import { useParams } from "next/navigation";

export default function TurmaPage() {
  const { escola_id, turma_id } = useParams();

  return (
    <div className="">
        <div className="">Escola: {escola_id}</div>
        <div className="">Turma {turma_id}</div>
    </div>
  );
}