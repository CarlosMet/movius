"use client";

import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const menuVariants: Variants = {
  hidden: { x: "-100%" },
  visible: {
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.08,
    },
  },
  exit: {
    x: "-100%",
    transition: { duration: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SECTIONS = {
  hombre: {
    path: "/hombre",
    types: ["Buso", "Camiseta", "Pantaloneta", "Sudadera"],
  },
  mujer: {
    path: "/mujer",
    types: ["Buso", "Camiseta", "Pantaloneta", "Sudadera"],
  },
};

export default function MobileMenu({ open, setOpen }: Props) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const close = () => {
    setOpen(false);
    setOpenSection(null);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
            onClick={close}
          />

          {/* MENU */}
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 w-screen h-screen bg-white z-40 flex flex-col"
          >
            {/* CLOSE */}
            <div className="flex items-center justify-between px-8 pt-8 pb-4 border-b border-gray-100">
              <span className="font-bold text-lg tracking-widest">MOVIUS</span>
              <button
                onClick={close}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* LINKS */}
            <motion.ul className="flex flex-col px-8 pt-8 space-y-1 overflow-y-auto flex-1">

              {/* UNIFORMES */}
              <motion.li variants={itemVariants}>
                <Link
                  href="/uniformes"
                  onClick={close}
                  className="block text-2xl font-semibold py-3 hover:text-gray-400 transition-colors"
                >
                  Uniformes
                </Link>
              </motion.li>

              {/* HOMBRE / MUJER */}
              {Object.entries(SECTIONS).map(([key, section]) => (
                <motion.li key={key} variants={itemVariants}>

                  {/* Fila principal — link + toggle separados */}
                  <div className="flex items-center justify-between py-3">
                    <Link
                      href={section.path}
                      onClick={close}
                      className="text-2xl font-semibold hover:text-gray-400 transition-colors capitalize"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Link>

                    <button
                      onClick={() =>
                        setOpenSection(openSection === key ? null : key)
                      }
                      className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      <motion.div
                        animate={{ rotate: openSection === key ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={18} />
                      </motion.div>
                    </button>
                  </div>

                  {/* SUBCATEGORÍAS */}
                  <AnimatePresence>
                    {openSection === key && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 pb-4 pt-1 space-y-1 border-l border-gray-100 pl-4">
                          {section.types.map((type) => (
                            <li key={type}>
                              <Link
                                href={`${section.path}?tipo=${encodeURIComponent(type)}`}
                                onClick={close}
                                className="block text-base text-gray-500 hover:text-gray-900 transition-colors py-1.5"
                              >
                                {type}s
                              </Link>
                            </li>
                          ))}
                        </div>
                      </motion.ul>
                    )}
                  </AnimatePresence>

                </motion.li>
              ))}

              {/* CALZADO */}
              <motion.li variants={itemVariants}>
                <Link
                  href="/calzado"
                  onClick={close}
                  className="block text-2xl font-semibold py-3 hover:text-gray-400 transition-colors"
                >
                  Calzado
                </Link>
              </motion.li>

            </motion.ul>

            {/* FOOTER DEL MENU */}
            <div className="px-8 py-6 border-t border-gray-100">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                #Marca100%Colombiana
              </p>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}