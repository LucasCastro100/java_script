'use client'

import Link from "next/link";
import { ListMenuProps } from "./type";

export function ListMenu({ itens }: ListMenuProps) {
  return (
    <ul className="flex flex-col rounded-lg overflow-hidden">
      {itens.map((item, index) => (
        <li key={index} className="border-b border-gray-700 last:border-b-0">
          <Link
            href={item.href}
            className="block w-full px-4 py-3 text-sm font-medium text-gray-200 hover:bg-gray-700 hover:text-white transition-colors">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
