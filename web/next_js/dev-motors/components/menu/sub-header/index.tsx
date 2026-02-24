'use client'

import Link from "next/link";
import { SubHeaderProps } from "./type";

export function SubHeader({ items, show = true }: SubHeaderProps) {
  if (!show) return null;

  return (
    <div className="hidden lg:block bg-gray-950 border-t border-gray-800">
      <div className="w-full max-w-6xl mx-auto px-4 py-3">
        <nav className="flex items-center gap-6">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-400 hover:text-gray-200 transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
