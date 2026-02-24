'use client'

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { ListMenu } from "../list-menu";
import { SidebarAccordionProps } from "./type";

export function SidebarAccordion({
  title,
  items,  
}: SidebarAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-gray-700 bg-gray-900 overflow-hidden">
      <button
        className="
          flex w-full items-center justify-between
          px-4 py-3 font-medium
          hover:bg-gray-800 transition
        "
        onClick={() => setOpen((prev) => !prev)}
      >
        {title}
        <ChevronDown
          size={18}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="px-2 py-2 border-t border-gray-700">
          <ListMenu itens={items} />
        </div>
      )}
    </div>
  );
}
