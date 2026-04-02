import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host:     process.env.DB_HOST,
  port:     Number(process.env.DB_PORT) || 3306,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const [rows] = await db.query(
      `SELECT
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
      WHERE p.slug = ?
      GROUP BY p.id`,
      [slug]
    );

    const list = rows as any[];

    if (list.length === 0) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(parseProduct(list[0]));

  } catch (error) {
    console.error("GET /api/products/[slug] error:", error);
    return NextResponse.json(
      { error: "Error al obtener el producto" },
      { status: 500 }
    );
  }
}