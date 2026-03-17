"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const data = [
  {
    name: "Institucionales",
    sub: [
      {
        name: "Hombre",
        types: ["Camiseta", "Sudadera", "Chaqueta"],
      },
      {
        name: "Mujer",
        types: ["Camiseta", "Sudadera", "Chaqueta"],
      },
    ],
  },
  {
    name: "Áreas de la salud",
    sub: [{ name: "Hombre" }, { name: "Mujer" }],
  },
  {
    name: "Generales",
    sub: [{ name: "Hombre" }, { name: "Mujer" }],
  },
];

export default function FiltersSidebar({ filters, setFilters }: any) {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (name: string) => {
    setOpen(open === name ? null : name);
  };

  return (
    <div className="space-y-4">
      {data.map((cat) => (
        <div key={cat.name}>
          
          {/* CATEGORY */}
          <button
            onClick={() => toggle(cat.name)}
            className="w-full flex justify-between text-sm font-medium py-2"
          >
            {cat.name}
            <span>{open === cat.name ? "-" : "+"}</span>
          </button>

          {/* SUB */}
          <AnimatePresence>
            {open === cat.name && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="pl-4 overflow-hidden"
              >
                {cat.sub.map((sub) => (
                  <div key={sub.name} className="py-2">
                    <p className="text-sm text-gray-600">{sub.name}</p>

                    {sub.types && (
                      <div className="ml-3 mt-1 space-y-1">
                        {sub.types.map((type) => (
                          <label
                            key={type}
                            className="flex items-center gap-2 text-sm cursor-pointer"
                          >
                            <input type="checkbox" />
                            {type}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}