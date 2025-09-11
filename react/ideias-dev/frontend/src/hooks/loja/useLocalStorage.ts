"use client";

import { useEffect, useState } from "react";

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        setValue(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Erro ao carregar localStorage:", err);
    }
  }, [key]);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Erro ao salvar no localStorage:", err);
    }
  }, [key, value]);

  return [value, setValue] as const;
};
