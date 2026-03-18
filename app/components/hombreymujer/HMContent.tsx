"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/product";
import Link from "next/link";

import ProductSkeleton from "./ProductSkeleton";
import FilterDrawer from "./FilterDrawer";

export default function HMContent({ gender }: { gender: string }) {
  const [filters, setFilters] = useState<string[]>([]);
  const [sort, setSort] = useState<string>("");
  const [openFilters, setOpenFilters] = useState(false);
  const [visible, setVisible] = useState(8);
  const [loading, setLoading] = useState(true);

  let products = getProducts().filter(
    (p) =>
      p.gender.toLowerCase() === gender.toLowerCase() &&
      p.filtro !== "uniformes"
  );

  // FILTROS
  if (filters.length > 0) {
    products = products.filter((p) => filters.includes(p.type));
  }

  // ORDEN
  if (sort === "price_asc") {
    products.sort((a, b) => a.discountPrice - b.discountPrice);
  }
  if (sort === "price_desc") {
    products.sort((a, b) => b.discountPrice - a.discountPrice);
  }
  if (sort === "sold") {
    products.sort((a, b) => b.unitsSold - a.unitsSold);
  }
  if (sort === "recent") {
    products.sort((a, b) => b.id - a.id);
  }

  // SCROLL INFINITO
  useEffect(() => {
    setTimeout(() => setLoading(false), 800);

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setVisible((prev) => prev + 8);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>

      {/* BANNER */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="w-full h-[300px] overflow-hidden rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1520975661595-6453be3f7070"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between">
        <button
          onClick={() => setOpenFilters(true)}
          className="flex items-center gap-2 text-sm hover:opacity-60"
        >
          ⚙️ Filtrar y ordenar
        </button>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            : products.slice(0, visible).map((product) => {
                const hasDiscount =
                  product.discountPrice < product.originalPrice;

                const discount = hasDiscount
                  ? Math.round(
                      ((product.originalPrice - product.discountPrice) /
                        product.originalPrice) *
                        100
                    )
                  : 0;

                return (
                  <Link
                    href={`/product/${product.slug}`}
                    key={product.id}
                    className="group"
                  >
                    {/* IMAGE */}
                    <div className="relative w-full aspect-[1080/1616] bg-gray-100 overflow-hidden">

                      {/* Imagen 1 */}
                      <img
                        src={product.images[0]}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                      />

                      {/* Imagen 2 */}
                      <img
                        src={product.images[1] || product.images[0]}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />

                      {/* BADGE */}
                      {hasDiscount && (
                        <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1">
                          -{discount}%
                        </div>
                      )}
                    </div>

                    {/* INFO */}
                    <div className="mt-3 space-y-1">
                      <h2 className="text-sm font-medium">
                        {product.name}
                      </h2>

                      <div className="flex gap-2 text-sm">
                        <span className="font-semibold">
                          ${product.discountPrice.toLocaleString()}
                        </span>

                        {hasDiscount && (
                          <span className="text-gray-400 line-through">
                            ${product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <button className="btn-primary w-full mt-2 text-sm">
                        Agregar al carrito
                      </button>
                    </div>
                  </Link>
                );
              })}
        </div>

        {/* EMPTY */}
        {!loading && products.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No hay coincidencias con los filtros.
          </div>
        )}

        {/* LOADER */}
        {visible < products.length && !loading && (
          <div className="text-center py-6 text-gray-400">
            Cargando más productos...
          </div>
        )}
      </div>

      {/* DRAWER */}
      <FilterDrawer
        open={openFilters}
        onClose={() => setOpenFilters(false)}
        filters={filters}
        setFilters={setFilters}
        sort={sort}
        setSort={setSort}
      />
    </div>
  );
}