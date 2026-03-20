"use client";

import Link from "next/link";
import { ShoppingCart, Check } from "lucide-react";
import { saveCart, getCart } from "@/lib/cart";
import { useState } from "react";

interface Variant {
  size: string;
  stock: number;
}

interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  discountPrice: number;
  originalPrice: number;
  images: string[];
  variants: Variant[];
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const hasDiscount = product.discountPrice < product.originalPrice;
  const discount = hasDiscount
    ? Math.round(((product.originalPrice - product.discountPrice) / product.originalPrice) * 100)
    : 0;

  const selectedVariant = product.variants?.find((v) => v.size === selectedSize);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!selectedSize) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }

    const cart = getCart();
    const existingIndex = cart.findIndex(
      (item) => item.productId === product.id && item.size === selectedSize
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        price: product.discountPrice,
        image: product.images[0],
        size: selectedSize,
        quantity: 1,
      });
    }

    saveCart(cart);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link href={`/product/${product.slug}`} className="group block">

      {/* IMAGE */}
      <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <img
          src={product.images[1] || product.images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* BADGE */}
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-black text-white text-[10px] font-semibold tracking-[0.1em] uppercase px-2 py-1">
            -{discount}%
          </div>
        )}

        {/* HOVER PANEL — tallas + botón, sube desde abajo */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-white px-3 pt-3 pb-3">

          {/* TALLAS */}
          {product.variants?.length > 0 && (
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1.5">
                <p className={`text-[10px] uppercase tracking-[0.15em] font-medium transition-colors duration-200 ${
                  error ? "text-red-400" : "text-gray-400"
                }`}>
                  {error ? "Selecciona una talla" : "Talla"}
                </p>
                {selectedVariant && selectedVariant.stock <= 2 && selectedVariant.stock > 0 && (
                  <p className="text-[10px] text-red-400 font-medium">
                    Solo {selectedVariant.stock} disponibles
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {product.variants.map((variant) => {
                  const outOfStock = variant.stock === 0;
                  const lowStock = variant.stock > 0 && variant.stock <= 2;
                  const isSelected = selectedSize === variant.size;

                  return (
                    <button
                      key={variant.size}
                      disabled={outOfStock}
                      onClick={(e) => {
                        e.preventDefault();
                        if (!outOfStock) {
                          setSelectedSize(variant.size);
                          setError(false);
                        }
                      }}
                      className={`
                        relative min-w-[36px] px-2 py-1 text-xs font-medium border transition-all duration-150
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
          )}

          {/* BOTÓN */}
          <button
            onClick={handleAddToCart}
            className={`w-full flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase py-3 transition-colors duration-200 ${
              error
                ? "bg-red-500 text-white"
                : added
                ? "bg-gray-700 text-white"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {added ? (
              <><Check size={13} />Añadido</>
            ) : error ? (
              <>Selecciona una talla</>
            ) : (
              <><ShoppingCart size={13} />Añadir al carrito</>
            )}
          </button>

        </div>
      </div>

      {/* INFO */}
      <div className="mt-3 px-0.5 space-y-1">
        <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-medium">
          {product.category}
        </p>
        <h2 className="text-sm font-medium text-gray-900 leading-snug">
          {product.name}
        </h2>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-gray-900">
            ${product.discountPrice.toLocaleString("es-CO")}
          </span>
          {hasDiscount && (
            <span className="text-gray-400 line-through text-xs">
              ${product.originalPrice.toLocaleString("es-CO")}
            </span>
          )}
        </div>
      </div>

    </Link>
  );
}