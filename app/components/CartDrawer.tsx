"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { getCart, saveCart, type CartItem } from "@/lib/cart";
import { getProducts } from "@/lib/product";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

const formatPrice = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

const getMaxStock = (productId: number, size: string): number => {
  const product = getProducts().find((p) => p.id === productId);
  return product?.variants?.find((v) => v.size === size)?.stock ?? Infinity;
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (open) setItems(getCart());
  }, [open]);

  useEffect(() => {
    const handleUpdate = () => setItems(getCart());
    window.addEventListener("cartUpdated", handleUpdate);
    return () => window.removeEventListener("cartUpdated", handleUpdate);
  }, []);

  const updateQuantity = (productId: number, size: string, delta: number) => {
    if (delta > 0) {
      const currentItem = items.find((i) => i.productId === productId && i.size === size);
      const maxStock = getMaxStock(productId, size);
      if (currentItem && currentItem.quantity >= maxStock) return;
    }

    const updated = items
      .map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity: item.quantity + delta }
          : item
      )
      .filter((item) => item.quantity > 0);

    setItems(updated);
    saveCart(updated);
  };

  const removeItem = (productId: number, size: string) => {
    const updated = items.filter(
      (item) => !(item.productId === productId && item.size === size)
    );
    setItems(updated);
    saveCart(updated);
  };

  const total = (items ?? []).reduce(
    (acc, item) => acc + (item.price ?? 0) * (item.quantity ?? 0),
    0
  );
  const totalItems = (items ?? []).reduce(
    (acc, item) => acc + (item.quantity ?? 0),
    0
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

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
                  {totalItems} {totalItems === 1 ? "producto" : "productos"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* EMPTY STATE */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
                  <ShoppingBag size={24} className="text-gray-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Tu carrito está vacío
                  </p>
                  <p className="text-xs text-gray-400">
                    Agrega productos para verlos aquí
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] underline underline-offset-2 text-gray-900 hover:text-gray-500 transition-colors"
                >
                  Explorar productos
                </button>
              </div>
            ) : (
              <>
                {/* ITEMS */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
                  {items.map((item) => {
                    const maxStock = getMaxStock(item.productId, item.size);
                    const atMax = item.quantity >= maxStock;

                    return (
                      <div key={`${item.productId}-${item.size}`} className="flex gap-4">
                        <div className="w-20 h-24 flex-shrink-0 bg-gray-100 overflow-hidden rounded-sm">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between py-0.5">
                          <div>
                            <p className="text-sm font-medium text-gray-900 leading-snug">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Talla: {item.size}
                            </p>
                            {atMax && (
                              <p className="text-[10px] text-red-400 font-medium mt-0.5">
                                Stock máximo alcanzado
                              </p>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2 border border-gray-200 px-2 py-1">
                              <button
                                onClick={() => updateQuantity(item.productId, item.size, -1)}
                                className="text-gray-400 hover:text-gray-900 transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-xs font-medium w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.productId, item.size, 1)}
                                disabled={atMax}
                                className="text-gray-400 hover:text-gray-900 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <div className="flex items-center gap-3">
                              <p className="text-sm font-semibold text-gray-900">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                              <button
                                onClick={() => removeItem(item.productId, item.size)}
                                className="text-gray-300 hover:text-red-400 transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* FOOTER */}
                <div className="px-6 py-6 border-t border-gray-100 space-y-4">
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
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}