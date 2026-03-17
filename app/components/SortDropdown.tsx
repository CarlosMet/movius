"use client";

import { useState } from "react";

const options = [
  { label: "Precio: menor a mayor", value: "price_asc" },
  { label: "Precio: mayor a menor", value: "price_desc" },
  { label: "Más recientes", value: "newest" },
  { label: "Más vendidos", value: "bestsellers" },
];

export default function SortDropdown({ filters, setFilters }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm flex items-center gap-2"
      >
        Ordenar
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-xl border p-2 z-50">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setFilters({ ...filters, sort: opt.value });
                setOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-lg"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}