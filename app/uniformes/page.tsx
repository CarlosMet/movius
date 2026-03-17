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
      
      {/* HERO */}
      <section className="w-full h-[420px] relative">
        <img
          src="https://images.unsplash.com/photo-1520975922324-5a12f61c1c7f"
          className="w-full h-full object-cover"
        />
      </section>

      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between">
        <button
          onClick={() => {
            setTempFilters(filters);
            setOpenFilters(true);
          }}
        >
          FILTRAR Y ORDENAR
        </button>

        <SortDropdown
          filters={filters}
          setFilters={(f: any) => {
            setFilters(f);
            updateURL(f);
          }}
        />
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4">
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
          updateURL(tempFilters); // 🔥 CLAVE
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