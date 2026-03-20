"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

// MOCK DATA — reemplazar con datos reales luego
const mockItems = [
  {
    id: 1,
    name: "Camiseta Básica Algodón",
    category: "Hombre",
    price: 20000,
    quantity: 2,
    size: "M",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Uniforme Escolar Completo",
    category: "Uniformes",
    price: 45000,
    quantity: 1,
    size: "S",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Sudadera Deportiva",
    category: "Mujer",
    price: 35000,
    quantity: 1,
    size: "L",
    image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&auto=format&fit=crop",
  },
];

const formatPrice = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const total = mockItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
            className={`fixed top-0 right-0 h-full w-full md:w-[420px] bg-white z-50 flex flex-col ${poppins.className}`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
          >

            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h2 className="text-base font-semibold text-gray-900 tracking-tight">
                  Tu carrito
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {mockItems.length} productos
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* ITEMS — scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {mockItems.map((item) => (
                <div key={item.id} className="flex gap-4">

                  {/* Image */}
                  <div className="w-20 h-24 flex-shrink-0 bg-gray-100 overflow-hidden rounded-sm">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">
                        {item.category}
                      </p>
                      <p className="text-sm font-medium text-gray-900 leading-snug mt-0.5">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Talla: {item.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 border border-gray-200 px-2 py-1">
                        <button className="text-gray-400 hover:text-gray-900 transition-colors">
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-medium w-4 text-center">
                          {item.quantity}
                        </span>
                        <button className="text-gray-400 hover:text-gray-900 transition-colors">
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <p className="text-sm font-semibold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <button className="text-gray-300 hover:text-red-400 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="px-6 py-6 border-t border-gray-100 space-y-4">

              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium">
                  Subtotal
                </span>
                <span className="text-base font-semibold text-gray-900">
                  {formatPrice(total)}
                </span>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed">
                Envío e impuestos calculados al momento del pago.
              </p>

              {/* CTA — squared fill-up button */}
              <Link
                href="/checkout"
                onClick={onClose}
                className="relative flex items-center justify-center border border-black text-black text-xs font-semibold tracking-[0.15em] uppercase w-full py-4 overflow-hidden group transition-colors duration-300"
              >
                <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Finalizar compra
                </span>
              </Link>

              <button
                onClick={onClose}
                className="w-full text-xs text-gray-400 hover:text-gray-900 transition-colors text-center underline underline-offset-2"
              >
                Continuar comprando
              </button>

            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}