import { getProducts } from "@/lib/product";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const type = searchParams.getAll("type");
  const gender = searchParams.getAll("gender");
  const sort = searchParams.get("sort");

  let data = getProducts();

  // FILTROS
  if (type.length) {
    data = data.filter((p) => type.includes(p.type));
  }

  if (gender.length) {
    data = data.filter((p) => gender.includes(p.gender));
  }

  // ORDEN
  if (sort === "price_asc") {
    data.sort((a, b) => a.price - b.price);
  }

  if (sort === "price_desc") {
    data.sort((a, b) => b.price - a.price);
  }

  return NextResponse.json(data);
}