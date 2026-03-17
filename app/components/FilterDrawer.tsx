"use client";

type Subcategory = {
  name: string;
  type: string[];
};

type Category = {
  name: string;
  subcategories: Subcategory[];
};

const categories: Category[] = [
  {
    name: "Institucional",
    subcategories: [
      {
        name: "Hombre",
        type: ["Camiseta", "Sudadera", "Chaqueta"],
      },
      {
        name: "Mujer",
        type: ["Camiseta", "Sudadera", "Chaqueta"],
      },
    ],
  },
  {
    name: "Salud",
    subcategories: [
      {
        name: "Hombre",
        type: [],
      },
      {
        name: "Mujer",
        type: [],
      },
    ],
  },
  {
    name: "General",
    subcategories: [
      {
        name: "Hombre",
        type: [],
      },
      {
        name: "Mujer",
        type: [],
      },
    ],
  },
];

export default function FilterDrawer({
  open,
  onClose,
  tempFilters,
  setTempFilters,
  applyFilters,
  clearFilters,
}: any) {
  if (!open) return null;

  const toggleType = (type: string) => {
    const exists = tempFilters.type.includes(type);

    const updated = exists
      ? tempFilters.type.filter((t: string) => t !== type)
      : [...tempFilters.type, type];

    setTempFilters({ ...tempFilters, type: updated });
  };

  const toggleGender = (gender: string) => {
    const exists = tempFilters.gender.includes(gender);

    const updated = exists
      ? tempFilters.gender.filter((g: string) => g !== gender)
      : [...tempFilters.gender, gender];

    setTempFilters({ ...tempFilters, gender: updated });
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50">
      <div className="absolute right-0 top-0 w-full max-w-md h-full bg-white p-6 overflow-y-auto">
        
        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <h2 className="text-lg font-semibold">Filtros</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* CATEGORÍAS */}
        {categories.map((cat) => (
          <div key={cat.name} className="mb-6">
            <h3 className="font-medium mb-2">{cat.name}</h3>

            {cat.subcategories.map((sub) => (
              <div key={sub.name} className="mb-3">
                
                {/* GÉNERO */}
                <label className="flex gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tempFilters.gender.includes(sub.name)}
                    onChange={() => toggleGender(sub.name)}
                  />
                  {sub.name}
                </label>

                {/* TIPOS */}
                <div className="ml-5 mt-1 space-y-1">
                  {(sub.type ?? []).map((type) => (
                    <label
                      key={type}
                      className="flex gap-2 text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={tempFilters.type.includes(type)}
                        onChange={() => toggleType(type)}
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* BOTONES */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={clearFilters}
            className="w-1/2 border py-2 rounded-lg text-sm"
          >
            Borrar todo
          </button>

          <button
            onClick={applyFilters}
            className="w-1/2 bg-black text-white py-2 rounded-lg text-sm"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
}