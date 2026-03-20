"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/product";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import FilterDrawer from "./FilterDrawer";
import { SlidersHorizontal, X } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

const BANNER_BY_GENDER: Record<string, string> = {
  hombre: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1400&auto=format&fit=crop",
  mujer: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=1400&auto=format&fit=crop",
};

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

  const allTypes = [...new Set(products.map((p) => p.type))];

  if (filters.length > 0) {
    products = products.filter((p) => filters.includes(p.type));
  }

  if (sort === "price_asc") products.sort((a, b) => a.discountPrice - b.discountPrice);
  if (sort === "price_desc") products.sort((a, b) => b.discountPrice - a.discountPrice);
  if (sort === "sold") products.sort((a, b) => b.unitsSold - a.unitsSold);
  if (sort === "recent") products.sort((a, b) => b.id - a.id);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        setVisible((prev) => prev + 8);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const bannerSrc = BANNER_BY_GENDER[gender.toLowerCase()] ?? BANNER_BY_GENDER.hombre;

  return (
    <div className={`w-full max-w-full overflow-x-hidden ${poppins.className}`}>

      {/* HERO BANNER — full width, sin padding lateral */}
      <div className="relative w-full h-[340px] md:h-[500px] overflow-hidden bg-gray-100">
        <img
          src={bannerSrc}
          alt={`Colección ${gender}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 px-8 md:px-14 pb-10 md:pb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50 font-medium mb-3">
            Colección 2026
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-none">
            {gender}
          </h1>
          <p className="text-sm text-white/60 font-light mt-3 max-w-xs">
            Prendas diseñadas para destacar en cada momento del día.
          </p>
        </div>
      </div>

      {/* FILTROS RÁPIDOS — pills horizontales */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">

            {/* Todos */}
            <button
              onClick={() => setFilters([])}
              className={`flex-shrink-0 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] border transition-colors duration-200 ${
                filters.length === 0
                  ? "bg-black text-white border-black"
                  : "border-gray-200 text-gray-600 hover:border-gray-900"
              }`}
            >
              Todos
            </button>

            {allTypes.map((type) => (
              <button
                key={type}
                onClick={() =>
                  setFilters((prev) =>
                    prev.includes(type)
                      ? prev.filter((f) => f !== type)
                      : [...prev, type]
                  )
                }
                className={`flex-shrink-0 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] border transition-colors duration-200 ${
                  filters.includes(type)
                    ? "bg-black text-white border-black"
                    : "border-gray-200 text-gray-600 hover:border-gray-900"
                }`}
              >
                {type}
              </button>
            ))}

            {/* Separador */}
            <div className="flex-shrink-0 w-px h-5 bg-gray-200 mx-1" />

            {/* Ordenar + filtros avanzados */}
            <button
              onClick={() => setOpenFilters(true)}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] border border-gray-200 text-gray-600 hover:border-gray-900 transition-colors duration-200"
            >
              <SlidersHorizontal size={12} />
              Ordenar
            </button>

          </div>
        </div>
      </div>

      {/* META BAR */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <p className="text-xs text-gray-400 uppercase tracking-[0.15em]">
          {loading ? "—" : `${products.length} productos`}
        </p>

        {/* Filtros activos */}
        {filters.length > 0 && (
          <div className="flex items-center gap-2">
            {filters.map((f) => (
              <span
                key={f}
                className="flex items-center gap-1 text-[10px] uppercase tracking-[0.1em] font-medium bg-gray-100 text-gray-700 px-2.5 py-1"
              >
                {f}
                <button
                  onClick={() => setFilters((prev) => prev.filter((x) => x !== f))}
                  className="ml-0.5 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <X size={10} />
                </button>
              </span>
            ))}
            <button
              onClick={() => setFilters([])}
              className="text-[10px] uppercase tracking-[0.1em] text-gray-400 underline underline-offset-2 hover:text-gray-900 transition-colors"
            >
              Limpiar
            </button>
          </div>
        )}
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
            : products.slice(0, visible).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
          }
        </div>

        {/* EMPTY */}
        {!loading && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
              <SlidersHorizontal size={18} className="text-gray-300" />
            </div>
            <p className="text-sm font-medium text-gray-900 mb-1">
              Sin resultados
            </p>
            <p className="text-xs text-gray-400 mb-6">
              No hay productos que coincidan con los filtros seleccionados.
            </p>
            <button
              onClick={() => setFilters([])}
              className="text-xs font-semibold uppercase tracking-[0.15em] underline underline-offset-2 hover:text-gray-500 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* LOADER */}
        {visible < products.length && !loading && (
          <div className="flex items-center justify-center gap-3 pt-12">
            <div className="h-px w-12 bg-gray-200" />
            <p className="text-xs text-gray-400 uppercase tracking-[0.15em]">
              Cargando más
            </p>
            <div className="h-px w-12 bg-gray-200" />
          </div>
        )}
      </div>

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