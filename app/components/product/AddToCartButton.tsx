"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Poppins } from "next/font/google";
import {getCart, saveCart, type CartItem} from "@/lib/cart";

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
  const [toast, setToast] = useState<"idle" | "success" | "error">("idle");

  const selectedVariant = variants.find((v) => v.size === selectedSize);

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
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        productId,
        name: productName,
        price: productPrice,
        image: productImage,
        size: selectedSize,
        quantity: 1,
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
          <p className="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium">
            Talla
          </p>
          {selectedVariant && (
            <p className={`text-xs font-medium ${
              selectedVariant.stock <= 2
                ? "text-red-400"
                : "text-gray-400"
            }`}>
              {selectedVariant.stock <= 2
                ? `Solo ${selectedVariant.stock} disponibles`
                : `${selectedVariant.stock} disponibles`}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {variants.map((variant) => {
            const outOfStock = variant.stock === 0;
            const isSelected = selectedSize === variant.size;

            return (
              <button
                key={variant.size}
                disabled={outOfStock}
                onClick={() => setSelectedSize(variant.size)}
                className={`
                  relative min-w-[52px] px-4 py-2 text-sm font-medium border transition-all duration-200
                  ${outOfStock
                    ? "border-gray-100 text-gray-300 cursor-not-allowed"
                    : isSelected
                    ? "border-black bg-black text-white"
                    : "border-gray-200 text-gray-700 hover:border-gray-900"
                  }
                `}
              >
                {variant.size}
                {outOfStock && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-full h-px bg-gray-200 rotate-[-20deg] absolute" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* BOTÓN AÑADIR AL CARRITO */}
      <div className="relative">
        <button
          onClick={handleAddToCart}
          className="relative w-full flex items-center justify-center gap-2 border border-black text-black text-xs font-semibold tracking-[0.15em] uppercase py-4 overflow-hidden group transition-colors duration-300"
        >
          <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
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
          ${toast === "idle"
            ? "opacity-0 translate-y-2"
            : "opacity-100 translate-y-0"
          }
          ${toast === "success"
            ? "bg-black text-white"
            : "bg-red-500 text-white"
          }
        `}>
          {toast === "success" ? (
            <>
              <Check size={13} />
              Producto añadido al carrito
            </>
          ) : (
            <>
              Selecciona una talla
            </>
          )}
        </div>
      </div>

    </div>
  );
}