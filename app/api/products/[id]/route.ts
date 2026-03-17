import { NextResponse, NextRequest } from "next/server";
import products from "../../../../data/productos.json";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const product = products.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    return NextResponse.json(
      { error: "Producto no encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}