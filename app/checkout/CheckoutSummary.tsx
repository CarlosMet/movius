"use client";

import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { saveCart, type CartItem } from "@/lib/cart";
import { getProducts } from "@/lib/product";

const SHIPPING_COST = 12000;
const FREE_SHIPPING_THRESHOLD = 300000;

const formatPrice = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

const getMaxStock = (productId: number, size: string): number => {
  const product = getProducts().find((p) => p.id === productId);
  return product?.variants?.find((v) => v.size === size)?.stock ?? Infinity;
};

interface Props {
  items: CartItem[];
  onItemsChange: (items: CartItem[]) => void;
  onSubmit: (e: React.MouseEvent) => void;
}

export default function CheckoutSummary({ items, onItemsChange, onSubmit }: Props) {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const updateQuantity = (productId: number, size: string, delta: number) => {
    if (delta > 0) {
      const current = items.find((i) => i.productId === productId && i.size === size);
      if (current && current.quantity >= getMaxStock(productId, size)) return;
    }
    const updated = items
      .map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity: item.quantity + delta }
          : item
      )
      .filter((item) => item.quantity > 0);
    onItemsChange(updated);
    saveCart(updated);
  };

  const removeItem = (productId: number, size: string) => {
    const updated = items.filter(
      (item) => !(item.productId === productId && item.size === size)
    );
    onItemsChange(updated);
    saveCart(updated);
  };

  return (
    <div className="bg-white border border-gray-100 p-6 md:p-8 lg:sticky lg:top-6">
      <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-6">
        Resumen del pedido
      </p>

      {/* ITEMS */}
      <div className="space-y-4 mb-6">
        {items.map((item) => {
          const maxStock = getMaxStock(item.productId, item.size);
          const atMax = item.quantity >= maxStock;

          return (
            <div key={`${item.productId}-${item.size}`} className="flex gap-3">
              <div className="w-16 h-20 flex-shrink-0 bg-gray-100 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900 leading-snug">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Talla: {item.size}
                    </p>
                    {atMax && (
                      <p className="text-[10px] text-red-400 mt-0.5">Stock máximo</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.productId, item.size)}
                    className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2 border border-gray-200 px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, -1)}
                      className="text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="text-xs font-medium w-4 text-center tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, 1)}
                      disabled={atMax}
                      className="text-gray-400 hover:text-gray-900 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                    >
                      <Plus size={11} />
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* TOTALES */}
      <div className="border-t border-gray-100 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">Subtotal</span>
          <span className="text-sm text-gray-900">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">Envío</span>
          {shipping === 0 ? (
            <span className="text-sm font-medium text-green-600">Gratis</span>
          ) : (
            <span className="text-sm text-gray-900">{formatPrice(shipping)}</span>
          )}
        </div>

        {shipping === 0 ? (
          <p className="text-[10px] text-green-600 bg-green-50 px-3 py-2">
            Tu pedido supera {formatPrice(FREE_SHIPPING_THRESHOLD)} — ¡envío gratis!
          </p>
        ) : (
          <p className="text-[10px] text-gray-400 bg-gray-50 px-3 py-2">
            Agrega {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} más para envío gratis
          </p>
        )}

        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium">
            Total
          </span>
          <span className="text-lg font-bold text-gray-900">{formatPrice(total)}</span>
        </div>
      </div>

      {/* BOTÓN */}
      <button
        onClick={onSubmit}
        className="relative w-full flex items-center justify-center border border-black text-black text-xs font-semibold tracking-[0.15em] uppercase py-4 overflow-hidden group transition-colors duration-300 mt-6"
      >
        <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        <span className="relative z-10 group-hover:text-white transition-colors duration-300">
          Confirmar pedido
        </span>
      </button>

      <p className="text-[10px] text-gray-400 text-center mt-3 leading-relaxed">
        Pagarás en efectivo al recibir tu pedido.
      </p>
    </div>
  );
}