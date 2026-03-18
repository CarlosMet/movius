import Link from "next/link";
import products from "../../data/productos.json";

export default function ProductGrid({ filters }: any) {
  let filtered = [...products.filter(product => product.filtro === "uniformes")];

  // FILTROS
  if (filters.type.length) {
    filtered = filtered.filter((p) =>
      filters.type.includes(p.type)
    );
  }

  if (filters.gender.length) {
    filtered = filtered.filter((p) =>
      filters.gender.includes(p.gender)
    );
  }

  // ORDEN
  if (filters.sort === "price-asc") {
    filtered.sort((a, b) => a.discountPrice - b.discountPrice);
  }

  if (filters.sort === "price-desc") {
    filtered.sort((a, b) => b.discountPrice - a.discountPrice);
  }

  if (filters.sort === "best-sellers") {
    filtered.sort((a, b) => b.unitsSold - a.unitsSold);
  }

  if (filters.sort === "newest") {
    filtered.sort((a, b) => b.id - a.id);
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {filtered.map((p) => {
        const discount =
          ((p.originalPrice - p.discountPrice) / p.originalPrice) * 100;

        return (
          <Link key={p.id} href={`/product/${p.slug}`}>
            <div className="group cursor-pointer">
              
              {/* IMAGEN */}
              <div className="relative overflow-hidden rounded-xl">
                
                {/* MAIN */}
                <img
                  src={p.images[0]}
                  className="w-full h-[320px] object-cover transition duration-500 group-hover:scale-105"
                />

                {/* HOVER */}
                <img
                  src={p.images[1]}
                  className="w-full h-[320px] object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition duration-500"
                />

                {/* BADGE */}
                {p.originalPrice > p.discountPrice && (
                  <span className="absolute top-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    -{Math.round(discount)}%
                  </span>
                )}
              </div>

              {/* INFO */}
              <div className="mt-2">
                <p className="text-sm">{p.name}</p>

                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">
                    ${p.discountPrice.toLocaleString()}
                  </p>

                 {p.originalPrice > p.discountPrice && (
                    <p className="text-xs text-gray-400 line-through">
                        ${p.originalPrice.toLocaleString()}
                    </p>
                        )}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}