import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host:     process.env.DB_HOST,
  port:     Number(process.env.DB_PORT) || 3306,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const BASE_QUERY = `
  SELECT
    p.*,
    GROUP_CONCAT(
      DISTINCT CONCAT(pi.position, '||', pi.url)
      ORDER BY pi.position
      SEPARATOR '::'
    ) AS images_raw,
    GROUP_CONCAT(
      DISTINCT CONCAT(pv.size, '||', pv.stock)
      ORDER BY pv.size
      SEPARATOR '::'
    ) AS variants_raw
  FROM products p
  LEFT JOIN product_images pi ON pi.product_id = p.id
  LEFT JOIN product_variants pv ON pv.product_id = p.id
`;

function parseProduct(p: any) {
  return {
    ...p,
    price:         Number(p.price),
    originalPrice: Number(p.original_price),
    discountPrice: Number(p.discount_price),
    unitsSold:     Number(p.units_sold),
    images: p.images_raw
      ? p.images_raw.split("::").map((img: string) => img.split("||")[1])
      : [],
    variants: p.variants_raw
      ? p.variants_raw.split("::").map((v: string) => {
          const [size, stock] = v.split("||");
          return { size, stock: Number(stock) };
        })
      : [],
    images_raw:   undefined,
    variants_raw: undefined,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const types   = searchParams.getAll("type");
    const genders = searchParams.getAll("gender");
    const sort    = searchParams.get("sort");

    const conditions: string[] = [];
    const params: any[]        = [];

    if (types.length) {
      conditions.push(`p.type IN (${types.map(() => "?").join(",")})`);
      params.push(...types);
    }

    if (genders.length) {
      conditions.push(`p.gender IN (${genders.map(() => "?").join(",")})`);
      params.push(...genders);
    }

    const WHERE = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const ORDER_MAP: Record<string, string> = {
      price_asc:  "p.discount_price ASC",
      price_desc: "p.discount_price DESC",
      sold:       "p.units_sold DESC",
      recent:     "p.id DESC",
    };

    const ORDER = `ORDER BY ${ORDER_MAP[sort ?? ""] ?? "p.units_sold DESC"}`;

    const [rows] = await db.query(
      `${BASE_QUERY} ${WHERE} GROUP BY p.id ${ORDER}`,
      params
    );

    return NextResponse.json((rows as any[]).map(parseProduct));

  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { error: "Error al obtener los productos" },
      { status: 500 }
    );
  }
}