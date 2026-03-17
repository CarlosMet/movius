import { getProductBySlug } from "@/lib/product";


export default async function Page({ params }: any) {
  const { slug } = await params;

  const product = getProductBySlug(slug);

  if (!product) return <div>No encontrado</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      <img
        src={product.image}
        className="w-full h-[500px] object-cover rounded-xl"
      />

      <div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="text-xl mt-2">
          ${product.price.toLocaleString()}
        </p>

        <p className="mt-4 text-gray-600">
          {product.description}
        </p>
      </div>
    </div>
  );
}