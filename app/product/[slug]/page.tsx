import { getProductBySlug } from "@/lib/product";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = getProductBySlug(slug);

  if (!product) return notFound();

  const discount = Math.round(
    ((product.originalPrice - product.discountPrice) /
      product.originalPrice) *
      100
  );

  return (
    <div className="px-6 md:px-12 py-10 grid md:grid-cols-2 gap-10">
      {/* GALERÍA */}
      <div className="grid grid-cols-4 gap-2">
        {product.images.map((img, i) => (
          <img
            key={i}
            src={img}
            className={`w-full object-cover rounded-lg ${
              i === 0 ? "col-span-4 h-[400px]" : "h-[100px]"
            }`}
          />
        ))}
      </div>

      {/* INFO */}
      <div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>

        <div className="flex items-center gap-3 mt-3">
          <p className="text-2xl font-bold">
            ${product.discountPrice.toLocaleString()}
          </p>

          <p className="text-gray-400 line-through">
            ${product.originalPrice.toLocaleString()}
          </p>

          <span className="text-red-500 text-sm">
            -{discount}%
          </span>
        </div>

        <p className="mt-6 text-gray-600">{product.description}</p>

        {/* BOTÓN */}
        <button className="mt-6 w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition">
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}