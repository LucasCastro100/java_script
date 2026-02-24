
import { data } from "@/data";

export const useMostSoldProducts = (limit: number = 4) => {
  return [...data.products]
    .sort((a, b) => b.solds - a.solds)
    .slice(0, limit);
};
