"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProducts } from "@/lib/product";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import FilterDrawer from "./FilterDrawer";
import { SlidersHorizontal, X } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const BANNER_BY_GENDER: Record<string, string> = {
  hombre:
    "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1400&auto=format&fit=crop",
  mujer:
    "https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=1400&auto=format&fit=crop",
};

export default function HMContent({ gender }: { gender: string }) {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<any[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [sort, setSort] = useState<string>("");
  const [openFilters, setOpenFilters] = useState(false);
  const [visible, setVisible] = useState(8);
  const [loading, setLoading] = useState(true);

  // 🔹 Cargar productos desde API
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // 🔹 Leer query param ?tipo=
  useEffect(() => {
    const tipo = searchParams.get("tipo");
    if (tipo) setFilters([tipo]);
  }, [searchParams]);

  // 🔹 Productos filtrados + ordenados (SIN mutar estado)
  const filteredProducts = products
    .filter(
      (p) =>
        p.gender?.toLowerCase() === gender.toLowerCase() &&
        p.filtro !== "uniformes"
    )
    .filter((p) =>
      filters.length > 0 ? filters.includes(p.type) : true
    )
    .sort((a, b) => {
      if (sort === "price_asc") return a.discountPrice - b.discountPrice;
      if (sort === "price_desc") return b.discountPrice - a.discountPrice;
      if (sort === "sold") return b.unitsSold - a.unitsSold;
      if (sort === "recent") return b.id - a.id;
      return 0;
    });

  const allTypes = [
    ...new Set(
      products
        .filter((p) => p.gender?.toLowerCase() === gender.toLowerCase())
        .map((p) => p.type)
    ),
  ];

  // 🔹 Infinite scroll
  useEffect(() => {
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

  const bannerSrc =
    BANNER_BY_GENDER[gender.toLowerCase()] ??
    BANNER_BY_GENDER.hombre;

  return (
    <div className={`w-full max-w-full overflow-x-hidden ${poppins.className}`}>

      {/* HERO */}
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

      {/* FILTROS */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto">

            <button
              onClick={() => setFilters([])}
              className={`px-4 py-1.5 text-xs border ${
                filters.length === 0
                  ? "bg-black text-white"
                  : "border-gray-200 text-gray-600"
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
                className={`px-4 py-1.5 text-xs border ${
                  filters.includes(type)
                    ? "bg-black text-white"
                    : "border-gray-200 text-gray-600"
                }`}
              >
                {type}
              </button>
            ))}

            <button onClick={() => setOpenFilters(true)}>
              <SlidersHorizontal size={14} />
            </button>

          </div>
        </div>
      </div>

      {/* META */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between">
        <p className="text-xs text-gray-400">
          {loading ? "—" : `${filteredProducts.length} productos`}
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            : filteredProducts.slice(0, visible).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}

        </div>

        {!loading && filteredProducts.length === 0 && (
          <p className="text-center py-20 text-gray-400">
            Sin resultados
          </p>
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