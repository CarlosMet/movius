"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SortDropdown from "../components/SortDropdown";
import ProductGrid from "../components/ProductGrid";
import FilterDrawer from "../components/FilterDrawer";

export default function UniformesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState({
    type: [],
    gender: [],
    sort: "",
  });

  const [tempFilters, setTempFilters] = useState(filters);
  const [openFilters, setOpenFilters] = useState(false);

  // ✅ LEER URL → estado
  useEffect(() => {
    const type = searchParams.getAll("type");
    const gender = searchParams.getAll("gender");
    const sort = searchParams.get("sort") || "";

    setFilters({ type, gender, sort });
  }, [searchParams]);

  // ✅ ACTUALIZAR URL
  const updateURL = (newFilters: any) => {
    const params = new URLSearchParams();

    newFilters.type.forEach((t: string) =>
      params.append("type", t)
    );

    newFilters.gender.forEach((g: string) =>
      params.append("gender", g)
    );

    if (newFilters.sort) {
      params.set("sort", newFilters.sort);
    }

    router.push(`/uniformes?${params.toString()}`);
  };

  return (
    <div className="bg-white">
      
      {/* HERO MEJORADO */}
      <section className="w-full h-[420px] md:h-[500px] relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1520975661595-6453be3f7070"
          className="w-full h-full object-cover"
        />

        {/* overlay tipo Zara */}
        <div className="absolute inset-0 bg-black/10" />

        {/* texto opcional */}
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-2xl md:text-3xl font-semibold">
            Uniformes
          </h1>
          <p className="text-sm opacity-80">
            Colección institucional y profesional
          </p>
        </div>
      </section>

      {/* TOP BAR MEJORADO */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center border-b">
        
        {/* FILTRO */}
        <button
          onClick={() => {
            setTempFilters(filters);
            setOpenFilters(true);
          }}
          className="text-sm tracking-wide hover:opacity-60 transition"
        >
          FILTRAR Y ORDENAR
        </button>

        {/* ORDEN */}
        <SortDropdown
          filters={filters}
          setFilters={(f: any) => {
            setFilters(f);
            updateURL(f);
          }}
        />
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductGrid filters={filters} />
      </div>

      {/* DRAWER */}
      <FilterDrawer
        open={openFilters}
        onClose={() => setOpenFilters(false)}
        tempFilters={tempFilters}
        setTempFilters={setTempFilters}
        applyFilters={() => {
          setFilters(tempFilters);
          updateURL(tempFilters);
          setOpenFilters(false);
        }}
        clearFilters={() => {
          const empty = { type: [], gender: [], sort: "" };
          setFilters(empty);
          updateURL(empty);
        }}
      />
    </div>
  );
}