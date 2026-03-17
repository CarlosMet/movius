"use client";

import { motion, AnimatePresence } from "framer-motion";

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

export default function FilterDrawer({
  open,
  onClose,
  tempFilters,
  setTempFilters,
  applyFilters,
  clearFilters,
}: any) {
  const toggle = (group: string, value: string) => {
    const current = tempFilters[group];
    const exists = current.includes(value);

    const updated = exists
      ? current.filter((v: string) => v !== value)
      : [...current, value];

    setTempFilters({ ...tempFilters, [group]: updated });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* OVERLAY */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* PANEL */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 right-0 w-full md:w-[420px] h-full bg-white z-50 flex flex-col"
          >
            {/* HEADER */}
            <div className="p-6 border-b flex justify-between">
              <h2 className="text-lg font-medium">Filtros</h2>
              <button onClick={onClose}>✕</button>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {data.map((cat) => (
                <div key={cat.name}>
                  <h3 className="font-medium mb-2">{cat.name}</h3>

                  {cat.sub.map((sub) => (
                    <div key={sub.name} className="mb-3">
                      <p className="text-sm text-gray-500">{sub.name}</p>

                      {sub.types?.map((type) => (
                        <label
                          key={type}
                          className="flex gap-2 text-sm cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            onChange={() => toggle("type", type)}
                          />
                          {type}
                        </label>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="p-6 border-t space-y-3">
              <button
                onClick={applyFilters}
                className="w-full bg-black text-white py-3 rounded-full"
              >
                Aplicar filtros
              </button>

              <button
                onClick={clearFilters}
                className="w-full text-sm underline"
              >
                Limpiar todo
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}