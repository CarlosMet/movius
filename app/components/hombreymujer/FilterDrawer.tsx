"use client";

export default function FilterDrawer({
  open,
  onClose,
  filters,
  setFilters,
  sort,
  setSort,
}: any) {
  if (!open) return null;

  const types = ["Camiseta", "Pantalón", "Buso", "Pantaloneta"];

  return (
    <div className="fixed inset-0 bg-black/30 z-50">
      <div className="absolute left-0 top-0 h-full w-72 bg-white p-4">

        <h2 className="font-semibold mb-4">Filtros</h2>

        {types.map((type) => (
          <label key={type} className="flex gap-2 mb-2 text-sm">
            <input
              type="checkbox"
              checked={filters.includes(type)}
              onChange={() =>
                setFilters((prev: string[]) =>
                  prev.includes(type)
                    ? prev.filter((t) => t !== type)
                    : [...prev, type]
                )
              }
            />
            {type}
          </label>
        ))}

        <h2 className="font-semibold mt-4 mb-2">Ordenar</h2>

        {[
          { label: "Menor a mayor", value: "price_asc" },
          { label: "Mayor a menor", value: "price_desc" },
          { label: "Más vendidos", value: "sold" },
          { label: "Más recientes", value: "recent" },
        ].map((opt) => (
          <label key={opt.value} className="flex gap-2 text-sm mb-2">
            <input
              type="radio"
              checked={sort === opt.value}
              onChange={() => setSort(opt.value)}
            />
            {opt.label}
          </label>
        ))}

        <button onClick={onClose} className="btn-primary w-full mt-4">
          Aplicar
        </button>
      </div>
    </div>
  );
}