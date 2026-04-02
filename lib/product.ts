import { GET_PRODUCTS_URL } from "./constantes";

// 🔹 Tipado (recomendado)
export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  gender: string;
  type: string;
  filtro: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPrice: number;
  unitsSold: number;
  images: string[];
  variants: {
    size: string;
    stock: number;
  }[];
  created_at: string;
}

// 🔹 Normalizador (CLAVE 🔥)
function normalizeProduct(p: any): Product {
  return {
    ...p,
    price: Number(p.price),
    originalPrice: Number(p.original_price),
    discountPrice: Number(p.discount_price),
    unitsSold: Number(p.units_sold),
  };
}

// 🔹 Obtener todos los productos
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(GET_PRODUCTS_URL);

  if (!res.ok) {
    throw new Error("Error al obtener productos");
  }

  const data = await res.json();
  return data.map(normalizeProduct);
}

// 🔹 Obtener producto por ID
export async function getProductById(id: number): Promise<Product> {
  const res = await fetch(`${GET_PRODUCTS_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Producto no encontrado");
  }

  const data = await res.json();
  return normalizeProduct(data);
}

export async function getProductBySlug(slug: string) {
  const res = await fetch(GET_PRODUCTS_URL, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Error al obtener productos");
  }

  const data = await res.json();
  const product = data.find((p: any) => p.slug === slug);

  if (!product) return null;

  return normalizeProduct(product);
}