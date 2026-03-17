import products from "../data/productos.json";

export function getProducts() {
  return products;
}

export function getProductById(id: number) {
  return products.find((p) => p.id === id);
}
export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}