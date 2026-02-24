"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface GamesFilterProps {
  categories: string[];
  platforms: string[];
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[()]/g, "");
}

export function GamesFilter({ categories, platforms }: GamesFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "";
  const platform = searchParams.get("platform") ?? "";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {/* CATEGORY */}
      <div className="relative">
        <select
          value={category}
          onChange={(e) => updateParam("category", e.target.value)}
          className="
            appearance-none
            bg-white
            text-gray-900
            border border-gray-300
            rounded-md
            px-4 py-2 pr-10
            text-sm
            shadow-sm
            focus:outline-none
            focus:ring-2 focus:ring-blue-500
            focus:border-blue-500
            hover:border-gray-400
            transition
          "
        >
          <option value="">Todas as categorias</option>
          {categories.map((cat) => (
            <option key={cat} value={slugify(cat)}>
              {cat}
            </option>
          ))}
        </select>

        {/* Arrow */}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          ▼
        </span>
      </div>

      {/* PLATFORM */}
      <div className="relative">
        <select
          value={platform}
          onChange={(e) => updateParam("platform", e.target.value)}
          className="
            appearance-none
            bg-white
            text-gray-900
            border border-gray-300
            rounded-md
            px-4 py-2 pr-10
            text-sm
            shadow-sm
            focus:outline-none
            focus:ring-2 focus:ring-blue-500
            focus:border-blue-500
            hover:border-gray-400
            transition
          "
        >
          <option value="">Todas as plataformas</option>
          {platforms.map((plat) => (
            <option key={plat} value={slugify(plat)}>
              {plat}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          ▼
        </span>
      </div>
    </div>
  );
}
