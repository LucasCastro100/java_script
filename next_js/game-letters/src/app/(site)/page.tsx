'use client'

import { getRandomWord } from "@/services/letters-api";
import { useEffect, useState } from "react";

export default function Page() {
  const [words, setWords] = useState([]);

  async function fetchWord() {
    const result = await getRandomWord("pt-br", 5);

    if (result && result.data.length > 0) {
      const list = result.data.map((item: any) => item.word); // já pega todas as palavras
      setWords(list);
    }
  }

  useEffect(() => {
    fetchWord();
  }, []);

  return (
    <div className="">
      <h1 className="font-bold">{words[8]}</h1>
    </div>
  );
}
