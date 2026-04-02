"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

interface Props {
  currentSlug: string;
  type: string;
}

export default function RelatedProducts({ currentSlug, type }: Props) {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/products?type=${encodeURIComponent(type)}&sort=sold`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data
          .filter((p: any) => p.slug !== currentSlug)
          .slice(0, 4);
        setProducts(filtered);
      })
      .catch(console.error);
  }, [currentSlug, type]);

  if (products.length === 0) return null;

  return (
    <section className={`max-w-7xl mx-auto px-6 md:px-12 py-16 ${poppins.className}`}>

      <div className="border-t border-gray-100 pt-12 mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-2">
          También te puede gustar
        </p>
        
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
        {products.map((product) => {
          const discountPrice = Number(product.discount_price ?? product.discountPrice ?? 0);
          const originalPrice = Number(product.original_price ?? product.originalPrice ?? discountPrice);
          const hasDiscount = originalPrice > discountPrice;
          const discount = hasDiscount
            ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
            : 0;

          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group block"
            >
              <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                />
                <img
                  src={product.images?.[1] ?? product.images?.[0]}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                {hasDiscount && (
                  <div className="absolute top-2 left-2 bg-black text-white text-[10px] font-semibold tracking-[0.1em] uppercase px-2 py-1">
                    -{discount}%
                  </div>
                )}
              </div>

              <div className="mt-3 px-0.5 space-y-1">
                <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-medium">
                  {product.category}
                </p>
                <h3 className="text-sm font-medium text-gray-900 leading-snug">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-gray-900">
                    ${discountPrice.toLocaleString("es-CO")}
                  </span>
                  {hasDiscount && (
                    <span className="text-gray-400 line-through text-xs">
                      ${originalPrice.toLocaleString("es-CO")}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

    </section>
  );
}