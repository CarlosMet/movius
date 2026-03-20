"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

const SORT_OPTIONS = [
  { label: "Más vendidos", value: "sold" },
  { label: "Más recientes", value: "recent" },
  { label: "Menor precio", value: "price_asc" },
  { label: "Mayor precio", value: "price_desc" },
];

interface Props {
  open: boolean;
  onClose: () => void;
  sort: string;
  setSort: (sort: string) => void;
  // filters y setFilters se mantienen por compatibilidad pero ya no se usan aquí
  filters: string[];
  setFilters: (filters: string[]) => void;
}

export default function FilterDrawer({ open, onClose, sort, setSort }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* DRAWER */}
          <motion.div
            className={`fixed top-0 left-0 h-full w-full max-w-[320px] bg-white z-50 flex flex-col ${poppins.className}`}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h2 className="text-base font-semibold text-gray-900 tracking-tight">
                  Ordenar
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Selecciona un criterio
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* OPCIONES */}
            <div className="flex-1 px-6 py-6 space-y-2">
              {SORT_OPTIONS.map((opt) => {
                const isSelected = sort === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setSort(opt.value)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium border transition-all duration-150 ${
                      isSelected
                        ? "border-black bg-black text-white"
                        : "border-gray-100 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {opt.label}
                    {isSelected && <Check size={14} />}
                  </button>
                );
              })}

              {/* Limpiar orden */}
              {sort && (
                <button
                  onClick={() => setSort("")}
                  className="w-full text-xs text-gray-400 hover:text-gray-900 transition-colors text-center underline underline-offset-2 pt-2"
                >
                  Quitar orden
                </button>
              )}
            </div>

            {/* FOOTER */}
            <div className="px-6 py-6 border-t border-gray-100">
              <button
                onClick={onClose}
                className="relative w-full flex items-center justify-center border border-black text-black text-xs font-semibold tracking-[0.15em] uppercase py-4 overflow-hidden group transition-colors duration-300"
              >
                <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Aplicar
                </span>
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}