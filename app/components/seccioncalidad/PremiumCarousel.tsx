"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/product";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function PremiumCarousel() {
  const controls = useAnimationControls();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();

      const sorted = data
        .sort((a: any, b: any) => b.unitsSold - a.unitsSold)
        .slice(0, 12);

      setProducts(sorted);
    }

    loadProducts();
  }, []);

  const loopProducts = [...products, ...products];

  return (
    <section className="py-24 bg-white overflow-hidden">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-4">
          Más vendidos
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className={`text-4xl md:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-gray-900 max-w-lg font-sans ${poppins.className}`}>
            Calidad superior,{" "}
            <span className="italic font-light text-gray-400">
              100% algodón y materiales premium
            </span>
          </h2>
          <p className="text-sm lg:text-xl text-gray-400 max-w-xs leading-relaxed">
            Materiales de alta calidad para ofrecer resistencia, confort y un
            acabado impecable en cada uso.
          </p>
        </div>
      </div>

      {/* CAROUSEL */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="w-screen overflow-hidden">
          <motion.div
            className="flex gap-3 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: -2000, right: 0 }}
            animate={controls}
            onViewportEnter={() =>
              controls.start({
                x: ["0%", "-50%"],
                transition: { repeat: Infinity, duration: 30, ease: "linear" },
              })
            }
            onHoverStart={() => controls.stop()}
            onHoverEnd={() =>
              controls.start({
                x: ["0%", "-50%"],
                transition: { repeat: Infinity, duration: 30, ease: "linear" },
              })
            }
          >
            {loopProducts.map((product, i) => (
              <Link
                href={`/product/${product.slug}`}
                key={`${product.id}-${i}`}
                className="group block min-w-[260px] md:min-w-[360px] flex-shrink-0"
              >
                <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden bg-gray-100 rounded-sm">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>

                <div className="mt-3 px-1 flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900 leading-snug">
                      {product.name}
                    </p>
                    {product.category && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {product.category}
                      </p>
                    )}
                  </div>
                  {product.price && (
                    <p className="text-sm text-gray-900 font-medium whitespace-nowrap">
                      ${product.price}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}