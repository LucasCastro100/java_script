// src/lib/products.ts
import { data } from "@/data";

export const useMostViewedProducts = (limit: number = 4) => {
  return [...data.products]
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
};
