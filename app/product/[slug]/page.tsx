import { getProductBySlug } from "@/lib/product";
import { notFound } from "next/navigation";
import { Poppins } from "next/font/google";
import AddToCartButton from "@/app/components/products/AddToCartButton";
import ProductGallery from "@/app/components/products/ProductGallery";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  const discountPrice = Number(product.discount_price ?? product.discountPrice ?? 0);
  const originalPrice = Number(product.original_price ?? product.originalPrice ?? discountPrice);

  const hasDiscount = originalPrice > discountPrice;
  const discount = hasDiscount
    ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
    : 0;

  const images = product.images ?? [];
  const variants = product.variants ?? [];

  return (
    <div className={`max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16 ${poppins.className}`}>
      <div className="grid md:grid-cols-2 gap-10 lg:gap-20">

        {/* GALERÍA */}
        <ProductGallery images={images} name={product.name} />

        {/* INFO */}
        <div className="flex flex-col justify-center">

          {/* Eyebrow */}
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-3">
            {product.category} · {product.gender}
          </p>

          {/* Nombre */}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight mb-4">
            {product.name}
          </h1>

          {/* Precio */}
          <div className="flex items-center gap-3 mb-6">
            <p className="text-2xl font-semibold text-gray-900">
              ${discountPrice.toLocaleString("es-CO")}
            </p>
            {hasDiscount && (
              <>
                <p className="text-base text-gray-400 line-through">
                  ${originalPrice.toLocaleString("es-CO")}
                </p>
                <span className="bg-red-50 text-red-500 text-xs font-semibold px-2 py-1 tracking-wide">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          {/* Descripción */}
          <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-md">
            {product.description}
          </p>

          <div className="w-12 h-px bg-gray-200 mb-8" />

          {/* TALLAS + CARRITO */}
          <AddToCartButton
            productId={product.id}
            productName={product.name}
            productPrice={discountPrice}
            productImage={images[0]}
            variants={variants}
          />

        </div>
      </div>
    </div>
  );
}