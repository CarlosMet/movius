"use client";

import { useState } from "react";
import { ShoppingCart, Check, Minus, Plus } from "lucide-react";
import { Poppins } from "next/font/google";
import { saveCart, getCart } from "@/lib/cart";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

interface Variant {
  size: string;
  stock: number;
}

interface Props {
  productId: number;
  productName: string;
  productPrice: number;
  productImage: string;
  variants: Variant[];
}

export default function AddToCartButton({
  productId,
  productName,
  productPrice,
  productImage,
  variants,
}: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState<"idle" | "success" | "error">("idle");

  const selectedVariant = variants?.find((v) => v.size === selectedSize);
  const maxStock = selectedVariant?.stock ?? 99;

  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1));
  const increaseQty = () => setQuantity((q) => Math.min(maxStock, q + 1));

  const handleAddToCart = () => {
    if (!selectedSize) {
      setToast("error");
      setTimeout(() => setToast("idle"), 2500);
      return;
    }

    const cart = getCart();
    const existingIndex = cart.findIndex(
      (item: any) => item.productId === productId && item.size === selectedSize
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity = Math.min(
        cart[existingIndex].quantity + quantity,
        maxStock
      );
    } else {
      cart.push({
        productId,
        name: productName,
        price: productPrice,
        image: productImage,
        size: selectedSize,
        quantity,
      });
    }

    saveCart(cart);
    setToast("success");
    setTimeout(() => setToast("idle"), 2500);
  };

  return (
    <div className={poppins.className}>

      {/* SELECTOR DE TALLAS */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors duration-200 ${
            toast === "error" ? "text-red-400" : "text-gray-400"
          }`}>
            {toast === "error" ? "Selecciona una talla" : "Talla"}
          </p>
          {selectedVariant && selectedVariant.stock <= 2 && selectedVariant.stock > 0 && (
            <p className="text-xs font-medium text-red-400">
              Solo {selectedVariant.stock} disponibles
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {variants?.map((variant) => {
            const outOfStock = variant.stock === 0;
            const lowStock = variant.stock > 0 && variant.stock <= 2;
            const isSelected = selectedSize === variant.size;

            return (
              <button
                key={variant.size}
                disabled={outOfStock}
                onClick={() => {
                  setSelectedSize(variant.size);
                  setQuantity(1);
                }}
                className={`
                  relative min-w-[52px] px-4 py-2 text-sm font-medium border transition-all duration-200
                  ${outOfStock
                    ? "border-gray-100 text-gray-300 cursor-not-allowed"
                    : isSelected
                    ? "border-black bg-black text-white"
                    : lowStock
                    ? "border-red-200 text-red-400 hover:border-red-400"
                    : "border-gray-200 text-gray-700 hover:border-gray-900"
                  }
                `}
              >
                {variant.size}
                {outOfStock && (
                  <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="w-full h-px bg-gray-200 rotate-[-20deg] absolute" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* SELECTOR DE CANTIDAD */}
      <div className="mb-6">
        <p className="uppercase tracking-[0.15em] text-gray-400 font-medium mb-3">
          Cantidad
        </p>
        <div className="flex items-center justify-between gap-3 border border-gray-300 py-1 px-1 w-24 ">
          <button
            onClick={decreaseQty}
            disabled={quantity <= 1}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="w-10 h-10 flex items-center justify-center text-sm font-medium text-gray-900  tabular-nums">
            {quantity}
          </span>
          <button
            onClick={increaseQty}
            disabled={quantity >= maxStock}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
        {quantity >= maxStock && selectedVariant && (
          <p className="text-[10px] text-red-400 mt-1.5">
            Máximo disponible: {maxStock}
          </p>
        )}
      </div>

      {/* BOTÓN */}
      <div className="relative">
        <button
          onClick={handleAddToCart}
          className={`relative w-full flex items-center justify-center gap-2 border text-xs font-semibold tracking-[0.15em] uppercase py-4 overflow-hidden group transition-colors duration-300 ${
            toast === "error"
              ? "border-red-400 text-red-400"
              : "border-black text-black"
          }`}
        >
          <span className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out ${
            toast === "error" ? "bg-red-400" : "bg-black"
          }`} />
          <ShoppingCart size={15} className="relative z-10 group-hover:text-white transition-colors duration-300" />
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">
            Añadir al carrito
          </span>
        </button>

        {/* TOAST */}
        <div className={`
          absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
          flex items-center gap-2 px-4 py-2.5 text-xs font-medium
          transition-all duration-300 pointer-events-none
          ${toast === "idle" ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}
          ${toast === "success" ? "bg-black text-white" : "bg-red-500 text-white"}
        `}>
          {toast === "success" ? (
            <><Check size={13} />Producto añadido al carrito</>
          ) : (
            <>Selecciona una talla</>
          )}
        </div>
      </div>

    </div>
  );
}