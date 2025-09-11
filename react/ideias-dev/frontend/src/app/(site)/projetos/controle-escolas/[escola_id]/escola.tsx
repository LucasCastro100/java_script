'use client'

import { useParams } from "next/navigation";

export default function EscolaPage() {
  const { escola_id } = useParams();

  return (
    <div className="">
        <div className="">Escola: {escola_id}</div>
    </div>
  );
}