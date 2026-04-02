"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { getCart, saveCart, type CartItem } from "@/lib/cart";
import { getProducts } from "@/lib/product";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const formatPrice = (n: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(n);

interface Product {
  id: number;
  images?: string[];
  variants?: { size: string; stock: number }[];
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // 🔹 cargar productos (para stock + fallback imagen)
  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
    }
    loadProducts();
  }, []);

  // 🔹 obtener stock
  const getMaxStock = (productId: number, size: string): number => {
    const product = products.find((p) => p.id === productId);
    return product?.variants?.find((v) => v.size === size)?.stock ?? Infinity;
  };

  // 🔹 obtener imagen fallback desde productos
  const getProductImage = (productId: number, fallback?: string) => {
    const product = products.find((p) => p.id === productId);
    return product?.images?.[0] || fallback || "/placeholder.jpg";
  };

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
      const currentItem = items.find(
        (i) => i.productId === productId && i.size === size
      );
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

  const total = items.reduce(
    (acc, item) => acc + (item.price ?? 0) * (item.quantity ?? 0),
    0
  );

  const totalItems = items.reduce(
    (acc, item) => acc + (item.quantity ?? 0),
    0
  );

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
            transition={{ duration: 0.3 }}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Tu carrito
                </h2>
                <p className="text-xs text-gray-400">
                  {totalItems} {totalItems === 1 ? "producto" : "productos"}
                </p>
              </div>
              <button onClick={onClose}>
                <X size={18} />
              </button>
            </div>

            {/* EMPTY */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <ShoppingBag size={24} className="text-gray-300 mb-2" />
                <p className="text-sm text-gray-900">Tu carrito está vacío</p>
              </div>
            ) : (
              <>
                {/* ITEMS */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
                  {items.map((item) => {
                    const maxStock = getMaxStock(item.productId, item.size);
                    const atMax = item.quantity >= maxStock;

                    const imageSrc = getProductImage(
                      item.productId,
                      item.image
                    );

                    return (
                      <div key={`${item.productId}-${item.size}`} className="flex gap-4">
                        <div className="w-20 h-24 bg-gray-100 overflow-hidden">
                          <img
                            src={imageSrc}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>

                          <p className="text-xs text-gray-400">
                            Talla: {item.size}
                          </p>

                          {atMax && (
                            <p className="text-[10px] text-red-400">
                              Stock máximo alcanzado
                            </p>
                          )}

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.productId, item.size, -1)
                                }
                              >
                                <Minus size={12} />
                              </button>

                              <span>{item.quantity}</span>

                              <button
                                onClick={() =>
                                  updateQuantity(item.productId, item.size, 1)
                                }
                                disabled={atMax}
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <div className="flex items-center gap-3">
                              <p className="text-sm font-semibold">
                                {formatPrice(item.price * item.quantity)}
                              </p>

                              <button
                                onClick={() =>
                                  removeItem(item.productId, item.size)
                                }
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
                <div className="px-6 py-6 border-t">
                  <div className="flex justify-between mb-4">
                    <span className="text-sm text-gray-400">Subtotal</span>
                    <span className="font-semibold">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <Link href="/checkout" onClick={onClose}>
                    Finalizar compra
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}