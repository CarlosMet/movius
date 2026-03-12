"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const menuVariants = {
  hidden: { x: "-100%" },
  visible: {
    x: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
      staggerChildren: 0.1,
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

export default function MobileMenu({ open, setOpen }: Props) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
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
            onClick={() => setOpen(false)}
          />

          {/* MENU */}
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 w-screen h-screen bg-white z-40 p-8"
          >

            <motion.ul className="flex flex-col mt-20 space-y-8 text-2xl font-semibold">

              <motion.li variants={itemVariants}>
                <Link href="/uniformes" onClick={() => setOpen(false)}>
                  Uniformes
                </Link>
              </motion.li>

              {/* HOMBRE */}
              <motion.li variants={itemVariants}>
                <button
                  onClick={() => toggleSection("hombre")}
                  className="flex justify-between w-full"
                >
                  Hombre
                  <span>{openSection === "hombre" ? "-" : "+"}</span>
                </button>

                {openSection === "hombre" && (
                  <ul className="mt-4 ml-4 space-y-3 text-lg text-gray-600">

                    <li>
                      <Link href="/hombre/casual/busos">Busos</Link>
                    </li>

                    <li>
                      <Link href="/hombre/casual/camisetas">Camisetas</Link>
                    </li>

                    <li>
                      <Link href="/hombre/deportivo/sudaderas">
                        Sudaderas
                      </Link>
                    </li>

                  </ul>
                )}
              </motion.li>

              {/* MUJER */}
              <motion.li variants={itemVariants}>
                <button
                  onClick={() => toggleSection("mujer")}
                  className="flex justify-between w-full"
                >
                  Mujer
                  <span>{openSection === "mujer" ? "-" : "+"}</span>
                </button>

                {openSection === "mujer" && (
                  <ul className="mt-4 ml-4 space-y-3 text-lg text-gray-600">

                    <li>
                      <Link href="/mujer/casual/busos">Busos</Link>
                    </li>

                    <li>
                      <Link href="/mujer/casual/camisetas">Camisetas</Link>
                    </li>

                    <li>
                      <Link href="/mujer/deportivo/sudaderas">
                        Sudaderas
                      </Link>
                    </li>

                  </ul>
                )}
              </motion.li>

              <motion.li variants={itemVariants}>
                <Link href="/calzado" onClick={() => setOpen(false)}>
                  Calzado
                </Link>
              </motion.li>

            </motion.ul>

          </motion.div>
        </>
      )}

    </AnimatePresence>
  );
}